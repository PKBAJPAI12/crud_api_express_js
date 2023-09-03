const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
const fs=require("fs").promises;
const bodyParser=require('body-parser');
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Listen on the port ${port}`);
})
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
let obj={
    users:[]
};
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
    function validEmail(data,mail){
        let c=0;
        data.forEach((item)=>{if(item.email==mail){c++;}});
        if(c==0) return true;
        return false;
    }
    let jsondata=JSON.stringify(obj);
    filePath=__dirname+'/data.json'
    fs.readFile(filePath).then((data)=>{
        obj=JSON.parse(data);
        if(validEmail(obj.users,body.email)){
            obj.users.push(body);
            let jsondata=JSON.stringify(obj);
            fs.writeFile(filePath,jsondata).then(()=>{
                res.status(201).json({"Status":"Registeration Successfull"});
            }).catch((err)=>{
                res.status(400).json({"Status":"Registeration UnSuccessfull"});
            });
        }
        else{
            res.status(400).json({"Status":"Email is Already Used"});
        }
    }).catch((err)=>{
        obj.users.push(body);
        let jsondata=JSON.stringify(obj)
        fs.writeFile(filePath,jsondata).then(()=>{
            res.status(201).json({"Status":"Registeration Successfull You are First User"});
        }).catch((err)=>{
            res.status(403).json({"Status":`Data is not Valid ${err}`});
        });
    })
}