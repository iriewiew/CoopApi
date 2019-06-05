/**
 * EvaluationReportController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  GetEvaReportData: async function (req, res) {
    const id = req.param('id')
    if (isNaN(id)) {
        return res.status(400).json('id is not integer')
    }
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
        let data = await EvaluationReport.find({
            where: {
                event_id: id
            }
        }).populate('eva_list_id')
        if (data) {
            return res.json({
                data: data,
                message: 'Load By id sucess'
            })
        }
        return res.status(404).json('id is notfond');
    }
},

  Array: async function (req, res) {
    let A = req.body.pusharray
    const user_id = req.param('user_id')
    const event_id = req.param('event_id')
    for (let i = 0; i < A.length; i++) {
      await EvaluationReport.create({
        eva_point: A[i].eva_points,
        user_id: user_id,
        event_id: event_id,
        eva_id: A[i].eva_id,
        eva_titile_name_id: A[i].eva_titile_name_id,
        eva_list_id: A[i].id,

      }).fetch()
    }
    return res.json({
      message: 'Create sucsess'
    })

  }

};

