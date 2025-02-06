import express, { json } from "express"
import { userAuth } from "./Route/userAuth.js";
import { adminAuth } from "./Route/adminAuth.js";




const app=express();
app.use(json());

app.use('/',userAuth)
app.use('/',adminAuth)

app.listen(8000,()=>{
    console.log("server is running")
}
)