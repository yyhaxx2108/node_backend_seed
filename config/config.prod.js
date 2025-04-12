'use strict';

module.exports = () => {
  const config = {};

  // 生产环境配置
  config.logger = {
    dir: '/var/logs/egg-backend',
    level: 'INFO',
    consoleLevel: 'INFO',
  };

  // 可自定义其他生产环境特定配置

  return config;
}; 