'use strict';

module.exports = () => {
  const config = {};

  // 本地开发环境配置
  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG', 
  };

  return config;
}; 