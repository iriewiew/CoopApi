var bcrypt = require('bcryptjs')

module.exports = {
	friendlyName: 'Update user',
	description: 'Update a new user.',

	inputs: {
		id: {
			type: 'number'
		},
		username: {
			type: 'string'
		},
		password: {
			type: 'string'
		},
	},

	fn: async function(inputs, exits) {
		var attr = {
			// id: sails.helpers.randomCryptoString({ size: 32 }).execSync(),
			username: inputs.username.toLowerCase(),
		}

		if (inputs.password) {
			attr.password = await bcrypt.hash(inputs.password, 10)

			var user = await User.update({id: inputs.id}).set({
				username: inputs.username,
				password: attr.password,
			  })
			return exits.success(user)
		}
		else {
			return exits.invalid('Missing password.')
		}
	}
}
