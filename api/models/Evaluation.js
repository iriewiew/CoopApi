/**
 * Evaluation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  primaryKey: 'id',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      columnName: 'id',
    },
    eva_number: {
      type: 'number'
    },
    eva_name: {
      type: 'string'
    },
    eva_detail: {
      type: 'string',
      columnType: 'TEXT',
    },
    eva_created_name: {
      type: 'string',
    },
    eva_achieve_point: {
      type: 'number'
    }
  },

};

