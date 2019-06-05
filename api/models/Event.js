/**
 * Event.js
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
    event_name: {
      type: 'string'
    },
    event_date: {
      type: 'string'
    },
    event_start: {
      type: 'string'
    },
    event_end: {
      type: 'string'
    },
    event_detail: {
      type: 'string',
      columnType: 'TEXT',
    },
    // event_role: {
    //   type: 'string'
    // },
    event_year: {
      type: 'number'
    },
    event_term: {
      type: 'number'
    },
    event_place: {
      type: 'string',
      columnType: 'TEXT',
    },
    event_limit: {
      type: 'number'
    },

    event_eva_status: {
      type: 'number'
    },
    eva_id: {
      type: 'number'
    },
    status: {
      type: 'number'
    },
  },


};


