/**
 * PositionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  GetpositionDatatable: async function (req, res) {
    let data = await Position.find().where({
      status: 1
    })
    return res.json({
      draw: 0,
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data: data
    })
  },
  PostPositionCreate: async function (req, res) {
    if(!_.isUndefined(req.body.position_name)){
      await Position.create({
        position_name: req.body.position_name,
        status: 1
      }).fetch()
      return res.json({
        Message: 'Create Complele'
      })
    }
    return res.status(400).json({
      Error: 'Some Data is Undefined'
    })
  },
  GetPositionById: async function (req, res) {
    const id = req.param('id')
    if(isNaN(id)){
      return res.status(400).json('id is not integer')
    }
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Position.findOne({
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
  PostPositionUpdate: async function (req, res) {
    if (_.isUndefined(req.body.id)||req.body.id == ""){
      return res.badRequest('ID is Undefind.')
    }
    try {
        if(!_.isUndefined(req.body.position_name)){
          await Position.update({
            id: req.body.id
          }).set({
            position_name: req.body.position_name
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
  PostPositionDelete: async function (req, res) {
    const id = req.body.id
    if(isNaN(req.body.id)){
      return res.status(400).json('id is String or id Undefined')
    }
    if(req.body.id==""){
      return res.status(400).json('id is Undefined')
    } 
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Position.findOne({
        id: id
      })
      if (data) {
        await Position.update({
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
  },

};
