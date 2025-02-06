

const adminCheck=(req,res,next)=>{
if(req.UserRole=="admin"){
    next();
}else{
    res.status(500).send("Unauthorized Access") ;
}
}


export {adminCheck}