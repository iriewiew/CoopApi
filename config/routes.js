/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  'OPTIONS /*': {
    skipAssets: true,
    fn: function (req, res) {
      return res.status(200).json({
        message: 'Options ok.'
      })
    }
  },

  //Member
  'GET /student/datatable': 'MemberController.GetMemberStudentDatatable',
  'GET /teacher/datatable': 'MemberController.GetMemberTeacherDatatable',

  'POST /member/create': 'MemberController.PostMemberCreate',
  'POST /member/update': 'MemberController.PostMemberUpdate',
  'POST /member/delete': 'MemberController.PostMemberDelete',
  'GET /member/:id/view': 'MemberController.GetMemberById',

  //Faculty
  'GET /faculty/datatable': 'FacultyController.GetFacultyDatatable',
  'POST /faculty/create': 'FacultyController.PostFacultyCreate',
  'POST /faculty/update': 'FacultyController.PostFacultyUpdate',
  'POST /faculty/delete': 'FacultyController.PostFacultyDelete',
  'GET /faculty/:id/view': 'FacultyController.GetFacultyById',

  //Major
  'POST /major/create': 'MajorController.PostMajorCreate',
  'GET /faculty/major/:id/view': 'MajorController.GetMajorFacultyGetByid',
  'POST /major/update': 'MajorController.PostMajorUpdate',
  'POST /major/delete': 'MajorController.PostMajorDelete',
  'GET /major/:id/view': 'MajorController.GetMajorById',
  'GET /major/datatable': 'MajorController.GetMajorDatatable',


  //Event
  'GET /event/datatable': 'EventController.GetEventDatatable',
  'GET /eventApp/datatable': 'EventController.GetEventAppDatatable',
  'POST /event/create': 'EventController.PostEventCreate',
  'POST /event/update': 'EventController.PostEventUpdate',
  'POST /event/delete': 'EventController.PostEventDelete',
  'GET /event/:id/view': 'EventController.GetEventById',
  'GET /eventApp/:id/view': 'EventController.GetEventByIdApp',



  'GET /event/report/alldata': 'EventRegisterController.GetEventReportAllDatatable',
  'GET /event/report/:id/view': 'EventRegisterController.GetEventReportDatatable',
  'POST /event/report/accept': 'EventRegisterController.PostEventAccept',
  'POST /event/report/delete': 'EventRegisterController.PostEventReportDelete',
  

  'POST /eventApp/join': 'EventRegisterController.PostEventJoin',

  'GET /event/history/:id/view': 'EventRegisterController.EventHistory',
  'GET /eventApp/status/:id/:event_id': 'EventRegisterController.EventJoinStatus',



  'POST /event/report/join': 'EventRegisterController.PostEventJoin',
  //Evaluation
  'GET /evaluation/datatable': 'EvaluationController.GetEvaluationDatatable',
  'POST /evaluation/create': 'EvaluationController.PostEvaluationCreate',
  'POST /evaluation/update': 'EvaluationController.PostEvaluationUpdate',
  'POST /evaluation/delete': 'EvaluationController.PostEvaluationDelete',
  'GET /evaluation/:id/view': 'EvaluationController.GetEvaluationById',


  'GET /evaluation/list/:id/view': 'EvaluationListController.GetEvaluationListGetByid',
  'GET /evaluation/list/:id/:titile_id/view': 'EvaluationListController.GetEvaListAndTitileByid',


  'GET /evaluation/list/datatable': 'EvaluationListController.GetEvaluationListDatatable',
  'POST /evaluation/list/create': 'EvaluationListController.PostEvaluationListCreate',
  'POST /evaluation/list/update': 'EvaluationListController.PostEvaluationListUpdate',
  'POST /evaluation/list/delete': 'EvaluationListController.PostEvaluationListDelete',
  'POST /evaluation/titilelist/delete': 'EvaluationListController.PostEvaluationTitileListDelete',

  'GET /evaluation/listdata/:id/view': 'EvaluationListController.GetListById',

  'GET /evaluation/titile/:id/view': 'EvaluationTitileController.GetEvaluationTitileById',
  'POST /evaluation/titile/create': 'EvaluationTitileController.PostEvaTitileCreate',
  'POST /evaluation/titile/update': 'EvaluationTitileController.PostEvaTitileUpdate',
  'POST /evaluation/titile/delete': 'EvaluationTitileController.PostEvaluationTitileDelete',

  'GET /evaApp/list/:id/view': 'EvaluationListController.GetEvaAppListDatatable',

  //Notify
  'GET /notification/datatable': 'NotificationController.GetNotificationDatatable',
  'POST /notification/create': 'NotificationController.PostNotificationCreate',
  'POST /notification/update': 'NotificationController.PostNotificationUpdate',
  'POST /notification/delete': 'NotificationController.PostNotificationDelete',
  'GET /notification/:id/view': 'NotificationController.GetNotificationById',


  'POST /evaApp/EvaComplete': 'EventRegisterController.PostEventEvaComplete',
  'POST /point/add/:user_id/:event_id': 'EvaluationReportController.Array',
  'POST /evaApp/msgSend': 'EvaluationReportDetailController.PostEvaMsgCreate',
  'POST /api/app/login': 'MemberController.Applogin',


  'GET /eva_report/:id/view': 'EvaluationReportController.GetEvaReportData',
  'GET /eva_report/msg/:id/view': 'EvaluationReportDetail.GetEvaluationReportDetail',

  
  // //Branch API
  // 'GET /branch/datatable': 'BranchController.GetBranchDatatable',
  // 'POST /branch/create': 'BranchController.PostBranchCreate',
  // 'GET /branch/:id/view': 'BranchController.GetBranchById',
  // 'POST /branch/update': 'BranchController.PostBranchUpdate',
  // 'POST /branch/delete': 'BranchController.PostBranchDelete',
  // //Position API
  // 'GET /position/datatable': 'PositionController.GetpositionDatatable',
  // 'POST /position/create': 'PositionController.PostPositionCreate',
  // 'GET /position/:id/view': 'PositionController.GetPositionById',
  // 'POST /position/update': 'PositionController.PostPositionUpdate',
  // 'POST /position/delete': 'PositionController.PostPositionDelete',
  // //Branch_Addit API
  // 'GET /branchaddit/datatable': 'BranchadditController.GetbranchadditDatatable',
  // 'POST /branchaddit/create': 'BranchadditController.PostbranchadditCreate',
  // 'GET /branchaddit/:id/view': 'BranchadditController.GetbranchadditById',
  // 'POST /branchaddit/update': 'BranchadditController.PostbranchadditUpdate',
  // 'POST /branchaddit/delete': 'BranchadditController.PostbranchadditDelete',
  // //User API
  // // 'GET /user/datatable': 'UserController.GetuserDatatable',
  // // 'POST /user/create': 'UserController.PostuserCreate',
  // // 'GET /user/:id/view': 'UserController.GetuserById',
  // // 'POST /user/update': 'UserController.PostuserUpdate',
  // // 'POST /user/delete': 'UserController.PostuserDelete',
  // //Employee API
  // 'GET /emp/datatable': 'EmployeesController.GetemployeeDatatable',
  // 'POST /emp/create': 'EmployeesController.PostemployeeCreate',
  // 'GET /emp/:id/view': 'EmployeesController.GetemployeeById',
  // 'POST /emp/update': 'EmployeesController.PostemployeeUpdate',
  // 'POST /emp/delete': 'EmployeesController.PostemployeeDelete',
  // //Benefit API
  // 'GET /benefit/datatable': 'BenefitController.GetbenefitDatatable',
  // 'POST /benefit/create': 'BenefitController.PostbenefitCreate',
  // 'GET /benefit/:id/view': 'BenefitController.GetbenefitById',
  // 'POST /benefit/update': 'BenefitController.PostbenefitUpdate',
  // 'POST /benefit/delete': 'BenefitController.PostbenefitDelete',
  // //Fixcost API
  // 'GET /fixcost/datatable': 'FixcostController.GetfixcostDatatable',
  // 'POST /fixcost/create': 'FixcostController.PostfixcostCreate',
  // 'GET /fixcost/:id/view': 'FixcostController.GetfixcostById',
  // 'POST /fixcost/update': 'FixcostController.PostfixcostUpdate',
  // 'POST /fixcost/delete': 'FixcostController.PostfixcostDelete',
  // //Positionemployee API
  // 'GET /positionemp/datatable': 'PositionemployeeController.GetpositionempDatatable',
  // 'POST /positionemp/create': 'PositionemployeeController.PostpositionempCreate',
  // 'GET /positionemp/:id/view': 'PositionemployeeController.GetpositionempById',
  // 'POST /positionemp/update': 'PositionemployeeController.PostpositionempUpdate',
  // 'POST /positionemp/delete': 'PositionemployeeController.PostpositionempDelete',
  // //Costdata API
  // 'GET /costdata/datatable': 'CostdataController.GetcostdataDatatable',
  // 'POST /costdata/create': 'CostdataController.PostcostdataCreate',
  // 'GET /costdata/:id/view': 'CostdataController.GetcostdataById',
  // 'POST /costdata/update': 'CostdataController.PostcostdataUpdate',
  // 'POST /costdata/delete': 'CostdataController.PostcostdataDelete',
  // //Projectmanage API
  // 'GET /projectmanage/datatable': 'ProjectmanageController.GetprojectmanageDatatable',
  // 'POST /projectmanage/create': 'ProjectmanageController.PostprojectmanageCreate',
  // 'GET /projectmanage/:id/view': 'ProjectmanageController.GetprojectmanageById',
  // 'POST /projectmanage/update': 'ProjectmanageController.PostprojectmanageUpdate',
  // 'POST /projectmanage/delete': 'ProjectmanageController.PostprojectmanageDelete',
  // //Team API
  // 'GET /team/datatable': 'TeamController.GetteamDatatable',
  // 'POST /team/create': 'TeamController.PostteamCreate',
  // 'GET /team/:id/view': 'TeamController.GetteamById',
  // 'POST /team/update': 'TeamController.PostteamUpdate',
  // 'POST /team/delete': 'TeamController.PostteamDelete',
  // 'POST /m/team/create': 'TeamController.PostteamCreateM',
  // //Projectaddit API
  // 'GET /projectaddit/datatable': 'ProjectadditController.GetprojectadditDatatable',
  // 'POST /projectaddit/create': 'ProjectadditController.PostprojectadditCreate',
  // 'GET /projectaddit/:id/view': 'ProjectadditController.GetprojectadditById',
  // 'POST /projectaddit/update': 'ProjectadditController.PostprojectadditUpdate',
  // 'POST /projectaddit/delete': 'ProjectadditController.PostprojectadditDelete',
  // //Branch cost API
  // 'GET /branchcost/addit/:id/view': 'BranchadditController.GetbranchcostGetAdditByid', // id : "branch_id"
  // 'GET /branchcost/fixcost/:id/view': 'BranchadditController.GetbranchcostGetFixcostByid',// id:"branch_id"
  // //Employee Benefit Api
  // 'GET /employee/benefit/:id/view': 'BenefitController.GetEmployeeBenefitGetByid', // id : "emp_id"
  // //Employee find Position API
  // 'GET /emp/position/:id/view': 'PositionemployeeController.GetEmployeePositionGetByid', // id : "emp_id"
  // //Chaiwat API
  // 'GET /555': 'TeamController.TestDatetotime',
  // //Position find Employee API
  // 'GET /position/emp/:id/view': 'PositionemployeeController.GetPositionEmployeeGetByid', // id : "position_id"
  // //Projecc addit API
  // 'GET /project/projectaddit/:id/view': 'ProjectadditController.GetAdditProjectGetByid', // id : "project_id"
  // //test array
  // //'POST /array': 'CostdataController.Array',
  // //Teamproject API
  // 'GET /project/team/:id/view' : 'TeamController.GetTeamProjectGetByid', //id : "project_id"
  // //manday
  // 'GET /manday/project/:id/view' : 'MandayController.GetMandayGetByid', //id : "project_id"
  // 'GET /manday/emp/datatable' : 'MandayController.GetMandayDatatable',
  // //CheckFreetime API
  // // 'GET /freetime/emp/:id/:position_id' : 'FreetimeController.Getfreetime', //id : "project_id" position_id:"position_id"
  // 'POST /freetime/emp/:id/:position_id': {
  //   controller: 'FreetimeController',
  //   action: 'Postfreetime',
  //   skipAssets: true
  // },
  // 'GET /freetime/emp/:id' : {
  //   controller: 'FreetimeController',
  //   action: 'Getfreetime',
  //   skipAssets: true
  // },
  // //Dashboard API
  // 'GET /dashboard/position':'DashboardController.GetDashposition',


  //ถ้าอันไหนไม่ได้อธิบายว่า id คืออะไร แสดงว่าเป็นไอดีของapiนั้นเอง เช่น /fixcost/:id/view คือใช้ fixcosst_id



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  'post /api/users/login': 'UserController.login',
  'post /api/users/logout': 'UserController.logout',
  'post /api/users/register': 'UserController.register',
  'post /api/users/delete': 'UserController.delete',
  'post /api/users/update': 'UserController.UserUpdate',
  'get /api/users/:id/view': 'UserController.GetUserById',
  'get /api/users/datatable': 'UserController.GetUserDatatable',
  'post /api/users/updatename': 'UserController.UserNameUpdate',
  //'post /api/test': 'PageController.test',

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
