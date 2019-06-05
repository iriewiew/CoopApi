/**
 * Member.js
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
    user_id:{
      type: 'string',
      unique: true
    },
    user_pass:{
      type : 'string'
    },
    prefix_name:{
      type : 'string'
    },
    first_name:{
      type : 'string'
    },
    last_name:{
      type : 'string'
    },
    role_name:{
      type : 'string'
    },
    // email:{
    //   type : 'string'
    // },
    major_name:{
      model : 'major'
    },
    faculty_name:{
      model:'faculty'
    },
    config:{
      type : 'string'
    },

  },



};

