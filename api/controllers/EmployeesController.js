/**
 * EmployeesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  GetemployeeDatatable: async function (req, res) {
    let data = await Employees.find().where({
      status: 1
    }).populate('emp_branch_id');
    // const branch = JSON.parse(JSON.stringify(branch_addit_branch_id[0]));
    //             const branch_name = branch.branch_addit_branch_id.branch_name;
    //             const branch_id = branch.branch_addit_branch_id.id;

    return res.json({
      draw: 0,
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data: data,

    })
  },
  PostemployeeCreate: async function (req, res) {
    var newname = Date.now();
    var filename = Date.now() + ".jpg";
    req.file('filetoupload').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
      saveAs: newname + '.jpg',
      maxBytes: 1000000
    }, function (err, uploadedFiles) {});
    if(!_.isUndefined(req.body.emp_name)&&!_.isUndefined(req.body.emp_nickname)&&!_.isUndefined(req.body.emp_salary)&&!_.isUndefined(req.body.emp_address)&&!_.isUndefined(req.body.emp_tel)&&!_.isUndefined(req.body.emp_emer_con_name)&&!_.isUndefined(req.body.emp_emer_con_relation)&&!_.isUndefined(req.body.emp_emer_con_address)&&!_.isUndefined(req.body.emp_emer_con_tel)&&!_.isUndefined(req.body.emp_branch_id)){
      var data = await Employees.create({
        emp_name: req.body.emp_name,
        emp_nickname:req.body.emp_nickname,
        emp_salary: req.body.emp_salary,
        emp_address: req.body.emp_address,
        emp_tel: req.body.emp_tel,
        emp_emer_con_name: req.body.emp_emer_con_name,
        emp_emer_con_relation: req.body.emp_emer_con_relation,
        emp_emer_con_address: req.body.emp_emer_con_address,
        emp_emer_con_tel: req.body.emp_emer_con_tel,
        emp_branch_id: req.body.emp_branch_id,
        status : 1,
        emp_id_card: filename
      }).fetch()
      return res.json({
        message: 'Create Complele',
        data: data
      })
    }
    return res.status(400).json({
        Error: 'Some Data is Undefined'
      })
    
  },
  PostemployeeUpdate: async function (req, res) {
    if (_.isUndefined(req.body.id)||req.body.id == ""){
      return res.badRequest('ID is Undefind.')
    }
    if(!_.isUndefined(req.body.emp_name)&&!_.isUndefined(req.body.emp_nickname)&&!_.isUndefined(req.body.emp_salary)&&!_.isUndefined(req.body.emp_address)&&!_.isUndefined(req.body.emp_tel)&&!_.isUndefined(req.body.emp_emer_con_name)&&!_.isUndefined(req.body.emp_emer_con_relation)&&!_.isUndefined(req.body.emp_emer_con_address)&&!_.isUndefined(req.body.emp_emer_con_tel)&&!_.isUndefined(req.body.emp_branch_id)){
    var data = await Employees.update({
      id: req.body.id
    }).set({
      emp_name: req.body.emp_name,
      emp_nickname:req.body.emp_nickname,
      emp_salary: req.body.emp_salary,
      emp_address: req.body.emp_address,
      emp_tel: req.body.emp_tel,
      emp_emer_con_name: req.body.emp_emer_con_name,
      emp_emer_con_relation: req.body.emp_emer_con_relation,
      emp_emer_con_address: req.body.emp_emer_con_address,
      emp_emer_con_tel: req.body.emp_emer_con_tel,
      emp_branch_id: req.body.emp_branch_id,
     
      //emp_id_card: filename
    })
    const id = req.body.id;
    let oldpath = await Employees.find({
      where: {
        id: id
      }
    })
    const oldfilename = JSON.parse(JSON.stringify(oldpath[0]));
    const filename = oldfilename.emp_id_card;
    //sails.log(filename);
    req.file('filetoupload').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
      saveAs: filename,
      maxBytes: 1000000
    }, function (err, uploadedFiles) {
      if (err) throw err;
    });
    return res.json({
      message: 'update Complele',
      data: data
    })
  }
  return res.status(400).json({
      Error: 'Some Data is Undefined'
    })
  },
  PostemployeeDelete: async function (req, res) {
    const id = req.body.id
    if(isNaN(req.body.id)){
      return res.status(400).json('id is String or id Undefined')
    }
    if(req.body.id==""){
      return res.status(400).json('id is Undefined')
    } 
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Employees.findOne({
        id: id
      })
      if (data) {
        await Employees.update({
          id: req.body.id
        }).set({
          status: 0
        })
        return res.json({
          message: 'Delete sucsess'
        })
      }
    }
    return res.sendStatus(404);
  },
  GetemployeeById: async function (req, res) {
    const id = req.param('id')
    if(isNaN(id)){
      return res.status(400).json('id is not integer')
    }
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Employees.findOne({
        id: id
      }).populate('emp_branch_id');
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
// function parseDMY(s) {
//   var b = s.split(/\D/);
//   var d = new Date(b[2], --b[1], b[0]);
//   return d && d.getMonth() == b[1]? d : new Date(NaN);
// }