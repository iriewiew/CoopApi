/**
 * FixcostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  GetfixcostDatatable: async function (req, res) {
    let data = await Fixcost.find().populate('fixcost_branch_id');
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
  PostfixcostCreate: async function (req, res) {
    if(!_.isUndefined(req.body.fixcost_title)&&!_.isUndefined(req.body.fixcost_price)&&!_.isUndefined(req.body.fixcost_note)&&!_.isUndefined(req.body.fixcost_branch_id)){
    await Fixcost.create({
      fixcost_title: req.body.fixcost_title,
      fixcost_price: req.body.fixcost_price,
      fixcost_note: req.body.fixcost_note,
      fixcost_branch_id: req.body.fixcost_branch_id
    }).fetch()
    return res.json({
      message: 'Create Complele'
    })
  }
  return res.status(400).json({
      Error: 'Some Data is Undefined'
    })
  },
  GetfixcostById: async function (req, res) {
    const id = req.param('id')
    if(isNaN(id)){
      return res.status(400).json('id is not integer')
    }
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Fixcost.findOne({
        id: id
      }).populate('fixcost_branch_id');
      if (data) {
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.status(404).json('id is notfond');
    }
  },
  PostfixcostUpdate: async function (req, res) {
    if (_.isUndefined(req.body.id)||req.body.id == ""){
      return res.badRequest('ID is Undefind.')
    }
    try {
      if(!_.isUndefined(req.body.fixcost_title)&&!_.isUndefined(req.body.fixcost_price)&&!_.isUndefined(req.body.fixcost_note)){
      await Fixcost.update({
        id: req.body.id
      }).set({
        fixcost_title: req.body.fixcost_title,
        fixcost_price: req.body.fixcost_price,
        fixcost_note: req.body.fixcost_note,
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
  PostfixcostDelete: async function (req, res) {
    const id = req.body.id
    if (_.isUndefined(id)||id == ""){
      return res.badRequest('ID is Undefind.')
    }
    await Fixcost.destroy({
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
  }


};
