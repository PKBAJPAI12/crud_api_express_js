const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
app.listen(port,()=>{
    console.log(`Listen on the port ${port}`);
})
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.route('/register').post(userPost);

async function userPost(req,res){
    let body={
        "empId":Math.floor(Math.random()*10000),
        "fullname":req.body.fullname,
        "username":req.body.username,
        "email":req.body.email,
        "phoneno":req.body.phoneno,
        "gender":req.body.gender,
        "password":req.body.password
    }
}