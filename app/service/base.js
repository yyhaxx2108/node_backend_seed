'use strict';

const { Service } = require('egg');

/**
 * 基础服务类
 * 提供通用的增删改查操作，子类需要设置this.model为对应的模型
 */
class BaseService extends Service {
  /**
   * 查询符合条件的所有数据
   * @param {Object} options 查询参数
   * @return {Promise<Array>} 查询结果
   */
  async findAll(options = {}) {
    return this.model.findAll(options);
  }

  /**
   * 查询符合条件的数据并返回总数
   * @param {Object} options 查询参数
   * @return {Promise<Object>} { count: 总数, rows: 数据列表 }
   */
  async findAndCountAll(options = {}) {
    return this.model.findAndCountAll(options);
  }

  /**
   * 根据ID查询一条数据
   * @param {string|number} id 主键ID
   * @param {Object} [options] 查询参数
   * @return {Promise<Object>} 实体
   */
  async findById(id, options = {}) {
    options = {
      ...options,
      where: {
        ...options.where,
        id,
      },
    };
    return this.model.findOne(options);
  }

  /**
   * 查询符合条件的一条数据
   * @param {Object} options 查询参数
   * @return {Promise<Object>} 实体
   */
  async findOne(options) {
    return this.model.findOne(options);
  }

  /**
   * 创建一条数据
   * @param {Object} data 实体对象
   * @param {Object} [options] 操作参数
   * @return {Promise<Object>} 创建结果
   */
  async create(data, options = {}) {
    return this.model.create(data, options);
  }

  /**
   * 批量创建
   * @param {Array} dataList 对象数组
   * @param {Object} [options] 操作参数
   * @return {Promise<Array>} 创建结果
   */
  async bulkCreate(dataList, options = {}) {
    return this.model.bulkCreate(dataList, options);
  }

  /**
   * 更新一条数据
   * @param {string|number} id 主键ID
   * @param {Object} data 更新的数据
   * @param {Object} [options] 操作参数
   * @return {Promise<Object>} 更新后的结果
   */
  async update(id, data, options = {}) {
    // 先查找
    const instance = await this.findById(id);
    if (!instance) {
      return null;
    }

    // 执行更新
    await instance.update(data, options);
    return instance.reload();
  }

  /**
   * 根据条件更新数据
   * @param {Object} data 更新的数据
   * @param {Object} options 条件
   * @return {Promise<Array>} [ 更新的行数, 更新的实体数组 ]
   */
  async updateAll(data, options = {}) {
    return this.model.update(data, options);
  }

  /**
   * 删除一条数据（软删除）
   * @param {string|number} id 主键ID
   * @param {Object} [options] 操作参数
   * @return {Promise<boolean>} 是否成功
   */
  async destroy(id, options = {}) {
    // 先查找
    const instance = await this.findById(id);
    if (!instance) {
      return false;
    }

    // 执行删除
    await instance.destroy(options);
    return true;
  }

  /**
   * 根据条件删除数据
   * @param {Object} options 条件
   * @return {Promise<number>} 删除的行数
   */
  async destroyAll(options = {}) {
    return this.model.destroy(options);
  }

  /**
   * 计数
   * @param {Object} options 条件
   * @return {Promise<number>} 总数
   */
  async count(options = {}) {
    return this.model.count(options);
  }
}

module.exports = BaseService; 