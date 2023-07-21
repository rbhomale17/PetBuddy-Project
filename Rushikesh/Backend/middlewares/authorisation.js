


let authorise=(permittedRole)=>{
    return(req,res,next)=>{
       if(permittedRole.incules(req.role)){
        next()
       }
       else{
        res.status.send({"message":"you are not authorised to access"})
       }
    }
}

module.exports={authorise}