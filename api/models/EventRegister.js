/**
 * EventRegister.js
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
      model: 'event'
    },
    user_role: {
      type: 'string'
    },
    user_id: {
      model: 'member',
      unique: true
    },
    eva_status: {
      type: 'number'
    },
    faculty_id: {
      model: 'faculty'
    },
    status: {
      type: 'number'
    },
  },



};

