/**
 * BenefitController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')
moment.locale('th');
module.exports = {
  GetbenefitDatatable: async function (req, res) {
    let data = await Benefit.find().populate('benefit_emp_id');
    //const jsondata = JSON.parse(JSON.stringify(data));
    //             const branch_name = branch.branch_addit_branch_id.branch_name;
    //             const branch_id = branch.branch_addit_branch_id.id;
    return res.json({
      draw: 0,
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data: data,
      //date:date

    })
  },
  PostbenefitCreate: async function (req, res) {
    if(!_.isUndefined(req.body.benefit_title)&&!_.isUndefined(req.body.benefit_price)&&!_.isUndefined(req.body.benefit_date)&&!_.isUndefined(req.body.benefit_emp_id)){
      await Benefit.create({
        benefit_title: req.body.benefit_title,
        benefit_price: req.body.benefit_price,
        benefit_date : req.body.benefit_date,
        benefit_note : req.body.benefit_note,
        benefit_emp_id: req.body.benefit_emp_id,
      }).fetch()
      return res.json({
        message: 'Create Complele'
      })
    }
  return res.status(400).json({
      Error: 'Some Data is Undefined'
    })
    
  },
  GetbenefitById: async function (req, res) {
    const id = req.param('id')
    if(isNaN(id)){
      return res.status(400).json('id is not integer')
    }
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Benefit.findOne({
        id: id
      }).populate('benefit_emp_id');
      if (data) {
        Object.assign(data, {benefit_date_format:moment(data.benefit_date).format('DD MMMM YYYY')});
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.status(404).json('id is notfond');
    }
  },
  PostbenefitUpdate: async function (req, res) {
    if (_.isUndefined(req.body.id)||req.body.id == ""){
      return res.badRequest('ID is Undefind.')
    }
    try {
      if(!_.isUndefined(req.body.benefit_title)&&!_.isUndefined(req.body.benefit_price)&&!_.isUndefined(req.body.benefit_date)&&!_.isUndefined(req.body.benefit_emp_id)){
      await Benefit.update({
        id: req.body.id
      }).set({
        benefit_title: req.body.benefit_title,
        benefit_price: req.body.benefit_price,
        benefit_date : req.body.benefit_date,
        benefit_note : req.body.benefit_note,
        benefit_emp_id: req.body.benefit_emp_id,
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
  PostbenefitDelete: async function (req, res) {
    const id = req.body.id
    if (_.isUndefined(id||id == "")){
      return res.badRequest('ID is Undefind.')
    }
    await Benefit.destroy({
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
  GetEmployeeBenefitGetByid : async function (req,res) {
    const id = req.param('id')
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Benefit.find({where:{benefit_emp_id:id}});
      if (data) {
        const jdata = JSON.parse(JSON.stringify(data));
        let total = 0
          for (let i = 0; i < data.length; i++) {
            total += jdata[i].benefit_price
          }
        return res.json({
          data: data,
          benafitTotal: total,
          message: 'Load By id sucess'
        })
      }
      return res.sendStatus(404);
    }
}

};
