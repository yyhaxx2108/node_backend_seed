'use strict';

const qiniu = require('qiniu');
const path = require('path');
const fs = require('fs');

class QiniuHelper {
  /**
   * 构造函数
   * @param {Object} config 七牛云配置
   */
  constructor(config) {
    this.config = config;
    this.mac = new qiniu.auth.digest.Mac(this.config.accessKey, this.config.secretKey);
    this.putPolicy = new qiniu.rs.PutPolicy({
      scope: this.config.bucket,
    });
    this.uploadToken = this.putPolicy.uploadToken(this.mac);
    
    // 构建上传配置
    this.uploadConfig = new qiniu.conf.Config();
    // 空间对应的机房
    this.uploadConfig.zone = qiniu.zone[this.config.region];
    // 是否使用https域名
    this.uploadConfig.useHttpsDomain = true;
    // 上传是否使用cdn加速
    this.uploadConfig.useCdnDomain = true;
  }

  /**
   * 上传本地文件到七牛云
   * @param {String} localFilePath 本地文件路径
   * @param {String} [key] 文件的key，不指定key时，默认使用文件的hash作为key
   * @return {Promise<Object>} 上传结果
   */
  uploadFile(localFilePath, key) {
    return new Promise((resolve, reject) => {
      // 文件名称处理
      if (!key) {
        const ext = path.extname(localFilePath);
        key = `${Date.now()}-${Math.floor(Math.random() * 1000)}${ext}`;
      }

      // 构造上传函数
      const formUploader = new qiniu.form_up.FormUploader(this.uploadConfig);
      const putExtra = new qiniu.form_up.PutExtra();

      // 执行上传
      formUploader.putFile(
        this.uploadToken,
        key,
        localFilePath,
        putExtra,
        (err, respBody, respInfo) => {
          if (err) {
            return reject(err);
          }

          if (respInfo.statusCode !== 200) {
            return reject(new Error(`上传失败：${respBody.error}`));
          }

          // 上传成功，获取文件访问地址
          const fileUrl = `${this.config.baseUrl}/${respBody.key}`;
          
          // 删除本地临时文件
          fs.unlinkSync(localFilePath);
          
          resolve({
            key: respBody.key,
            url: fileUrl,
            hash: respBody.hash,
          });
        }
      );
    });
  }

  /**
   * 删除七牛云上的文件
   * @param {String} key 文件的key
   * @return {Promise<Object>} 删除结果
   */
  deleteFile(key) {
    return new Promise((resolve, reject) => {
      const bucketManager = new qiniu.rs.BucketManager(this.mac, this.uploadConfig);
      
      bucketManager.delete(this.config.bucket, key, (err, respBody, respInfo) => {
        if (err) {
          return reject(err);
        }

        if (respInfo.statusCode !== 200) {
          return reject(new Error(`删除失败：${respBody.error}`));
        }

        resolve({
          key,
          success: true,
        });
      });
    });
  }
}

module.exports = QiniuHelper; 