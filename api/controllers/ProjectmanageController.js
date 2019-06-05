/**
 * ProjectmanageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')
moment.locale('th');
module.exports = {
  GetprojectmanageDatatable: async function (req, res) {
    let data = await Projectmanage.find().where({
      status: 1
    });
    //console.log(data.data.branch_name);
    const jdata = JSON.parse(JSON.stringify(data));
    let total = 0
    let total2 = 0
          for (let i = 0; i < data.length; i++) {
            total += jdata[i].project_total_cost
            total2 += jdata[i].project_total_selling
          }
      let id = [];
      let project_name =[];
      let project_costomer_name =[];
      let project_start_date =[];
      let project_start_date_format =[];
      let project_team_name = [];
      let project_total_cost = [];
      let project_total_selling = [];
      for (let i = 0; i < jdata.length; i++) {
        id.push(jdata[i].id)
        project_name.push(jdata[i].project_name);
        project_costomer_name.push(jdata[i].project_costomer_name);
        project_team_name.push(jdata[i].project_team_name);
        project_start_date.push(jdata[i].project_start_date);
        project_total_cost.push(jdata[i].project_total_cost);
        project_total_selling.push(jdata[i].project_total_selling);
        project_start_date_format.push(moment(jdata[i].project_start_date).format('DD MMMM YYYY'));
    }
    var jsonObj = {}
    var array = []
   for(i=0; i < id.length; i++){
                array.push({id:id[i],project_name:project_name[i],project_costomer_name:project_costomer_name[i],project_team_name:project_team_name[i],project_start_date:project_start_date[i],project_start_date_format:project_start_date_format[i],project_total_cost:project_total_cost[i],project_total_selling:project_total_selling[i]})
                jsonObj =  array ;    
       }
       if(jdata.length != 0){
        data = jsonObj;
      }

    return res.json({
      draw: 0,
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data: data,
      allproject_cost:total,
      allproject_selling:total2
    })

  },
  PostprojectmanageCreate: async function (req, res) {
    if(!_.isUndefined(req.body.project_name)&&!_.isUndefined(req.body.project_costomer_name)&&!_.isUndefined(req.body.project_start_date)&&!_.isUndefined(req.body.project_end_date)&&!_.isUndefined(req.body.project_team_name)&&!_.isUndefined(req.body.project_note)){
      await Projectmanage.create({
        project_name: req.body.project_name,
        project_costomer_name: req.body.project_costomer_name,
        project_start_date: req.body.project_start_date,
        project_end_date: req.body.project_end_date,
        project_team_name: req.body.project_team_name,
        project_total_cost: 0,
        project_note: req.body.project_note,
        status : 1,
        selling : req.body.selling
    }).fetch()
    return res.json({
      message: 'Create Complele'
    })
    }
    return res.status(400).json({
        Error: 'Some Data is Undefined'
      })
   
  },
  GetprojectmanageById: async function (req, res) {
    const id = req.param('id')
    if(isNaN(id)){
      return res.status(400).json('id is not integer')
    }
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Projectmanage.findOne({
        id: id
      });
      if (data) {
        Object.assign(data, {project_start_date_format:moment(data.project_start_date).format('DD MMMM YYYY')
      ,project_end_date_format:moment(data.project_end_date).format('DD MMMM YYYY')});
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.status(404).json('id is notfond');
    }
  },
  PostprojectmanageUpdate: async function (req, res) {
    if (_.isUndefined(req.body.id)||req.body.id == ""){
      return res.badRequest('ID is Undefind.')
    }
    try {
      if(!_.isUndefined(req.body.project_name)&&!_.isUndefined(req.body.project_costomer_name)&&!_.isUndefined(req.body.project_start_date)&&!_.isUndefined(req.body.project_end_date)&&!_.isUndefined(req.body.project_team_name)&&!_.isUndefined(req.body.project_note)){
        let data2 = await Projectmanage.findOne({
          id: req.body.id
        });
        let project_total_cost = data2.project_total_cost
        await Projectmanage.update({
        id: req.body.id
      }).set({
        project_name: req.body.project_name,
        project_costomer_name: req.body.project_costomer_name,
        project_start_date: req.body.project_start_date,
        project_end_date: req.body.project_end_date,
        project_team_name: req.body.project_team_name,
        project_note: req.body.project_note,
        selling : req.body.selling,
        project_total_selling : project_total_cost*(req.body.selling/100)+project_total_cost
      })
      return res.json({
        message: 'Update sucsess'
      })
    }
    return res.status(400).json({
        Error: 'Some Data is Undefined'
      })

    } catch (err) {
      // sails.log(err)
      // sails.log(JSON.stringify(err))
      //let message = await sails.helpers.error(err.code, '')
      sails.log(err)
      return res.badRequest({
        err: err,
        message: 'Code is error'
      })
    }
  },
  PostprojectmanageDelete: async function (req, res) {
    const id = req.body.id
    if(isNaN(req.body.id)){
      return res.status(400).json('id is String or id Undefined')
    }
    if(req.body.id==""){
      return res.status(400).json('id is Undefined')
    } 
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Projectmanage.findOne({
        id: id
      })
      if (data) {
        await Projectmanage.update({
          id: req.body.id
        }).set({
          status: 0
        })
        return res.json({
          message: 'Delete sucsess'
        })
      }
    }
    return res.sendStatus(404);
  }

};
