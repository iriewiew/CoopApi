/**
 * FreetimeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment')
moment.locale('th');
module.exports = {
  Postfreetime: async function (req, res) {
    position_id = req.param('position_id');
    project_id = req.param('id');
    let data = await Team.find({where:{id : 0}})
    let emp_start = req.body.emp_start_date
    let emp_end = req.body.emp_end_date
    let projectdata = await Projectmanage.findOne({
        id: project_id
      })
    // sails.log(emp_start)
    // sails.log(emp_end)
     let positiondata = await Positionemployee.find({
      where: {
        position_id: position_id
      }
    }).populate('position_id').populate('emp_id');
    let teamdata = await Team.find().populate('emp_id').populate('position_id').populate('project_id');
    let teampjdata = JSON.parse(JSON.stringify(teamdata));
    let positionpjdata = JSON.parse(JSON.stringify(positiondata));
    let projectpjdata = JSON.parse(JSON.stringify(projectdata));
    // sails.log(projectpjdata.project_end_date)
    // sails.log(projectpjdata.project_start_date)
    if(emp_start > emp_end){
      res.status(403).json({message:"start after end"});
    }
    if( projectpjdata.project_start_date > emp_start || projectpjdata.project_end_date < emp_end){
        res.status(402).json({message:"อยู่นอกเวลาโปรเจ็ค"});
    }
    let emp_id_t = [];
    let emp_name_t = [];
    let emp_nickname_t = [];
    let emp_position_id_t = [];
    let emp_position_id = [];
    let emp_end_date = [];
    let emp_end_date_t = [];
    let emp_id = [];
    let emp_name = [];
    let emp_nickname = [];
    let emp_start_date = [];
    let freetime = [];
    let emp_start_date_t = [];
    // let project_start_date = projectpjdata.project_start_date;
    // let project_end_date = projectpjdata.project_end_date;
    for (let i = 0; i < teampjdata.length; i++) {
      if(teampjdata[i].emp_id.status != 0 && teampjdata[i].project_id.status != 0){
        emp_id_t.push(teampjdata[i].emp_id.id);
        emp_name_t.push(teampjdata[i].emp_id.emp_name);
        emp_nickname_t.push(teampjdata[i].emp_id.emp_nickname);
        emp_end_date_t.push(teampjdata[i].emp_end_date);
        emp_position_id_t.push(teampjdata[i].position_id.id);
        emp_start_date_t.push(teampjdata[i].emp_end_date);
      }  
    }
      for (let i = 0; i < positionpjdata.length; i++) {
        if(positionpjdata[i].emp_id.status != 0){
        emp_id.push(positionpjdata[i].emp_id.id);
        emp_name.push(positionpjdata[i].emp_id.emp_name);
        emp_nickname.push(positionpjdata[i].emp_id.emp_nickname);
        emp_position_id.push(positionpjdata[i].position_id.id);
        emp_end_date.push(1009843200000);
        emp_start_date.push(1009843200000);
        } 
      }

      // for (i = 0; i < teampjdata.length; i++) {
      //   for ( j = 0; j < positionpjdata.length; j++) {
      //      if(emp_id_t[j]==emp_id[i]) {
      //       emp_end_date[i] = emp_end_date_t[j]
      //       emp_start_date[i] = emp_start_date_t[j]
      //      }
      //   }
      // }
    emp_id = emp_id.concat(emp_id_t);
    emp_name = emp_name.concat(emp_name_t);
    emp_nickname = emp_nickname.concat(emp_nickname_t);
    emp_position_id = emp_position_id.concat(emp_position_id_t);
    emp_end_date = emp_end_date.concat(emp_end_date_t);
    emp_start_date = emp_start_date.concat(emp_start_date_t);
    // sails.log(emp_id)
    // sails.log(emp_name)
    // sails.log(emp_nickname)
    // sails.log(emp_position_id)
    // sails.log(emp_end_date)
    // sails.log(emp_start_date)
    
    for(let j=0 ; j < emp_id.length;j++){
      let empenddate = emp_end_date[j];
      let empstartdate = emp_start_date[j];     
          if (empstartdate >= emp_end && empenddate <= emp_end) {
                free = "ไม่ว่าง"
            }else{
                  if(empstartdate >= emp_start){
                    free = "ไม่ว่าง"
                  }else{
                    free = "ว่าง"
                  }
                }
                 freetime[j] = free;
    }
    for (let y = 0; y < freetime.length; y++) {
                 for (let z = 0; z < freetime.length; z++) {
                     if(emp_name[y]==emp_name[z]){
                         if(freetime[y]=="ไม่ว่าง"||freetime[z]=="ไม่ว่าง"){
                            freetime[y] = "ไม่ว่าง";
                            freetime[z] = "ไม่ว่าง";
                         }
  
                     }
                  }
    }
            var jsonObj = {}
            var array = []
           for(i=0; i < emp_position_id.length; i++){
                    if(emp_position_id[i] == position_id ){
                        //sails.log(emp_position_id[i])
                             array.push({emp_id:emp_id[i],emp_name:emp_name[i],emp_nickname:emp_nickname[i],freetime:freetime[i],position_id:emp_position_id[i]})
                        jsonObj =  array ;
                    } 
            }
                   emp_id2 = []
                emp_name2 = []
                emp_nickname2 = []
                freetime3 = []

                for(let i=0; i<jsonObj.length; i++) {
                   emp_id2.push(jsonObj[i].emp_id)
                   emp_name2.push(jsonObj[i].emp_name)
                   emp_nickname2.push(jsonObj[i].emp_nickname)
                   freetime3.push(jsonObj[i].freetime)
                }
             let push2 = [];
            for (let q = 0; q < freetime3.length; q++) {
                push2[q] =  emp_id2[q]+"-"+emp_name2[q]+"-"+emp_nickname2[q]+"-"+freetime3[q];
            } 
            push2 = Array.from(new Set(push2)) 
            emp_id3 = []
                emp_name3 = []
                emp_nickname3 = []
                freetime4 = []
            for (let w = 0; w < push2.length; w++) {
                            push2[w] = push2[w].split("-");
                            emp_id3[w] = Number(push2[w][0]);
                            emp_name3[w] = push2[w][1];
                            emp_nickname3[w] = push2[w][2];
                            freetime4[w] = push2[w][3];
                        }
            var jsonObj2 = {}
            var array2 = []
           for(i=0; i < freetime4.length; i++){
                        //sails.log(emp_position_id[i])
                        array2.push({emp_id:emp_id3[i],emp_name:emp_name3[i],emp_nickname:emp_nickname3[i],freetime:freetime4[i],emp_start_date:emp_start,emp_end_date:emp_end})
                             jsonObj2 =  array2 ;
                    
                }

              if(positiondata.length != 0){
              data = jsonObj2;
            }
            return res.json({data: data}) 
  },
  Getfreetime : async function(req,res){
    let emp_start_date = Date.now()
    let emp_end_date = Date.now()
    // sails.log(emp_start_date)
    // sails.log(emp_end_date)
    return res.json({data:[{emp_start_date:emp_start_date,emp_end_date:emp_end_date,emp_start_date_format:moment(emp_start_date).format('DD MMMM YYYY'),emp_end_date_format:moment(emp_end_date).format('DD MMMM YYYY')}]})
  }
  //moment(jdata[i].project_start_date).format('DD MMMM YYYY')

};

function parseDMY(s) {
  var b = s.split(/\D/);
  var d = new Date(b[2], --b[1], b[0]);
  return d && d.getMonth() == b[1] ? d : new Date(NaN);
}
    // let data = await Costdata.find()
    // let positiondata = await Positionemployee.find({
    //   where: {
    //     position_id: position_id
    //   }
    // }).populate('position_id').populate('emp_id');
    // let teamdata = await Team.find().populate('emp_id').populate('position_id').populate('project_id');
    // let projectdata = await Projectmanage.findOne({
    //   id: project_id
    // })
    // let teampjdata = JSON.parse(JSON.stringify(teamdata));
    // let positionpjdata = JSON.parse(JSON.stringify(positiondata));
    // let projectpjdata = JSON.parse(JSON.stringify(projectdata));
    // //sails.log(positiondata);
    // let emp_id_t = [];
    // let emp_name_t = [];
    // let emp_nickname_t = [];
    // let emp_position_id_t = [];
    // let emp_position_id = [];
    // let emp_end_date = [];
    // let emp_end_date_t = [];
    // let emp_id = [];
    // let emp_name = [];
    // let emp_nickname = [];
    // let emp_start_date = [];
    // let emp_start_date_t = [];
    // let project_start_date = projectpjdata.project_start_date;
    // let project_end_date = projectpjdata.project_end_date;
    // for (let i = 0; i < teampjdata.length; i++) {
    //   if(teampjdata[i].emp_id.status != 0 && teampjdata[i].project_id.status != 0){
    //     emp_id_t.push(teampjdata[i].emp_id.id);
    //     emp_name_t.push(teampjdata[i].emp_id.emp_name);
    //     emp_nickname_t.push(teampjdata[i].emp_id.emp_nickname);
    //     emp_end_date_t.push(teampjdata[i].emp_end_date);
    //     emp_position_id_t.push(teampjdata[i].position_id.id);
    //     emp_start_date_t.push(teampjdata[i].emp_end_date);
    //   }  
    // }
    // for (let i = 0; i < positionpjdata.length; i++) {
    //   if(positionpjdata[i].emp_id.status != 0){
    //     emp_id.push(positionpjdata[i].emp_id.id);
    //     emp_name.push(positionpjdata[i].emp_id.emp_name);
    //     emp_nickname.push(positionpjdata[i].emp_id.emp_nickname);
    //     emp_position_id.push(positionpjdata[i].position_id.id);
    //     emp_end_date.push(1009843200000);
    //     emp_start_date.push(1009843200000);
    //   } 
      
    // }
    // emp_id = emp_id.concat(emp_id_t);
    // emp_name = emp_name.concat(emp_name_t);
    // emp_nickname = emp_nickname.concat(emp_nickname_t);
    // emp_position_id = emp_position_id.concat(emp_position_id_t);
    // emp_end_date = emp_end_date.concat(emp_end_date_t);
    // emp_start_date = emp_start_date.concat(emp_start_date_t);
    //       let freetime2 = [];
    //         for(let j=0 ; j < emp_id.length;j++){
    //             let empenddate = emp_end_date[j];
    //             let empstartdate = emp_start_date[j];
    //             let projectstartdate = project_start_date;
    //             let projectenddate = project_end_date;
                
    //             if (empenddate >= projectstartdate && empenddate <= projectenddate) {
    //                     free = "ไม่ว่าง"
    //             }else{
    //               if(empstartdate >= projectstartdate){
    //                 free = "ไม่ว่าง"
    //               }else{
    //               free = "ว่าง"
    //               }
    //             }
               
    //             freetime2.push(free);
    //         }
    //         //sails.log(freetime2)
    //         for (let y = 0; y < freetime2.length; y++) {
    //            for (let z = 0; z < freetime2.length; z++) {
    //                if(emp_name[y]==emp_name[z]){
    //                    if(freetime2[y]=="ไม่ว่าง"||freetime2[z]=="ไม่ว่าง"){
    //                     freetime2[y] = "ไม่ว่าง";
    //                     freetime2[z] = "ไม่ว่าง";
    //                    }

    //                }
    //            }  
    //         }
    //        var jsonObj = {}
    //         var array = []
    //        for(i=0; i < emp_position_id.length; i++){
    //                 if(emp_position_id[i] == position_id ){
    //                     //sails.log(emp_position_id[i])
    //                          array.push({emp_id:emp_id[i],emp_name:emp_name[i],emp_nickname:emp_nickname[i],freetime:freetime2[i],position_id:emp_position_id[i]})
    //                     jsonObj =  array ;
                   
                   
    //            }
                    
    //         } 
                

    //             emp_id2 = []
    //             emp_name2 = []
    //             emp_nickname2 = []
    //             freetime3 = []

    //             for(let i=0; i<jsonObj.length; i++) {
    //                emp_id2.push(jsonObj[i].emp_id)
    //                emp_name2.push(jsonObj[i].emp_name)
    //                emp_nickname2.push(jsonObj[i].emp_nickname)
    //                freetime3.push(jsonObj[i].freetime)
    //             }
    //          let push2 = [];
    //         for (let q = 0; q < freetime3.length; q++) {
    //             push2[q] =  emp_id2[q]+"-"+emp_name2[q]+"-"+emp_nickname2[q]+"-"+freetime3[q];
    //         } 
    //         push2 = Array.from(new Set(push2)) 
    //         emp_id3 = []
    //             emp_name3 = []
    //             emp_nickname3 = []
    //             freetime4 = []
    //         for (let w = 0; w < push2.length; w++) {
    //                         push2[w] = push2[w].split("-");
    //                         emp_id3[w] = Number(push2[w][0]);
    //                         emp_name3[w] = push2[w][1];
    //                         emp_nickname3[w] = push2[w][2];
    //                         freetime4[w] = push2[w][3];
    //                     }
    //         var jsonObj2 = {}
    //         var array2 = []
    //        for(i=0; i < freetime4.length; i++){
    //                     //sails.log(emp_position_id[i])
    //                     array2.push({emp_id:emp_id3[i],emp_name:emp_name3[i],emp_nickname:emp_nickname3[i],freetime:freetime4[i]})
    //                          jsonObj2 =  array2 ;
                    
    //             }

    //           if(positiondata.length != 0){
    //           data = jsonObj2;
    //         }
    //         return res.json({data: data})