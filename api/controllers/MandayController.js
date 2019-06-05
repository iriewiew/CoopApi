/**
 * MandayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GetMandayGetByid : async function (req,res) {
        const id = req.param('id')
        let projectname = await Projectmanage.findOne({id:id});
        const pjdata = JSON.parse(JSON.stringify(projectname));
        let data = await Team.find({where:{project_id:id}}).populate('emp_id').populate('position_id');
        const jdata = JSON.parse(JSON.stringify(data));
        let emp_id = [];
        let emp_name = [];
        let emp_nickname = [];
        let emp_workday = []
        let mandayArray = [];
        let position = [];
        let emp_sprint = [];

         for (let i = 0; i < data.length; i++){
            emp_id.push(jdata[i].emp_id.id)
            emp_name.push(jdata[i].emp_id.emp_name)
            emp_nickname.push(jdata[i].emp_id.emp_nickname)
            emp_workday.push(jdata[i].emp_workday)
            emp_sprint.push(jdata[i].emp_sprint)
            position.push(jdata[i].position_id.position_name)
        }
        let total_benefit = 0;
       // sails.log(emp_id.length)
        for (let j = 0; j < emp_id.length; j++) {
            empid = emp_id[j]
            databnf = await Benefit.find({where:{benefit_emp_id:empid}}).populate('benefit_emp_id');
            jdatabnf = JSON.parse(JSON.stringify(databnf));
            for (let k = 0; k < databnf.length; k++) {
                   total_benefit += jdatabnf[k].benefit_price
                }
                 manM =  total_benefit + jdata[j].emp_id.emp_salary;
                manday = manM / 20
                mandayArray.push(manday)
        }
        //sails.log(emp_workday)
        //sails.log(mandayArray)
        let mandayproject = [];
        let total = 0;
        for (let x = 0; x < emp_workday.length; x++) {
            mandayproject[x] = emp_workday[x]*mandayArray[x];
        }
        for (let d = 0; d < emp_workday.length; d++) {
            total += mandayproject[d];
        }
        //sails.log(total)
        let addit = await Projectaddit.find({where:{project_id:id}});
        const jaddit = JSON.parse(JSON.stringify(addit));
        let costprojectaddit = 0
        for (let i = 0; i < addit.length; i++) {
          costprojectaddit += jaddit[i].project_addit_price
        }
        var jsonObj = {}
        var array = []
        
        for(i=0; i < emp_id.length; i++){
            array.push({emp_id:emp_id[i],emp_name:emp_name[i],emp_nickname:emp_nickname[i],position_name:position[i],workday:emp_workday[i],emp_sprint:emp_sprint[i],manday:mandayArray[i],Selling:((mandayArray[i]*pjdata.selling))/100+mandayArray[i]})
            jsonObj =  array ;
        } 
       
        let projecttotal = total+costprojectaddit
        //sails.log(mandayArray)
        await Projectmanage.update({
            id: id
          }).set({
            project_total_cost: projecttotal,
            project_total_selling: (projecttotal*pjdata.selling/100)+projecttotal
        })

            if(jdata.length != 0){
                data = jsonObj;
              }
        return res.json({data:data,
        project_cost_total:projecttotal,project_cost_selling:(projecttotal*pjdata.selling/100)+projecttotal,project_name:pjdata.project_name,project_costomer_name : pjdata.project_costomer_name})



        // let data = await Benefit.find({where:{benefit_emp_id:id}}).populate('benefit_emp_id');
        // let total_benefit = 0;
        // for (let i = 0; i < data.length; i++) {
        //    total_benefit += jdata[i].benefit_price
        // }

        // let manM =  total_benefit + jdata[0].benefit_emp_id.emp_salary;
        // let manday = manM / 20
        // sails.log(data.emp.id)
    },
    GetMandayDatatable : async function (req,res) {
        let data = await Employees.find().where({
            status: 1
          });
        const jdata = JSON.parse(JSON.stringify(data));
        let emp_id = [];
        let emp_name = [];
        let emp_nickname = [];
        let mandayArray = [];
        for (let i = 0; i < data.length; i++){
            emp_id.push(jdata[i].id)
            emp_name.push(jdata[i].emp_name)
            emp_nickname.push(jdata[i].emp_nickname)
        }
        let total_benefit = 0;
        // sails.log(emp_id.length)
         for (let j = 0; j < emp_id.length; j++) {
             empid = emp_id[j]
             databnf = await Benefit.find({where:{benefit_emp_id:empid}}).populate('benefit_emp_id');
             jdatabnf = JSON.parse(JSON.stringify(databnf));
             for (let k = 0; k < databnf.length; k++) {
                    total_benefit += jdatabnf[k].benefit_price
                 }
                  manM =  total_benefit + jdata[j].emp_salary;
                total_benefit = 0;
                 manday = manM / 20
                 mandayArray.push(manday)
         }
         var jsonObj = {}
         var array = []
         
         for(i=0; i < emp_id.length; i++){
             array.push({emp_id:emp_id[i],emp_name:emp_name[i],emp_nickname:emp_nickname[i],manday:mandayArray[i]})
             jsonObj =  array ;
         } 
         if(jdata.length != 0){
            data = jsonObj;
          }
         return res.json({data})
    
    },

};

