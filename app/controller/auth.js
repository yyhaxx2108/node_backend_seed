'use strict';

const { Controller } = require('egg');
const { Op } = require('sequelize'); 

class AuthController extends Controller {
  /**
   * 用户注册
   */
  async register() {
    const { ctx, service, app } = this;
    const { username, password, email } = ctx.request.body;
    
    // 参数校验
    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      email: { type: 'email', required: true },
    });
    
    try {
      // 检查用户名和邮箱是否已存在
      const existUser = await service.user.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
      
      if (existUser) {
        return ctx.badRequest('用户名或邮箱已存在');
      }
      
      // 密码加密
      const encryptedPassword = ctx.helper.encryptPassword(password);
      
      // 创建用户
      const user = await service.user.create({
        username,
        password: encryptedPassword,
        email,
      });
      
      // 生成 token
      const token = app.jwt.sign({
        id: user.id,
        username: user.username,
      }, app.config.jwt.secret, {
        expiresIn: app.config.jwt.expiresIn,
      });
      
      ctx.success({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      ctx.logger.error(error);
      ctx.error('注册失败: ' + error.message);
    }
  }

  /**
   * 用户登录
   */
  async login() {
    const { ctx, service, app } = this;
    const { username, password } = ctx.request.body;
    
    // 参数校验
    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    
    try {
      // 查找用户
      const user = await service.user.findOne({
        where: {
          username,
        },
      });
      
      if (!user) {
        return ctx.badRequest('用户名或密码错误');
      }
      
      // 校验密码
      const encryptedPassword = ctx.helper.encryptPassword(password);
      if (user.password !== encryptedPassword) {
        return ctx.badRequest('用户名或密码错误');
      }
      
      // 生成 token
      const token = app.jwt.sign({
        id: user.id,
        username: user.username,
      }, app.config.jwt.secret, {
        expiresIn: app.config.jwt.expiresIn,
      });
      
      // 记录登录时间
      await user.update({ last_login_at: new Date() });
      
      ctx.success({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      ctx.logger.error(error);
      ctx.error('登录失败: ' + error.message);
    }
  }
}

module.exports = AuthController; 