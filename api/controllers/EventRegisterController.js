/**
 * EventRegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    GetEventReportAllDatatable: async function (req, res) {

        let data = await EventRegister.find().populate('event_id');
        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
        })

    },

    GetEventReportDatatable: async function (req, res) {
        const id = req.param('id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await EventRegister.find({
                where: {
                    event_id: id
                }
            }).populate('user_id').populate('faculty_id');
            if (data) {
                return res.json({
                    data: data,
                    message: 'Load By id sucess'
                })
            }
            return res.status(404).json('id is notfond');
        }
    },

    PostEventReportDelete: async function (req, res) {
        const id = req.body.id
        if (_.isUndefined(id || id == "")) {
            return res.badRequest('ID is Undefind.')
        }
        await EventRegister.destroy({
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

    PostEventAccept: async function (req, res) {
        if (_.isUndefined(req.body.id) || req.body.id == "") {
            return res.badRequest('ID is Undefind.')
        }
        try {
            if (!_.isUndefined(req.body.status)) {
                await EventRegister.update({
                    id: req.body.id
                }).set({
                    status: req.body.status,

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

    EventHistory: async function (req, res) {
        const id = req.param('id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await EventRegister.find({
                where: {
                    user_id: id,
                    status: 1
                }
            }).populate('user_id').populate('event_id').sort([
                { createdAt: 'DESC' },
            ]);
            if (data) {
                return res.json({
                    data: data,
                    message: 'Load By id sucess'
                })
            }
            return res.status(404).json('id is notfond');
        }


    },
    PostEventJoin: async function (req, res) {
        await EventRegister.create({

            event_id: req.body.event_id,
            user_id: req.body.user_id,
            status: 1,
            eva_status: 0,
            user_role: req.body.user_role,
            faculty_id: req.body.faculty_id,



        }).fetch()
        return res.json({
            message: 'Create Complele'
        })

    },

    EventJoinStatus: async function (req, res) {
        const id = req.param('id')
        const event_id = req.param('event_id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await EventRegister.findOne({
                where: {
                    user_id: id,
                    event_id: event_id
                }
            }).populate('user_id').populate('event_id');
            if (data) {
                return res.json({
                    data: data,
                    message: 'Load By id sucess'
                })
            }
            return res.status(404).json('id is notfond');
        }


    },
    PostEventEvaComplete: async function (req, res) {
        if (_.isUndefined(req.body.id) || req.body.id == "") {
            return res.badRequest('ID is Undefind.')
        }
        try {
            if (!_.isUndefined(req.body.eva_status)) {
                await EventRegister.update({
                    id: req.body.id
                }).set({
                    eva_status: req.body.eva_status,

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

};

