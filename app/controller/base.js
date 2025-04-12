'use strict';

const { Controller } = require('egg');

/**
 * 基础控制器类
 * 提供通用CRUD操作，子类需要设置this.entity属性为对应的模型
 */
class BaseController extends Controller {
  /**
   * 获取分页参数
   * @return {Object} 分页参数
   */
  get paginationParams() {
    const { ctx } = this;
    const { query } = ctx;
    const page = parseInt(query.page || 1, 10);
    const limit = parseInt(query.limit || 20, 10);
    const offset = (page - 1) * limit;
    return { page, limit, offset };
  }

  /**
   * 获取排序参数
   * @return {Array|null} 排序参数
   */
  get orderParams() {
    const { ctx } = this;
    const { query } = ctx;
    if (query.sort) {
      const [column, order = 'ASC'] = query.sort.split(',');
      return [[column, order.toUpperCase()]];
    }
    return [['created_at', 'DESC']];
  }

  /**
   * 获取筛选参数
   * @return {Object} 筛选参数对象
   */
  get filterParams() {
    const { ctx } = this;
    const { query } = ctx;
    const filter = {};
    
    // 移除分页和排序参数
    const excludeKeys = ['page', 'limit', 'sort'];
    
    Object.keys(query).forEach(key => {
      if (!excludeKeys.includes(key) && query[key]) {
        filter[key] = query[key];
      }
    });
    
    return filter;
  }

  /**
   * 查询列表(分页)
   */
  async index() {
    const { ctx, service } = this;
    const { limit, offset } = this.paginationParams;
    const where = this.filterParams;
    const order = this.orderParams;

    try {
      const result = await service[this.entity].findAndCountAll({
        where,
        order,
        limit,
        offset,
      });
      
      ctx.success(result);
    } catch (error) {
      ctx.logger.error(error);
      ctx.error('查询失败');
    }
  }

  /**
   * 获取单个资源
   */
  async show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    
    try {
      const result = await service[this.entity].findById(id);
      
      if (!result) {
        return ctx.notFound();
      }
      
      ctx.success(result);
    } catch (error) {
      ctx.logger.error(error);
      ctx.error('查询失败');
    }
  }

  /**
   * 创建资源
   */
  async create() {
    const { ctx, service } = this;
    
    try {
      const result = await service[this.entity].create(ctx.request.body);
      ctx.success(result);
    } catch (error) {
      ctx.logger.error(error);
      ctx.error('创建失败');
    }
  }

  /**
   * 更新资源
   */
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    
    try {
      const result = await service[this.entity].update(id, ctx.request.body);
      
      if (!result) {
        return ctx.notFound();
      }
      
      ctx.success(result);
    } catch (error) {
      ctx.logger.error(error);
      ctx.error('更新失败');
    }
  }

  /**
   * 删除资源
   */
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    
    try {
      const result = await service[this.entity].destroy(id);
      
      if (!result) {
        return ctx.notFound();
      }
      
      ctx.success(null, '删除成功');
    } catch (error) {
      ctx.logger.error(error);
      ctx.error('删除失败');
    }
  }
}

module.exports = BaseController; 