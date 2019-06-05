/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GetDashposition : async function (req,res) {
    let data = await Positionemployee.find().populate('position_id').populate('emp_id');
    //console.log(data.data.branch_name);
    const jdata = JSON.parse(JSON.stringify(data));
    emppositionname = [];
    for (let i = 0; i < jdata.length; i++) {
        if(jdata[i].emp_id.status !=0){
            emppositionname.push(jdata[i].position_id.position_name) 
        }
        
    }
    let dataposition = await Position.find();
    const jdataposition = JSON.parse(JSON.stringify(dataposition));
    positionname = [];
    for (let i = 0; i < jdataposition.length; i++) {
        if(jdataposition[i].status != 0){
            positionname.push(jdataposition[i].position_name) 
        }
    }
    total =0;
    positiontotal = [];
    for (i = 0; i < positionname.length; i++) {
        for ( j = 0; j < emppositionname.length; j++) {
           if(positionname[i]==emppositionname[j]) {
            total++
           }
        }
        positiontotal.push(total);
        total = 0;
    }
    var jsonObj = {}
         var array = []
         
         for(i=0; i < positionname.length; i++){
             array.push({label:positionname[i],value:positiontotal[i]})
             jsonObj =  array ;
         } 
         return res.json({data:jsonObj,all_position:positionname.length})
    }

};

