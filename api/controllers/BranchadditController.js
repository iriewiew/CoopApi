/**
 * BranchadditController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')
moment.locale('th');
module.exports = {
  GetbranchadditDatatable: async function (req, res) {
    let data = await Branchaddit.find().populate('branch_addit_branch_id');
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
  PostBranchadditCreate: async function (req, res) {
    if(!_.isUndefined(req.body.branch_addit_title)&&!_.isUndefined(req.body.branch_addit_price)&&!_.isUndefined(req.body.branch_addit_date)&&!_.isUndefined(req.body.branch_addit_branch_id)){
      await Branchaddit.create({
        branch_addit_title: req.body.branch_addit_title,
        branch_addit_price: req.body.branch_addit_price,
        branch_addit_date: req.body.branch_addit_date,
        branch_addit_branch_id: req.body.branch_addit_branch_id
      }).fetch()
      return res.json({
        message: 'Create Complele'
      })
    }
  return res.status(400).json({
      Error: 'Some Data is Undefined'
    })
    
  },
  GetBranchadditById: async function (req, res) {
    const id = req.param('id')
    if(isNaN(id)){
      return res.status(400).json('id is not integer')
    }
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Branchaddit.findOne({
        id: id
      }).populate('branch_addit_branch_id');
      if (data) {
        Object.assign(data, {branch_addit_date_format:moment(data.branch_addit_date).format('DD MMMM YYYY')});
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.status(404).json('id is notfond');
    }
  },
  PostBranchadditUpdate: async function (req, res) {
    if (_.isUndefined(req.body.id)||req.body.id == ""){
      return res.badRequest('ID is Undefind.')
    }
    try {
      if(!_.isUndefined(req.body.branch_addit_title)&&!_.isUndefined(req.body.branch_addit_price)&&!_.isUndefined(req.body.branch_addit_date)){
      await Branchaddit.update({
        id: req.body.id
      }).set({
        branch_addit_title: req.body.branch_addit_title,
        branch_addit_price: req.body.branch_addit_price,
        branch_addit_date: req.body.branch_addit_date,
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
  PostBranchadditDelete: async function (req, res) {
    const id = req.body.id
    if (_.isUndefined(id)||id == ""){
      return res.badRequest('ID is Undefind.')
    }
    await Branchaddit.destroy({
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
  GetbranchcostGetAdditByid : async function(req,res){
    const id = req.param('id')
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Branchaddit.find({where:{branch_addit_branch_id:id}});
      if (data) {
        const jdata = JSON.parse(JSON.stringify(data));
    let total = 0
          for (let i = 0; i < data.length; i++) {
            total += jdata[i].branch_addit_price
          }
            let id = [];
            let branch_addit_title =[];
            let branch_addit_price =[];
            let branch_addit_date =[];
            let branch_addit_branch_id =[];
            let branch_addit_date_format = [];
            for (let i = 0; i < jdata.length; i++) {
              id.push(jdata[i].id)
              branch_addit_title.push(jdata[i].branch_addit_title);
              branch_addit_price.push(jdata[i].branch_addit_price);
              branch_addit_date.push(jdata[i].branch_addit_date);
              branch_addit_branch_id.push(jdata[i].branch_addit_branch_id)
              branch_addit_date_format.push(moment(jdata[i].branch_addit_date).format('DD MMMM YYYY'));
          }
          var jsonObj = {}
          var array = []
         for(i=0; i < id.length; i++){
                           array.push({id:id[i],branch_addit_title:branch_addit_title[i],branch_addit_price:branch_addit_price[i],branch_addit_date:branch_addit_date[i],branch_addit_branch_id:branch_addit_branch_id[i],branch_addit_date_format:branch_addit_date_format[i]})
                      jsonObj =  array ;    
             }
             if(jdata.length != 0){
              data = jsonObj;
            }
        return res.json({
          data: data,
          branchAdditTotal :total,
          message: 'Load By id sucess'
        })
      }
      return res.sendStatus(404);
    }
  },
  GetbranchcostGetFixcostByid : async function(req,res){
    const id = req.param('id')
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Fixcost.find({where:{fixcost_branch_id:id}});
      if (data) {
        const jdata = JSON.parse(JSON.stringify(data));
        let total = 0
          for (let i = 0; i < data.length; i++) {
            total += jdata[i].fixcost_price
          }
        return res.json({
          data: data,
          branchFixcostTotal : total,
          message: 'Load By id sucess'
        })
      }
      return res.sendStatus(404);
    }
  },

};
