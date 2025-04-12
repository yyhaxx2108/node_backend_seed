'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.entity = 'user';
  }

  /**
   * 获取当前登录用户信息
   */
  async info() {
    const { ctx, service } = this;
    const userId = ctx.state.user.id;
    
    try {
      const user = await service.user.findById(userId);
      
      if (!user) {
        return ctx.notFound('用户不存在');
      }
      
      ctx.success({
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        nickname: user.nickname,
        last_login_at: user.last_login_at,
        created_at: user.created_at,
      });
    } catch (error) {
      ctx.logger.error(error);
      ctx.error('获取用户信息失败');
    }
  }

  /**
   * 更新用户信息
   */
  async updateInfo() {
    const { ctx, service } = this;
    const userId = ctx.state.user.id;
    const { nickname, avatar } = ctx.request.body;
    
    try {
      const user = await service.user.findById(userId);
      
      if (!user) {
        return ctx.notFound('用户不存在');
      }
      
      // 仅允许更新部分字段
      const updatedUser = await user.update({
        nickname,
        avatar,
      });
      
      ctx.success({
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        nickname: updatedUser.nickname,
      });
    } catch (error) {
      ctx.logger.error(error);
      ctx.error('更新用户信息失败');
    }
  }

  /**
   * 修改密码
   */
  async changePassword() {
    const { ctx, service } = this;
    const userId = ctx.state.user.id;
    const { oldPassword, newPassword } = ctx.request.body;
    
    // 参数校验
    ctx.validate({
      oldPassword: { type: 'string', required: true },
      newPassword: { type: 'string', required: true, min: 6 },
    });
    
    try {
      const user = await service.user.findById(userId);
      
      if (!user) {
        return ctx.notFound('用户不存在');
      }
      
      // 校验旧密码
      const encryptedOldPassword = ctx.helper.encryptPassword(oldPassword);
      if (user.password !== encryptedOldPassword) {
        return ctx.badRequest('原密码错误');
      }
      
      // 加密新密码
      const encryptedNewPassword = ctx.helper.encryptPassword(newPassword);
      
      // 更新密码
      await user.update({ password: encryptedNewPassword });
      
      ctx.success(null, '密码修改成功');
    } catch (error) {
      ctx.logger.error(error);
      ctx.error('修改密码失败');
    }
  }
}

module.exports = UserController; 