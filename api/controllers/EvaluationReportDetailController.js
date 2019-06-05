/**
 * EvaluationReportDetailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    GetEvaluationReportDetail: async function (req, res) {
        const id = req.param('id')

        let data = await EvaluationReportDetail.find({
            event_id: id
        });

        return res.json({
            data: data,
            message: 'Load By id sucess'
        })
            
    },



    PostEvaMsgCreate: async function (req, res) {
        await EvaluationReportDetail.create({

            eva_msg: req.body.eva_msg,
            event_id: req.body.event_id,
            faculty_id: req.body.faculty_id,
            user_id: req.body.user_id

        }).fetch()
        return res.json({
            message: 'Create Complele'
        })


    },

};

