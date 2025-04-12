'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  // 应用健康检查接口
  async index() {
    const { ctx, app } = this;
    const currentTime = ctx.helper.now();
    const uptime = process.uptime();
    
    const data = {
      name: app.name || 'egg-backend',
      version: app.config.pkg.version,
      env: app.config.env,
      uptime: `${Math.floor(uptime / 3600)}h ${Math.floor(uptime % 3600 / 60)}m ${Math.floor(uptime % 60)}s`,
      currentTime,
      message: 'Hello, Egg.js!'
    };
    
    ctx.success(data);
  }
}

module.exports = HomeController; 