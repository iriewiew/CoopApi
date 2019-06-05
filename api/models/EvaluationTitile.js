/**
 * EvaluationTitile.js
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
    eva_titile_name: {
      type: 'string'
    },
    eva_titile_achieve_point: {
      type: 'number',
    },
    eva_id: {
      type: 'number',
    }
  },
};

