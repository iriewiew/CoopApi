/**
 * BranchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  GetBranchDatatable: async function (req, res) {
    
    let data = await Branch.find().where({
      status: 1
    })
    //console.log(data.data.branch_name);
    return res.json({
      draw: 0,
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data:data
    })
    
  },
  PostBranchCreate: async function (req, res) {
    if(!_.isUndefined(req.body.branch_name)&&!_.isUndefined(req.body.branch_address)){
        await Branch.create({
          branch_name: req.body.branch_name,
          branch_address: req.body.branch_address,
          status: 1
        }).fetch()
        return res.json({
          message: 'Create Complele'
        })
      }
  return res.status(400).json({
      Error: 'Some Data is Undefined'
    })
    
  },
  GetBranchById: async function (req, res) {
    const id = req.param('id')
    if(isNaN(id)){
      return res.status(400).json('id is not integer')
    }
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Branch.findOne({
        id: id
      });
      if (data) {
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.status(404).json('id is notfond');
    }
  },
  PostBranchUpdate: async function (req, res) {
    if (_.isUndefined(req.body.id)||req.body.id == ""){
      return res.badRequest('ID is Undefind.')
    }
    try {
      if(!_.isUndefined(req.body.branch_name)&&!_.isUndefined(req.body.branch_address)){
      await Branch.update({
        id: req.body.id
      }).set({
        branch_name: req.body.branch_name,
        branch_address: req.body.branch_address,
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
  PostBranchDelete: async function (req, res) {
    const id = req.body.id
    if(isNaN(req.body.id)){
      return res.status(400).json('id is String or id Undefined')
    }
    if(req.body.id==""){
      return res.status(400).json('id is Undefined')
    } 
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Branch.findOne({
        id: id
      })
      if (data) {
        await Branch.update({
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
