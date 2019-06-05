/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	primaryKey: 'id',

	attributes: {

		username: {
			type: 'string',
			required: true,
			unique: true
		},

		password: {
			type: 'string',
			required: true
		},
		name:{
			type:'string'
		},
		status:{
			type:'string'
		}
	},

	customToJSON() {
		// obviously never return password downstream to anyone, ever
		return _.omit(this, [
			'password',
		])
	},
}
