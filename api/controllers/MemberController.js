/**
 * MemberController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {



    GetMemberStudentDatatable: async function (req, res) {

        let data = await Member.find().where({ 'role_name': { startsWith: 'student' } }).populate('faculty_name').populate('major_name');
        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
        })

    },

    GetMemberTeacherDatatable: async function (req, res) {

        let data = await Member.find().where({ 'role_name': { startsWith: 'teacher' } }).populate('faculty_name');
        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
        })

    },


    PostMemberCreate: async function (req, res) {
        if (!_.isUndefined(req.body.user_id) && !_.isUndefined(req.body.prefix_name) && !_.isUndefined(req.body.first_name) && !_.isUndefined(req.body.last_name) && !_.isUndefined(req.body.role_name) && !_.isUndefined(req.body.email) && !_.isUndefined(req.body.major_name) && !_.isUndefined(req.body.faculty_name)) {
            await Member.create({

                user_id: req.body.user_id,
                user_pass: 11111111,
                prefix_name: req.body.prefix_name,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                role_name: req.body.role_name,
                email: req.body.email,
                major_name: req.body.major_name,
                faculty_name: req.body.faculty_name,
                config: "null"
            }).fetch()
            return res.json({
                message: 'Create Complele'
            })
        }
        return res.badRequest({
            Error: 'Some Data is Undefined'
        })

    },


    GetMemberById: async function (req, res) {
        const id = req.param('id')
        if (isNaN(id)) {
            return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
            let data = await Member.findOne({
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


    PostMemberUpdate: async function (req, res) {
        if (_.isUndefined(req.body.id) || req.body.id == "") {
            return res.badRequest('ID is Undefind.')
        }
        try {
            if (!_.isUndefined(req.body.user_id) && !_.isUndefined(req.body.prefix_name) && !_.isUndefined(req.body.first_name) && !_.isUndefined(req.body.last_name) && !_.isUndefined(req.body.role_name) && !_.isUndefined(req.body.major_name) && !_.isUndefined(req.body.faculty_name) && !_.isUndefined(req.body.email)) {
                await Member.update({
                    id: req.body.id
                }).set({
                    user_id: req.body.user_id,
                    prefix_name: req.body.prefix_name,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    role_name: req.body.role_name,
                    major_name: req.body.major_name,
                    faculty_name: req.body.faculty_name,
                    email: req.body.email,

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


    PostMemberDelete: async function (req, res) {
        const id = req.body.id
        if (_.isUndefined(id || id == "")) {
            return res.badRequest('ID is Undefind.')
        }
        await Member.destroy({
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


    Applogin: async function (req, res) {
        if (isNaN(req.body.user_id)) {
            return res.status(400).json('user_id is not integer')
        }
        const data = await Member.findOne({
            user_id: req.body.user_id,
            user_pass: req.body.user_pass
        });
        if (data) {
            return res.json({
                data: data,
                message: 'Load By id sucess'
            })
        }
        return res.status(404).json('Invalid username/password');


    }
};
