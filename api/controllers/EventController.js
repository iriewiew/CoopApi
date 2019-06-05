/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    GetEventDatatable: async function (req, res) {

        let data = await Event.find().sort([
            { event_date: 'DESC' },
          ]);
        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
        })

    },
    GetEventAppDatatable: async function (req, res) {

        let data = await Event.find().sort([
            { event_date: 'DESC' },
          ]);
        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
        })

    },

    PostEventCreate: async function (req, res) {
        if (!_.isUndefined(req.body.event_name) && !_.isUndefined(req.body.event_start) && !_.isUndefined(req.body.event_end) && !_.isUndefined(req.body.event_date) && !_.isUndefined(req.body.event_detail)  && !_.isUndefined(req.body.event_year) && !_.isUndefined(req.body.event_term) && !_.isUndefined(req.body.event_eva_status) && !_.isUndefined(req.body.status))  {
            await Event.create({

                event_name: req.body.event_name,
                event_start: req.body.event_start,
                event_end: req.body.event_end,
                event_date: req.body.event_date,
                event_detail: req.body.event_detail,
                event_year: req.body.event_year,
                event_term: req.body.event_term,
                event_place: req.body.event_place,
                event_limit: req.body.event_limit,
                eva_id: req.body.eva_id,
                event_eva_status: req.body.event_eva_status,
                status: req.body.status,


            }).fetch()
            return res.json({
                message: 'Create Complele'
            })
        }
        return res.status(400).json({
            Error: 'Some Data is Undefined'
        })

    },


    GetEventById: async function (req, res) {
        const id = req.param('id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await Event.findOne({
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


    GetEventByIdApp: async function (req, res) {
        const id = req.param('id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await Event.findOne({
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
    PostEventUpdate: async function (req, res) {
        if (_.isUndefined(req.body.id) || req.body.id == "") {
            return res.badRequest('ID is Undefind.')
        }
        try {
            if (!_.isUndefined(req.body.event_name) && !_.isUndefined(req.body.event_start) && !_.isUndefined(req.body.event_end) && !_.isUndefined(req.body.event_date) && !_.isUndefined(req.body.event_detail)  && !_.isUndefined(req.body.event_year) && !_.isUndefined(req.body.event_term) && !_.isUndefined(req.body.event_eva_status) && !_.isUndefined(req.body.status))  {
                await Event.update({
                    id: req.body.id
                }).set({
                    event_name: req.body.event_name,
                    event_start: req.body.event_start,
                    event_end: req.body.event_end,
                    event_date: req.body.event_date,
                    event_detail: req.body.event_detail,
                    event_year: req.body.event_year,
                    event_term: req.body.event_term,
                    event_place: req.body.event_place,
                    eva_id: req.body.eva_id,
                    event_limit: req.body.event_limit,
                    event_eva_status: req.body.event_eva_status,
                    status: req.body.status
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
    PostEventDelete: async function (req, res) {
        const id = req.body.id
        if (_.isUndefined(id || id == "")) {
            return res.badRequest('ID is Undefind.')
        }
        await Event.destroy({
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

