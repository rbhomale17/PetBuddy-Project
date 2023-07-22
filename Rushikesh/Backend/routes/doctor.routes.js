let express=require("express")

let doctorroute=express.Router()
let { UserModel }=require ("../models/user.model")
let {appointmentModel}=require("../models/appointmentModel")




doctorroute.get("/",async(req,res)=>{
    
    try {
        let doctorlist=await UserModel.find()
        res.status(200).send({"msg":"successfully fetched",
           "data":doctorlist
          })  
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})

doctorroute.get("/findDoctor",async(req,res)=>{
    let {search}=req.query
    try {
        let data=await UserModel.find({$or:[{name:{$regex:search,$options:"i"}},
     {language:{$regex:search,$options:"i"}},{
        specialization:{$regex:search,$options:"i"}
     }]})
     res.status(200).send({"msg":"successfully fetched",
     "data":data
    })  
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


doctorroute.post("/addappointment",async(req,res)=>{
    try {
        let { meeting_time,doctor_id}=req.body
        let data=new appointmentModel({
            meeting_time,doctor_id
        })
         await data.save()

        res.status(200).send({"msg":"successfully added",
         "data":data
         })  

        
    } catch (error) {
        res.status(400).send({"msg":error.message})
        console.log(error)
    }
})

doctorroute.get("/appointments",async(req,res)=>{
    try {
        let data=await appointmentModel.find()
        res.status(200).send({"msg":"successfully fetched",
        "data":data
       })  
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
        console.log(error)
    }
})


module.exports={doctorroute}




