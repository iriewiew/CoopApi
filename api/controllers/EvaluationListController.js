/**
 * EvaluationListController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    GetEvaluationListDatatable: async function (req, res) {

        let data = await EvaluationList.find();
        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
        })

    },

    PostEvaluationListCreate: async function (req, res) {
        await EvaluationList.create({

            eva_list_name: req.body.eva_list_name,
            eva_id: req.body.eva_id,
            eva_point: req.body.eva_point,
            eva_titile_name_id: req.body.eva_titile_name_id,


        }).fetch()
        return res.json({
            message: 'Create Complele'
        })

    },

    GetEvaluationListGetByid: async function (req, res) {
        let id = req.param('id')
        let data = await EvaluationList.find({ where: { eva_id: id } }).populate('eva_titile_name_id').populate('eva_id');
        //console.log(data.data.student_name);
        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
        })

    },

    GetEvaListAndTitileByid: async function (req, res) {
        const id = req.param('id')
        const titile_id = req.param('titile_id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await EvaluationList.find({
                eva_id: id,
                eva_titile_name_id: titile_id
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


    GetListById: async function (req, res) {
        const id = req.param('id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await EvaluationList.findOne({
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

    PostEvaluationListUpdate: async function (req, res) {
        if (_.isUndefined(req.body.id) || req.body.id == "") {
            return res.badRequest('ID is Undefind.')
        }
        try {
            if (!_.isUndefined(req.body.eva_list_name)) {
                await EvaluationList.update({
                    id: req.body.id
                }).set({
                    eva_list_name: req.body.eva_list_name,
                    // eva_id: req.body.eva_id,
                    eva_point: req.body.eva_point,
                    // eva_titile_name_id: req.body.eva_titile_name_id,
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

    PostEvaluationListDelete: async function (req, res) {
        const id = req.body.id
        if (_.isUndefined(id || id == "")) {
            return res.badRequest('ID is Undefind.')
        }
        await EvaluationList.destroy({
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
    PostEvaluationTitileListDelete: async function (req, res) {
        const id = req.body.id
        if (_.isUndefined(id || id == "")) {
            return res.badRequest('ID is Undefind.')
        }
        await EvaluationList.destroy({
            eva_titile_name_id: id
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

    GetEvaAppListDatatable: async function (req, res) {
        const id = req.param('id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await EvaluationList.find({
                eva_id: id
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
};

