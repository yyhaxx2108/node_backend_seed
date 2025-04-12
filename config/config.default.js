/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1234567890';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // 安全配置
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*'], // 配置白名单
  };

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 参数校验
  config.validate = {
    convert: true,
    validateRoot: true,
  };

  // 配置MySQL数据库
  config.sequelize = {
    dialect: 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_DATABASE || 'egg_backend',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    timezone: '+08:00',
    define: {
      underscored: true, // 使用下划线字段
      freezeTableName: true, // 不会自动给表名加s
      timestamps: true, // 自动生成创建和修改时间
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true, // 软删除
    },
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
          return field.string();
        }
        return next();
      },
    },
  };

  // Redis配置
  config.redis = {
    client: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || '',
      db: 0,
    },
  };

  // JWT配置
  config.jwt = {
    secret: process.env.JWT_SECRET || 'egg-backend-jwt-secret',
    expiresIn: '7d',
  };

  // 七牛云存储配置
  config.qiniu = {
    accessKey: process.env.QINIU_ACCESS_KEY || '',
    secretKey: process.env.QINIU_SECRET_KEY || '',
    bucket: process.env.QINIU_BUCKET || '',
    region: process.env.QINIU_REGION || 'z0', // 七牛云存储区域
    baseUrl: process.env.QINIU_BASE_URL || '', // 访问地址的域名
  };

  // 文件上传配置
  config.multipart = {
    mode: 'file',
    fileSize: '10mb',
    fileExtensions: ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
}; 