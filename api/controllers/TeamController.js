/**
 * TeamController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')
moment.locale('th');
module.exports = {
  GetteamDatatable: async function (req, res) {
    let data = await Team.find().populate('emp_id');
    // const branch = JSON.parse(JSON.stringify(branch_addit_branch_id[0]));
    //             const branch_name = branch.branch_addit_branch_id.branch_name;
    //             const branch_id = branch.branch_addit_branch_id.id;

    return res.json({
      draw: 0,
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data: data,

    })
  },
  PostteamCreate: async function (req, res) {
    //if(!_.isUndefined(req.body.pushdataarray)&&!_.isUndefined(req.body.project_id)&&!_.isUndefined(req.body.position_id)){
    let pushdata = req.body.pushdataarray
    let project_id = req.body.project_id
    let positionid = req.body.position_id
    //sails.log(project_id)
    for (let i = 0; i < pushdata.length; i++) {
      await Team.create({
        emp_id: pushdata[i],
        project_id: project_id,
        position_id: positionid
      }).fetch()
    }
  // }
  // return res.status(400).json({
  //     Error: 'Some Data is Undefined'
  //   })
    // let empdate = req.body.emp_start_date;
    // let empdate2 = req.body.emp_end_date;
    // empdate = empdate.split("-");
    // empdate2 = empdate2.split("-");
    // let newDate = empdate[2] + "/" + empdate[1] + "/" + empdate[0];
    // let newDate2 = empdate2[2] + "/" + empdate2[1] + "/" + empdate2[0];
    // timestamp = parseDMY(newDate).getTime();
    // timestamp2 = parseDMY(newDate2).getTime();
    // let day = timestamp2 - timestamp;
    // day = Math.floor((day / (3600 * 24)) / 1000);
    // let emp_sprint = (day / 7 | 0) + 1;
    // await Team.create({
    //   emp_start_date: req.body.emp_start_date,
    //   emp_end_date: req.body.emp_end_date,
    //   emp_workday: day,
    //   emp_sprint: emp_sprint,
    //   emp_id: req.body.emp_id
    // }).fetch()
    return res.json({
      message: 'Create Complele'
    })
  },
  GetteamById: async function (req, res) {
    const id = req.param('id')
    if(isNaN(id)){
      return res.status(400).json('id is not integer')
    }
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Team.findOne({
        id: id
      }).populate('emp_id');
      if (data) {
        Object.assign(data, {emp_start_date_format:moment(data.emp_start_date).format('DD MMMM YYYY')
      ,emp_end_date_format:moment(data.emp_end_date).format('DD MMMM YYYY')});
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.status(404).json('id is notfond');
    }
  },
  PostteamUpdate: async function (req, res) {
    if (_.isUndefined(req.body.id)||req.body.id == ""){
      return res.badRequest('ID is Undefind.')
    }
    try {
      //if(!_.isUndefined(req.body.pushdataarray)&&!_.isUndefined(req.body.project_id)&&!_.isUndefined(req.body.position_id)){
      // let subempdata = req.body.emp_start_date;
      // let subempdata2 = req.body.emp_end_date;
      // subempdata = subempdata.split("T");
      // subempdata2 = subempdata2.split("T");
      // let empdate = subempdata[0];
      // let empdate2 = subempdata2[0];
      // empdate = empdate.split("-");
      // empdate2 = empdate2.split("-");
      // let newDate = empdate[2] + "/" + empdate[1] + "/" + empdate[0];
      // let newDate2 = empdate2[2] + "/" + empdate2[1] + "/" + empdate2[0];
      // timestamp = parseDMY(newDate).getTime();
      // timestamp2 = parseDMY(newDate2).getTime();
      let day = req.body.emp_end_date - req.body.emp_start_date;
      day = Math.floor((day / (3600 * 24)) / 1000);
      let emp_sprint = (day / 7 | 0) + 1;
      if(day == 0){
        emp_sprint = 0
      }
      await Team.update({
        id: req.body.id
      }).set({
        emp_start_date: req.body.emp_start_date,
        emp_end_date: req.body.emp_end_date,
        emp_workday: day,
        emp_sprint: emp_sprint,
      })
      return res.json({
        message: 'Update sucsess'
      })
    // }
    // return res.status(400).json({
    //     Error: 'Some Data is Undefined'
    //   })

    } catch (err) {
      // sails.log(err)
      // sails.log(JSON.stringify(err))
      //let message = await sails.helpers.error(err.code, '')
      //sails.log(err)
      return res.badRequest({
        err: err,
        message: 'Code is error'
      })
      throw err
    }
  },
  PostteamDelete: async function (req, res) {
    const id = req.body.id
    if (_.isUndefined(id)||id == ""){
      return res.badRequest('ID is Undefind.')
    }
    await Team.destroy({
      id: id
    }).exec(function (err) {
      if (err) {
        return res.sendStaus(500, {
          error: "database error"
        })
      }
      return res.json({
        message: 'Delete sucsess'
      })
    })
  },
  TestDatetotime: async function (req, res) {

    var empdate = "2019-06-22";
    var empdate2 = "2019-07-26";
    empdate = empdate.split("-");
    empdate2 = empdate2.split("-");
    var newDate = empdate[2] + "/" + empdate[1] + "/" + empdate[0];
    var newDate2 = empdate2[2] + "/" + empdate2[1] + "/" + (+empdate2[0] + 1);
    // var days = Math.floor(31622400 / (3600*24));
    // return res.json({day : days,
    // date : newDate
    // })
    timestamp = parseDMY(newDate).getTime();
    timestamp2 = parseDMY(newDate2).getTime();
    var day = timestamp2 - timestamp;
    day = Math.floor((day / (3600 * 24)) / 1000);
    let emp_sprint = (day / 7 | 0) + 1;

    return res.send({
      date: newDate + " - " + newDate2,
      timestamp: timestamp,
      day: day,
      sprint: emp_sprint
    })
  },
  GetTeamProjectGetByid: async function (req, res) {
    const id = req.param('id')
    // let position_id = req.param('position_id');
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Team.find({
        where: {
          project_id: id
        }
      }).populate('emp_id').populate('position_id');

      if (data) {
        const jdata = JSON.parse(JSON.stringify(data));
        let id = [];
        let emp_start_date = [];
        let emp_end_date = [];
        let emp_start_date_format = [];
        let emp_end_date_format = [];
        let emp_id = [];
        let position_id = [];
        let updatedAt = [];
        for (let i = 0; i < jdata.length; i++) {
          id.push(jdata[i].id)
          emp_start_date.push(jdata[i].emp_start_date);
          emp_end_date.push(jdata[i].emp_end_date);
          emp_id.push(jdata[i].emp_id);
          position_id.push(jdata[i].position_id);
          updatedAt.push(jdata[i].updatedAt);
          emp_start_date_format.push(moment(jdata[i].emp_start_date).format('DD MMMM YYYY'));
          emp_end_date_format.push(moment(jdata[i].emp_end_date).format('DD MMMM YYYY'));
        }
        var jsonObj = {}
        var array = []
       for(i=0; i < id.length; i++){
                         array.push({updatedAt:updatedAt[i],id:id[i],emp_start_date:emp_start_date[i],emp_end_date:emp_end_date[i],emp_id:emp_id[i],position_id:position_id[i],emp_start_date_format:emp_start_date_format[i],emp_end_date_format:emp_end_date_format[i]})
                    jsonObj =  array ;    
           }
           if(jdata.length != 0){
            data = jsonObj;
          }
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.sendStatus(404);
    }
  },
  PostteamCreateM: async function (req, res) {
    if(!_.isUndefined(req.body.emp_id)&&!_.isUndefined(req.body.project_id)&&!_.isUndefined(req.body.position_id)){
    let emp_id = req.body.emp_id
    let project_id = req.body.project_id
    let positionid = req.body.position_id
    let day = req.body.emp_end_date - req.body.emp_start_date;
    day = Math.floor((day / (3600 * 24)) / 1000);
    let emp_sprint = (day / 7 | 0) + 1;
    if(day == 0){
      emp_sprint = 0
    }
      await Team.create({
        emp_id: emp_id,
        project_id: project_id,
        position_id: positionid,
        emp_start_date: req.body.emp_start_date,
        emp_end_date: req.body.emp_end_date,
        emp_workday: day,
        emp_sprint: emp_sprint,
      }).fetch()
    return res.json({
      message: 'Create Complele'
    })
  }
  return res.status(400).json({
      Error: 'Some Data is Undefined'
    })
  },

};

function parseDMY(s) {
  var b = s.split(/\D/);
  var d = new Date(b[2], --b[1], b[0]);
  return d && d.getMonth() == b[1] ? d : new Date(NaN);
}
