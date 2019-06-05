/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
//var Emailaddresses = require('machinepack-emailaddresses')

module.exports = {
  // patch /api/users/login
  login: async function (req, res) {
    if (_.isUndefined(req.body.username)) {
      return res.badRequest('An username address is required.')
    }

    if (_.isUndefined(req.body.password)) {
      return res.badRequest('A password is required.')
    }
    var user = await User.findOne({
      username: req.body.username
    })
    if (!user) return res.notFound()

    let checkPass = await bcrypt.compare(req.body.password, user.password)
    if (checkPass) {
      // if no errors were thrown, then grant them a new token
      // set these config vars in config/local.js, or preferably in config/env/production.js as an environment variable
      var token = jwt.sign({
        user: user.id
      }, sails.config.custom.jwtSecret, {
        expiresIn: '1d'
      }) // sails.config.jwtExpires})
      // set a cookie on the client side that they can't modify unless they sign out (just for web apps)
      res.cookie('sailsjwt', token, {
        signed: true,
        // domain: '.yourdomain.com', // always use this in production to whitelist your domain
        maxAge: 86400 //sails.config.jwtExpires
      })
      //sails.log(token)
      // provide the token to the client in case they want to store it locally to use in the header (eg mobile/desktop apps)
      let userjson = JSON.parse(JSON.stringify(user));
      var jsonObj = {
        id : userjson.id,
        username: req.body.username,
        name: userjson.name,
        status: userjson.status,
        token: token
      }
      return res.ok(jsonObj)
    }else{
		return res.status(400).json({message : "Password fails."});
	}

  },

  // patch /api/users/logout
  logout: function (req, res) {
    res.clearCookie('sailsjwt')
    req.user = null
    return res.ok()
  },

  // post /api/users/register
  register: async function (req, res) {
    if (_.isUndefined(req.body.username)) {
      return res.badRequest('An username address is required.')
    }

    if (_.isUndefined(req.body.password)) {
      return res.badRequest('A password is required.')
    }

    if (req.body.password.length < 8) {
      return res.badRequest('Password must be at least 8 characters.')
    }
    //sails.log(req.body)
    var user = await sails.helpers.createUser({
      username: req.body.username,
      password: req.body.password,
      name :req.body.name,
      status : req.body.status
    })
    //sails.log(user)
    // after creating a user record, log them in at the same time by issuing their first jwt token and setting a cookie
    var token = jwt.sign({
      user: user.id
    }, sails.config.custom.jwtSecret, {
      expiresIn: '1d'
    }) //sails.config.jwtExpires})
    res.cookie('sailsjwt', token, {
      signed: true,
      // domain: '.yourdomain.com', // always use this in production to whitelist your domain
      maxAge: 86400 // sails.config.jwtExpires
    })
    //sails.log(token)
    // if this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a 200 response letting the user agent know the signup was successful.
    if (req.wantsJSON) {
      return res.ok(token)

    }

    // otherwise if this is an HTML-wanting browser, redirect to /welcome.
    //return res.redirect('/welcome')

  },
  GetUserById: async function (req, res) {
    const id = req.param('id')
    if(isNaN(id)){
      return res.status(400).json('id is not integer')
    }
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await User.findOne({
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
  UserUpdate: async function (req, res) {
    if (_.isUndefined(req.body.id)||req.body.id == ""){
      return res.badRequest('ID is Undefind.')
    }
    try {
      if(!_.isUndefined(req.body.username)&&!_.isUndefined(req.body.password)){
   await sails.helpers.updateUser({
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
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
  UserNameUpdate: async function (req, res) {
    if (_.isUndefined(req.body.id)||req.body.id == ""){
      return res.badRequest('ID is Undefind.')
    }
    try {
      await User.update({
        id: req.body.id
      }).set({
        name: req.body.name,
        status : req.body.status
      })
      return res.json({
        message: 'Update sucsess'
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
  delete : async function(req,res){
    const id = req.body.id
    if (_.isUndefined(id)||id == ""){
      return res.badRequest('ID is Undefind.')
    }
    await User.destroy({
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
  GetUserDatatable: async function (req, res) {
    
    let data = await User.find({where:{status : "Human resources",}})
    let data2 = await User.find({where:{status:"Admin"}})
    let id = []
    let username = []
    let name = []
    let status = []
    for (let i = 0; i < data.length; i++) {
    id.push(data[i].id);
    username.push(data[i].username);
    name.push(data[i].name);
    status.push(data[i].status);

  } 
  for (let i = 0; i < data2.length; i++) {
    id.push(data2[i].id);
    username.push(data2[i].username);
    name.push(data2[i].name);
    status.push(data2[i].status);
  } 
  var jsonObj = {}
    var array = []
   for(i=0; i < id.length; i++){
                array.push({id:id[i],username:username[i],name:name[i],status:status[i]})
                jsonObj =  array ;    
       }
       if(data.length != 0||data2.length != 0){
        data = jsonObj;
      }
    //console.log(data.data.branch_name);
    return res.json({
      draw: 0,
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data:data
    })
    
  },
}
