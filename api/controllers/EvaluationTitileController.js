/**
 * EvaluationTitileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    PostEvaTitileCreate: async function (req, res) {
            await EvaluationTitile.create({

                eva_titile_name: req.body.eva_titile_name,
                eva_id: req.body.eva_id,
                eva_titile_achieve_point: req.body.eva_titile_achieve_point,
            }).fetch()
            return res.json({
                message: 'Create Complele'
            })
    },


    PostEvaTitileUpdate: async function (req, res) {
        if (_.isUndefined(req.body.id) || req.body.id == "") {
            return res.badRequest('ID is Undefind.')
        }
        try {
            if (!_.isUndefined(req.body.eva_titile_name) && !_.isUndefined(req.body.eva_titile_achieve_point) )  {
                await EvaluationTitile.update({
                    id: req.body.id
                }).set({
                    eva_titile_name: req.body.eva_titile_name,
                    // eva_id: req.body.eva_id,
                    eva_titile_achieve_point: req.body.eva_titile_achieve_point,
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

    GetEvaluationTitileById: async function (req, res) {
        const id = req.param('id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await EvaluationTitile.find({
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
    PostEvaluationTitileDelete: async function (req, res) {
        const id = req.body.id
        if (_.isUndefined(id || id == "")) {
            return res.badRequest('ID is Undefind.')
        }
        await EvaluationTitile.destroy({
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

