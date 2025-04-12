'use strict';

module.exports = (options, app) => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    if (!token) {
      ctx.status = 401;
      ctx.body = { 
        code: 401, 
        message: '未授权，请先登录', 
        data: null 
      };
      return;
    }

    // 移除Bearer前缀
    const tokenValue = token.replace('Bearer ', '');
    
    try {
      // jwt验证
      const decoded = app.jwt.verify(tokenValue, app.config.jwt.secret);
      
      // 将用户信息挂载到ctx上
      ctx.state.user = decoded;
      
      await next();
    } catch (error) {
      ctx.status = 401;
      ctx.body = { 
        code: 401, 
        message: '登录状态已过期，请重新登录', 
        data: null 
      };
      return;
    }
  };
}; 