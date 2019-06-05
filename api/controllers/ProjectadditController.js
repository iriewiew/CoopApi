/**
 * ProjectadditController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')
moment.locale('th');
module.exports = {
    GetprojectadditDatatable: async function (req, res) {
        let data = await Projectaddit.find().populate('project_id'); 
        return res.json({
          draw: 0,
          recordsTotal: data.length,
          recordsFiltered: data.length,
          data: data,
    
        })
      },
      PostprojectadditCreate: async function (req, res) {
        if(!_.isUndefined(req.body.project_addit_title)&&!_.isUndefined(req.body.project_addit_date)&&!_.isUndefined(req.body.project_addit_price)&&!_.isUndefined(req.body.project_id)){
          await Projectaddit.create({
            project_addit_title: req.body.project_addit_title,
            project_addit_date: req.body.project_addit_date,
            project_addit_price: req.body.project_addit_price,
            project_id: req.body.project_id
          }).fetch()
          return res.json({
            message: 'Create Complele'
          })
        }
        return res.status(400).json({
            Error: 'Some Data is Undefined'
          })
        
      },
      GetprojectadditById: async function (req, res) {
        const id = req.param('id')
        if(isNaN(id)){
          return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
          let data = await Projectaddit.findOne({
            id: id
          }).populate('project_id');
          if (data) {
            return res.json({
              data: data,
              message: 'Load By id sucess'
            })
          }
          return res.status(404).json('id is notfond');
        }
      },
      PostprojectadditUpdate: async function (req, res) {
        if (_.isUndefined(req.body.id)||req.body.id == ""){
          return res.badRequest('ID is Undefind.')
        }
        try {
          if(!_.isUndefined(req.body.project_addit_title)&&!_.isUndefined(req.body.project_addit_date)&&!_.isUndefined(req.body.project_addit_price)&&!_.isUndefined(req.body.project_id)){
          await Projectaddit.update({
            id: req.body.id
          }).set({
            project_addit_title: req.body.project_addit_title,
            project_addit_date: req.body.project_addit_date,
            project_addit_price: req.body.project_addit_price,
            project_id: req.body.project_id
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
         // let message = await sails.helpers.error(err.code, '')
          sails.log(err)
          return res.badRequest({
            err: err,
            message: 'Code is error'
          })
        }
      },
      PostprojectadditDelete: async function (req, res) {
        const id = req.body.id
        if (_.isUndefined(id)||id == ""){
          return res.badRequest('ID is Undefind.')
        }
        await Projectaddit.destroy({
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
      GetAdditProjectGetByid : async function(req,res){
        const id = req.param('id')
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
          let data = await Projectaddit.find({where:{project_id:id}});
          const jdata = JSON.parse(JSON.stringify(data));
          let costprojectaddit = 0
          for (let i = 0; i < data.length; i++) {
            costprojectaddit += jdata[i].project_addit_price
          }
          if (data) {
            let id = [];
            let project_addit_title =[];
            let project_addit_date =[];
            let project_addit_price =[];
            let project_addit_date_format =[];
            for (let i = 0; i < jdata.length; i++) {
              id.push(jdata[i].id)
              project_addit_title.push(jdata[i].project_addit_title);
              project_addit_date.push(jdata[i].project_addit_date);
              project_addit_price.push(jdata[i].project_addit_price);
              project_addit_date_format.push(moment(jdata[i].project_addit_date).format('DD MMMM YYYY'));
          }
          var jsonObj = {}
          var array = []
         for(i=0; i < id.length; i++){
                           array.push({id:id[i],project_addit_title:project_addit_title[i],project_addit_date:project_addit_date[i],project_addit_price:project_addit_price[i],project_addit_date_format:project_addit_date_format[i]})
                      jsonObj =  array ;    
             }
             if(jdata.length != 0){
              data = jsonObj;
            }
            return res.json({
              data: data,
              totaladdit : costprojectaddit,
              message: 'Load By id sucess'
            })
          }
          return res.sendStatus(404);
        }
      },

};

