'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 数据库 ORM
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  // 跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  // 参数校验
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  // Redis
  redis: {
    enable: true,
    package: 'egg-redis',
  },

  // JWT
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
}; 