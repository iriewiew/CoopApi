/**
 * EvaluationList.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  primaryKey: 'id',
  attributes: {
    id:{
      type: 'number',
      autoIncrement: true,
      columnName: 'id',
    },
    eva_list_name:{
      type : 'string'
    },
    eva_id:{
      model : 'evaluation'
    },
    eva_titile_name_id:{
      model : 'evaluationtitile'
    },
    eva_point:{
      type : 'number'
    },
  },

};

