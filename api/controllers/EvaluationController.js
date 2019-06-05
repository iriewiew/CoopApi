/**
 * EvaluationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    GetEvaluationDatatable: async function (req, res) {

        let data = await Evaluation.find().sort([
            { eva_number: 'ASC' },
          ]);
        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
        })

    },

    PostEvaluationCreate: async function (req, res) {
        if (!_.isUndefined(req.body.eva_name) && !_.isUndefined(req.body.eva_number)) {
            await Evaluation.create({

                eva_name: req.body.eva_name,
                eva_number: req.body.eva_number,
                eva_detail: req.body.eva_detail,
                eva_achieve_point: req.body.eva_achieve_point,
                eva_created_name:req.body.eva_created_name

            }).fetch()
            return res.json({
                message: 'Create Complele'
            })
        }
        return res.status(400).json({
            Error: 'Some Data is Undefined'
        })

    },

    GetEvaluationById: async function (req, res) {
        const id = req.param('id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await Evaluation.findOne({
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

    PostEvaluationUpdate: async function (req, res) {
        if (_.isUndefined(req.body.id) || req.body.id == "") {
            return res.badRequest('ID is Undefind.')
        }
        try {
            if (!_.isUndefined(req.body.eva_name)&& !_.isUndefined(req.body.eva_number)) {
                await Evaluation.update({
                    id: req.body.id
                }).set({
                    eva_name: req.body.eva_name,
                    eva_number: req.body.eva_number,
                    eva_detail: req.body.eva_detail,
                    eva_achieve_point: req.body.eva_achieve_point,
                    eva_created_name:req.body.eva_created_name
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


    PostEvaluationDelete: async function (req, res) {
        const id = req.body.id
        if (_.isUndefined(id || id == "")) {
            return res.badRequest('ID is Undefind.')
        }
        await Evaluation.destroy({
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

