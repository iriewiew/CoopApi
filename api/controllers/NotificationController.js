/**
 * NotificationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    GetNotificationDatatable: async function (req, res) {

        let data = await Notification.find()
        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
        })

    },
    PostNotificationCreate: async function (req, res) {
        if (!_.isUndefined(req.body.notification_msg)) {
            await Notification.create({

                notification_msg: req.body.notification_msg,

            }).fetch()
            return res.json({
                message: 'Create Complele'
            })
        }
        return res.status(400).json({
            Error: 'Some Data is Undefined'
        })

    },

    GetNotificationById: async function (req, res) {
        const id = req.param('id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await Notification.findOne({
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

    PostNotificationUpdate: async function (req, res) {
        if (_.isUndefined(req.body.id)||req.body.id == ""){
          return res.badRequest('ID is Undefind.')
        }
        try {
            if(!_.isUndefined(req.body.notification_msg)){
              await Notification.update({
                id: req.body.id
              }).set({
                notification_msg: req.body.notification_msg
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
      PostNotificationDelete: async function (req, res) {
        const id = req.body.id
        if (_.isUndefined(id || id == "")) {
            return res.badRequest('ID is Undefind.')
        }
        await Notification.destroy({
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
};

