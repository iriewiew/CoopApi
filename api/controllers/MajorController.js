/**
 * MajorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    PostMajorCreate: async function (req, res) {
        if (!_.isUndefined(req.body.major_name) && !_.isUndefined(req.body.faculty_id)) {
            await Major.create({

                major_name: req.body.major_name,
                faculty_id: req.body.faculty_id
            }).fetch()
            return res.json({
                message: 'Create Complele'
            })
        }
        return res.status(400).json({
            Error: 'Some Data is Undefined'
        })

    },
    GetMajorDatatable: async function (req, res) {

        let data = await Major.find().populate('faculty_id')
        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
        })

    },

    GetMajorFacultyGetByid: async function (req, res) {
        let id = req.param('id')
        let data = await Major.find({ where: { faculty_id: id } })
        //console.log(data.data.student_name);
        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
        })

    },

    GetMajorById: async function (req, res) {
        const id = req.param('id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await Major.findOne({
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


    PostMajorUpdate: async function (req, res) {
        if (_.isUndefined(req.body.id)||req.body.id == ""){
          return res.badRequest('ID is Undefind.')
        }
        try {
            if(!_.isUndefined(req.body.major_name)){
              await Major.update({
                id: req.body.id
              }).set({
                major_name: req.body.major_name
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


    PostMajorDelete: async function (req, res) {
        const id = req.body.id
        if (_.isUndefined(id || id == "")) {
            return res.badRequest('ID is Undefind.')
        }
        await Major.destroy({
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
}
