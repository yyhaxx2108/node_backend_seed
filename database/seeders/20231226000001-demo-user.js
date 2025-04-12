'use strict';

const crypto = require('crypto');

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

function encryptPassword(password, salt) {
  return md5(`${password}:${salt}`);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = 'egg-backend-jwt-secret'; // 与config.default.js中的jwt.secret保持一致
    const now = new Date();
    
    return queryInterface.bulkInsert('user', [
      {
        username: 'admin',
        password: encryptPassword('admin123', salt),
        email: 'admin@example.com',
        nickname: '管理员',
        created_at: now,
        updated_at: now,
      },
      {
        username: 'test',
        password: encryptPassword('test123', salt),
        email: 'test@example.com',
        nickname: '测试用户',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  },
}; 