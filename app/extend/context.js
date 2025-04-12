'use strict';

module.exports = {
  // 成功响应
  success(data = null, message = '操作成功') {
    this.body = {
      code: 200,
      message,
      data,
    };
    this.status = 200;
  },

  // 错误响应
  error(message = '操作失败', code = 400, data = null) {
    this.body = {
      code,
      message,
      data,
    };
    this.status = code;
  },

  // 未授权
  unauthorized(message = '未授权，请先登录') {
    this.body = {
      code: 401,
      message,
      data: null,
    };
    this.status = 401;
  },

  // 权限不足
  forbidden(message = '权限不足，无法执行该操作') {
    this.body = {
      code: 403,
      message,
      data: null,
    };
    this.status = 403;
  },

  // 未找到
  notFound(message = '资源不存在') {
    this.body = {
      code: 404,
      message,
      data: null,
    };
    this.status = 404;
  },

  // 参数错误
  badRequest(message = '参数错误', data = null) {
    this.body = {
      code: 400,
      message,
      data,
    };
    this.status = 400;
  },

  // 服务器内部错误
  serverError(message = '服务器内部错误') {
    this.body = {
      code: 500,
      message,
      data: null,
    };
    this.status = 500;
  },
}; 