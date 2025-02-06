


import { Router } from "express";
import { authenticate } from "../Middlewares/auth.js";
import { adminCheck } from "../Middlewares/adminCheck.js";


const adminAuth=Router();

const course=new Map();


adminAuth.post('/IssueCertificate',authenticate,adminCheck,(req,res)=>{
    try{
    
        
        console.log(req.UserRole);

        
        
    
            const {CourseName,CertificateID, Name,Grade,Date}=req.body
            if(course.get(CourseName)){
                res.status(400).send("Certificate already issued") ;
             }
            else{
                course.set(CourseName,{CertificateID,Name,Grade,Date});
                console.log(course.get(CourseName))
                res.status(201).send("Added Certificate ")
            
            }
            
            
        
    }
    catch{
        res.status(500).send("Internal Server Error") ;
      
    }
})
adminAuth.get("/viewCertificate",(req,res)=>{
    
    try {
        const name=req.query.CourseName;
        const result=course.get(name)
        if (result) {
            res.status(200).send(result) ;
  
        } else {
            res.status(500).send("Certificate Not Found") ;

        }
    } catch (error) {
        
    }
})
adminAuth.put('/editCertificate',authenticate,adminCheck,(req,res)=>{
    try {
        const {CourseName,CertificateID, Name,Grade,Date}=req.body
    
        if(course.get(CourseName)){
            
            course.set(CourseName,{CertificateID,Name,Grade,Date});
            res.status(400).send("Certificate edited") ;
         }
        else{
           
            res.status(201).send(" Certificate Not Found ")
        
        }    
    } catch  {
        res.status(500).send("Internal Server Error") ;
    
    }
    
       
    })
    adminAuth.delete("/deleteCertificate",authenticate,adminCheck,(req,res)=>{
    
            
            const {CourseName}=req.body;
          
            const result=course.get(CourseName)
            if(result){
                course.delete(CourseName)
                
                res.status(400).send("Certificate deleted") ;
             }
            else{
               
                res.status(201).send(" Certificate Not Found ")
            
            }
       
    })
export {adminAuth}