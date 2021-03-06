/**
 * EvaluationReport.js
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
    eva_point: {
      type: 'number'
    },
    eva_list_id: {
      type:'number'
    },
    event_id: {
      type: 'number',
    },
    eva_id: {
      type: 'number',
    },
    eva_titile_name_id: {
      type: 'number',
    },
  },


};