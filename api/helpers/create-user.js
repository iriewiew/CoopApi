var bcrypt = require('bcryptjs')

module.exports = {
	friendlyName: 'Create user',
	description: 'Create a new user.',

	inputs: {
		username: {
			type: 'string'
		},
		password: {
			type: 'string'
		},
		name:{
			type :'string'
		},
		status:{
			type:'string'
		}
	},

	exits: {
		invalid: {
			responseType: 'badRequest',
			description: 'The provided username address and/or password are invalid.',
		},
		usernameAlreadyInUse: {
			statusCode: 409,
			description: 'The provided username address is already in use.',
		},
	},

	fn: async function(inputs, exits) {
		var attr = {
			// id: sails.helpers.randomCryptoString({ size: 32 }).execSync(),
			username: inputs.username.toLowerCase(),
		}

		if (inputs.password) {
			attr.password = await bcrypt.hash(inputs.password, 10)
			attr.name = inputs.name
			attr.status = inputs.status
			var user = await User.create(attr)
			.intercept('E_UNIQUE', () => 'usernameAlreadyInUse')
			.intercept({name: 'UsageError'}, () => 'invalid')
			.fetch()

			return exits.success(user)
		}
		else {
			return exits.invalid('Missing password.')
		}
	}
}
