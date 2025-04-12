'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt();

  // 健康检查
  router.get('/', controller.home.index);
  
  // 无需权限的接口
  router.post('/api/auth/login', controller.auth.login);
  router.post('/api/auth/register', controller.auth.register);
  
  // 需要权限的接口
  router.get('/api/user/info', jwt, controller.user.info);
  router.post('/api/upload/image', jwt, controller.upload.uploadToQiniu);
  
  // 示例CRUD接口
  router.resources('users', '/api/users', jwt, controller.user);
}; 