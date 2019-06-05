/**
 * EvaluationReportDetail.js
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
    event_id: {
      type: 'number'
    },
    eva_msg: {
      type: 'string'
    },
    user_id: {
      type: 'number'
    },
    faculty_id: {
      type: 'number'
    },
  },

};

