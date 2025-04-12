'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(30),
      allowNull: false,
      unique: true,
      comment: '用户名',
    },
    password: {
      type: STRING(100),
      allowNull: false,
      comment: '密码',
    },
    email: {
      type: STRING(50),
      allowNull: false,
      unique: true,
      comment: '邮箱',
    },
    nickname: {
      type: STRING(30),
      allowNull: true,
      comment: '昵称',
    },
    avatar: {
      type: STRING(200),
      allowNull: true,
      comment: '头像',
    },
    last_login_at: {
      type: DATE,
      allowNull: true,
      comment: '最后登录时间',
    },
  });

  return User;
}; 