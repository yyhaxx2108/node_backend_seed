-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS egg_backend;

-- 使用数据库
USE egg_backend;

-- 允许root用户从任何主机连接
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES; 