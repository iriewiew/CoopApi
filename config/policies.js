/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

	/***************************************************************************
	*                                                                          *
	* Default policy for all controllers and actions, unless overridden.       *
	* (`true` allows public access)                                            *
	*                                                                          *
	***************************************************************************/

	//'*': true,
	'*': 'checkForUser',
	'*': 'isAuthenticated',
	MemberController: {
		'*': 'checkForUser',
		'*': 'isAuthenticated',
		Applogin: true,

	},
	EventController: {
		'*': 'checkForUser',
		'*': 'isAuthenticated',
		GetEventAppDatatable: true,
		GetEventByIdApp: true,

	},
	EventRegisterController: {
		'*': 'checkForUser',
		'*': 'isAuthenticated',
		EventHistory: true,
		PostEventJoin: true,
		EventJoinStatus:true,
		PostEventEvaComplete:true
	},
	EvaluationListController: {
		'*': 'checkForUser',
		'*': 'isAuthenticated',
		GetEvaAppListDatatable: true,

	},
	EvaluationReportController: {
		'*': 'checkForUser',
		'*': 'isAuthenticated',
		Array: true,
	},

	EvaluationReportDetailController: {
		'*': 'checkForUser',
		'*': 'isAuthenticated',
		PostEvaMsgCreate: true,
	},

	UserController: {
		'*': 'isAuthenticated',
		login: true,
		register: true
	}

}
