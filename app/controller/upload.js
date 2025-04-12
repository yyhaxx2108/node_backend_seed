'use strict';

const fs = require('fs');
const path = require('path');
const { Controller } = require('egg');
const QiniuHelper = require('../util/qiniu');

class UploadController extends Controller {
  /**
   * 上传图片到七牛云
   */
  async uploadToQiniu() {
    const { ctx, app } = this;
    const file = ctx.request.files[0];
    
    if (!file) {
      return ctx.badRequest('未检测到上传的文件');
    }
    
    try {
      // 检查文件后缀
      const extname = path.extname(file.filename).toLowerCase();
      const allowExts = app.config.multipart.fileExtensions;
      
      if (!allowExts.includes(extname)) {
        return ctx.badRequest(`不支持的文件类型，仅支持${allowExts.join('/')}`);
      }
      
      // 构造七牛云上传工具
      const qiniuHelper = new QiniuHelper(app.config.qiniu);
      
      // 执行上传
      const result = await qiniuHelper.uploadFile(file.filepath);
      
      // 上传后清理临时文件
      try {
        fs.unlinkSync(file.filepath);
      } catch (err) {
        app.logger.error(`删除临时文件失败: ${err.message}`);
      }
      
      // 返回上传结果
      ctx.success({
        url: result.url,
        key: result.key,
        originalFilename: file.filename,
        size: file.size,
      });
    } catch (err) {
      // 发生错误时确保清理临时文件
      try {
        fs.unlinkSync(file.filepath);
      } catch (e) {
        app.logger.error(`删除临时文件失败: ${e.message}`);
      }
      
      app.logger.error('上传七牛云失败: ', err);
      ctx.error('上传失败: ' + err.message);
    }
  }

  /**
   * 从七牛云删除文件
   */
  async deleteFromQiniu() {
    const { ctx, app } = this;
    const { key } = ctx.request.body;
    
    if (!key) {
      return ctx.badRequest('缺少key参数');
    }
    
    try {
      // 构造七牛云工具
      const qiniuHelper = new QiniuHelper(app.config.qiniu);
      
      // 执行删除
      const result = await qiniuHelper.deleteFile(key);
      
      ctx.success(result);
    } catch (err) {
      app.logger.error('删除七牛云文件失败: ', err);
      ctx.error('删除失败: ' + err.message);
    }
  }
}

module.exports = UploadController; 