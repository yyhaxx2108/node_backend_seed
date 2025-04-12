'use strict';

const crypto = require('crypto');
const dayjs = require('dayjs');

module.exports = {
  /**
   * 生成MD5加密字符串
   * @param {string} str 待加密的字符串
   * @return {string} 加密后的字符串
   */
  md5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
  },

  /**
   * 密码加密
   * @param {string} password 明文密码
   * @param {string} [salt] 盐，默认使用app.config.keys
   * @return {string} 加密后的密码
   */
  encryptPassword(password, salt) {
    salt = salt || this.app.config.keys;
    return this.md5(`${password}:${salt}`);
  },
  
  /**
   * 获取当前时间
   * @param {string} [format] 时间格式
   * @return {string} 格式化后的时间字符串
   */
  now(format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs().format(format);
  },

  /**
   * 格式化时间
   * @param {string|Date} date 日期
   * @param {string} [format] 时间格式
   * @return {string} 格式化后的时间字符串
   */
  formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(format);
  },

  /**
   * 生成随机字符串
   * @param {number} length 字符串长度，默认16
   * @return {string} 随机字符串
   */
  randomString(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  /**
   * 生成UUID
   * @return {string} UUID
   */
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  /**
   * 获取客户端IP
   * @param {Object} ctx 请求上下文
   * @return {string} IP地址
   */
  getClientIP(ctx) {
    return ctx.get('x-forwarded-for') || 
      ctx.get('x-real-ip') || 
      ctx.ip || 
      '127.0.0.1';
  },
}; 