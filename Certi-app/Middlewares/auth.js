import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()
const authenticate=(req,res,next)=>{

   
 const cookie=req.headers.cookie;
console.log(cookie);

 if(!cookie){
   console.log('pls login')
   res.status(401).send("Please Login")

 }
 else {
 const [name,token]=cookie.trim().split("=");
 console.log(name);
 console.log(token);
 if (name=='authToken'){
  const verify=  jwt.verify(token,process.env.SECRET_KEY)
  console.log(verify);
  req.UserName=verify.Email;
  req.UserRole=verify.UserRole;
  next()
 }
 else{
    res.status(401).send("Unauthorized Access")
 }
 }
 
 
}
export {authenticate}