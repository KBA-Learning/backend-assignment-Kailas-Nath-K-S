


import { Router } from "express";
import { authenticate } from "../Middlewares/auth.js";
import { adminCheck } from "../Middlewares/adminCheck.js";



const adminAuth=Router();

const Books=new Map();


adminAuth.post('/addBook',authenticate,adminCheck,(req,res)=>{
    try{
    
        
        console.log(req.UserRole);

        
        
            
            const {BookName,Author,Price,Date}=req.body
            if(Books.get(BookName)){
                res.status(400).send("Book already added") ;
             }
            else{
                Books.set(BookName,{Author,Price,Date});
                console.log(Books.get(BookName))
                res.status(201).send("Added Book ")
            
            }
            
            
        
    }
    catch{
        res.status(500).send("Internal Server Error") ;
      
    }
})
adminAuth.put('/updateBook',authenticate,adminCheck,(req,res)=>{
try {
 const {BookName,Author,Price,Date}=req.body

    if(Books.get(BookName)){
        
        Books.set(BookName,{Author,Price,Date});
        res.status(400).send("Book updated") ;
     }
    else{
       
        res.status(201).send(" Book Not Found ")
    
    }    
} catch  {
    res.status(500).send("Internal Server Error") ;

}

   
})
adminAuth.delete("/deleteBook",authenticate,adminCheck,(req,res)=>{
    try {
        
        const {BookName}=req.body
        console.log(BookName)
         console.log(Books)
        const result=Books.get(BookName)
       
        if(result){
            console.log(result)
            Books.delete(BookName)
            
            res.status(400).send("Book deleted") ;
         }
        else{
           
            res.status(201).send(" Book Not Found ")
        
        }
    } catch  {
        res.status(500).send("Internal Server Error") ;

    }
})

adminAuth.get("/viewBook",(req,res)=>{
    try {
        
        const name=req.query.BookName
        console.log(name)
        const data=Books.get(name)
        if(data){
            res.status(200).send(data)
            console.log(data)
        }else{
            res.status(404).send('Book doesnt exist')
        }
    } catch {
        res.status(500).send("Internal Server Error") ;

    }
    
})
export {adminAuth}