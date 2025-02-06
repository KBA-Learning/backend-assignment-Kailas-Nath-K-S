import { Router } from "express"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const userAuth= Router();
const user=new Map();
userAuth.post('/signup',async (req,res)=>{

    try {
        
const {Name,Password,Email,Place,DOB}=req.body;

if(user.get(Email)){
    res.status(400).send("UserName already exists")

}
else{
    const encPassword=await bcrypt.hash(Password,10)
    user.set(Email,{Name,DOB,Password:encPassword,UserRole:"User"})
    console.log(user)
    res.status(201).send("Signed-up successfully")

}


    } catch (error) {
        res.status(500).send("Internal Server error");
    }
})
userAuth.post('/login',async(req,res)=>{
try {
    const {Email,Password}=req.body

    const result=user.get(Email);

    if(!result){
        res.status(400).send('UserName is incorrect')
    }else {

        const valid=await bcrypt.compare(Password,result.Password)
        if(valid){
                      const token = jwt.sign({Email:Email,UserRole:result.UserRole},process.env.SECRET_KEY,{expiresIn:'1h'});
                      console.log(token);
                      res.cookie('authToken',token,{
                          httpOnly:true
                      })

       if(Email==='kailasnks@gmail.com'){
            result.UserRole="admin";
            const token = jwt.sign({Email:Email,UserRole:result.UserRole},process.env.SECRET_KEY,{expiresIn:'1h'});
            console.log(token);
            res.cookie('authToken',token,{
                httpOnly:true
            })
            res.status(200).json({message:"Logged in as admin successfully"});
        }else{

            res.status(200).json({message:"Logged in successfully"});
        }
                  }
                  else{
        
                      res.status(401).send("Unauthorized access");
        
                  }
 




    }



} catch (error) {
    
}
})
userAuth.get('/logout',(req,res)=>{
    res.clearCookie('authToken');
    res.status(200).json({msg:"Successfully logged out"})
})

export {userAuth}