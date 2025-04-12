# Egg.js 后端种子项目

一个基于 Egg.js 框架的后端种子项目，集成了 Sequelize ORM、MySQL 数据库、Redis 缓存和七牛云对象存储。

## 技术栈

- [Egg.js](https://eggjs.org/zh-cn/) - 企业级 Node.js 框架
- [Sequelize](https://sequelize.org/) - Node.js ORM 框架
- [MySQL](https://www.mysql.com/) - 关系型数据库
- [Redis](https://redis.io/) - 内存数据库，用于缓存
- [七牛云](https://www.qiniu.com/) - 对象存储服务，用于图片上传

## 主要功能

- 用户认证（登录/注册）
- JWT 身份验证
- RESTful API
- 图片上传至七牛云
- 基于角色的权限控制（RBAC）
- 通用增删改查（CRUD）封装
- Docker 支持

## 目录结构

```
.
├── app                       // 应用目录
│   ├── controller            // 控制器
│   ├── extend                // 扩展
│   ├── middleware            // 中间件
│   ├── model                 // 数据模型
│   ├── public                // 静态资源
│   ├── router                // 路由
│   ├── service               // 服务
│   └── util                  // 工具类
├── config                    // 配置文件
│   ├── config.default.js     // 默认配置
│   ├── config.local.js       // 本地开发配置
│   ├── config.prod.js        // 生产环境配置
│   └── plugin.js             // 插件配置
├── database                  // 数据库相关
│   ├── config.json           // Sequelize 配置
│   ├── migrations            // 数据库迁移文件
│   └── seeders               // 种子数据
├── test                      // 测试
├── .sequelizerc              // Sequelize 配置文件
├── Dockerfile                // Docker 配置
├── docker-compose.yml        // Docker Compose 配置
├── .gitignore                // Git 忽略文件
├── package.json              // 项目依赖
└── README.md                 // 项目说明
```

## 环境要求

- Node.js >= 16.0.0
- MySQL >= 5.7
- Redis >= 6.0

## 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/egg-backend.git
cd egg-backend

# 安装依赖
npm install

# 创建数据库
npm run db:create

# 数据库迁移
npm run db:migrate

# 添加种子数据
npm run db:seed

# 启动开发服务器
npm run dev
```

### Docker 部署

```bash
# 构建并启动容器
docker-compose up -d

# 执行数据库迁移（首次部署时）
docker-compose exec app npm run db:migrate

# 添加种子数据（首次部署时）
docker-compose exec app npm run db:seed
```

### 通过 Nginx 反向代理

可参考以下配置将服务反向代理至 Nginx：

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:7001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## API 文档

API 文档可通过以下方式访问：

- 本地开发环境: http://localhost:7001/swagger-ui.html
- 生产环境: https://api.example.com/swagger-ui.html

## 主要 API 端点

- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册
- `GET /api/user/info` - 获取当前用户信息
- `POST /api/upload/image` - 上传图片至七牛云
- `GET /api/users` - 获取用户列表（需管理员权限）

## 开发与扩展

### 添加新模型

1. 创建模型文件 `app/model/your_model.js`
2. 创建迁移文件 `npx sequelize migration:create --name create-your-model`
3. 编写迁移文件 `database/migrations/xxx-create-your-model.js`
4. 创建服务文件 `app/service/your_model.js`
5. 创建控制器 `app/controller/your_model.js`
6. 在路由中添加新路由 `app/router.js`

### 环境变量

项目支持通过环境变量配置，主要环境变量如下：

- `DB_HOST` - MySQL 主机地址
- `DB_PORT` - MySQL 端口
- `DB_DATABASE` - MySQL 数据库名
- `DB_USERNAME` - MySQL 用户名
- `DB_PASSWORD` - MySQL 密码
- `REDIS_HOST` - Redis 主机地址
- `REDIS_PORT` - Redis 端口
- `REDIS_PASSWORD` - Redis 密码
- `JWT_SECRET` - JWT 密钥
- `QINIU_ACCESS_KEY` - 七牛云 AccessKey
- `QINIU_SECRET_KEY` - 七牛云 SecretKey
- `QINIU_BUCKET` - 七牛云存储空间
- `QINIU_REGION` - 七牛云存储区域
- `QINIU_BASE_URL` - 七牛云访问地址

## 许可证

[MIT](LICENSE) 