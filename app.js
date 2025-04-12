'use strict';

/**
 * 应用启动自定义
 */
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  // 配置文件加载完成，用于修改配置内容
  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还未生效
    // 这是应用层修改配置的最后时机
    // console.log('配置文件加载完成');
  }

  // 所有配置已加载完成
  configDidLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    // console.log('所有配置已加载完成');
  }

  // 插件启动完毕
  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    // console.log('插件启动完毕');
  }

  // 应用启动完成
  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    // console.log('应用启动完成');
    
    // 开发环境同步数据库表结构
    if (this.app.config.env === 'local' || this.app.config.env === 'unittest') {
      // await this.app.model.sync({ alter: true });
    }
  }

  // 应用已经启动完毕
  async didReady() {
    // 应用已经启动完毕
    const ctx = await this.app.createAnonymousContext();
    // 应用启动完成后执行一些任务
    // console.log('应用已经启动完毕');
  }

  // 应用即将关闭
  async beforeClose() {
    // Do some thing before app close.
    // console.log('应用即将关闭');
  }
}

module.exports = AppBootHook; 