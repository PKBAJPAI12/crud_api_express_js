const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const fs = require("fs").promises;
const bodyParser = require('body-parser');
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listen on the port ${port}`);
})
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
let obj = {
    users: []
};
filePath = __dirname + '/data.json'
app.route('/register').post(userPost);
app.route('/login').post(loginApp);
app.route('/updateUser/:id').put(updateUser);
app.route('/deleteUser/:id').delete(deleteUser);
async function userPost(req, res) {
    let body = {
        "empId": Math.floor(Math.random() * 10000),
        "fullname": req.body.fullname,
        "username": req.body.username,
        "email": req.body.email,
        "phoneno": req.body.phoneno,
        "gender": req.body.gender,
        "password": req.body.password
    }
    function validEmail(data, mail) {
        let c = 0;
        data.forEach((item) => { if (item.email == mail) { c++; } });
        if (c == 0) return true;
        return false;
    }
    let jsondata = JSON.stringify(obj);
    fs.readFile(filePath).then((data) => {
        obj = JSON.parse(data);
        if (validEmail(obj.users, body.email)) {
            obj.users.push(body);
            let jsondata = JSON.stringify(obj);
            fs.writeFile(filePath, jsondata).then(() => {
                res.status(201).json({ "Status": "Registeration Successfull" });
            }).catch((err) => {
                res.status(400).json({ "Status": "Registeration UnSuccessfull" });
            });
        }
        else {
            res.status(400).json({ "Status": "Email is Already Used" });
        }
    }).catch((err) => {
        obj.users.push(body);
        let jsondata = JSON.stringify(obj)
        fs.writeFile(filePath, jsondata).then(() => {
            res.status(201).json({ "Status": "Registeration Successfull You are First User" });
        }).catch((err) => {
            res.status(403).json({ "Status": `Data is not Valid ${err}` });
        });
    })
}
async function loginApp(req, res) {
    let loginBody = {
        "email": req.body.email,
        "password": req.body.password,
        "cpassword": req.body.cpassword
    }
    function validUser(data, mail) {
        let c = 0;
        let userData;
        data.forEach((item) => { if (item.email == mail) { c++; userData = item; } });
        return (c == 1) ? userData : "notfound";
    }
    fs.readFile(filePath).then((data) => {
        obj = JSON.parse(data);
        if (validUser(obj.users, loginBody.email) != "notfound") {
            let userData = validUser(obj.users, loginBody.email);
            if (userData.password === loginBody.password) {
                if (userData.password === loginBody.cpassword) {
                    res.status(200).json({
                        "Status": "Login Successfull and User Info",
                        "Employee Id": userData.empId,
                        "Username": userData.username,
                        "Full Name": userData.fullname,
                        "User Email": userData.email,
                        "User Phone Number": userData.phoneno,
                        "User Gender": userData.gender
                    });
                }
                else {
                    res.status(401).json({ "Status": "Password and Confirm Password is not matched" });
                }
            }
            else {
                res.status(401).json({ "Status": "Password is Incorrect" });
            }
        }
        else {
            res.status(401).json({ "Status": "Email is not valid" })
        }
    })
}
async function updateUser(req, res) {
    let empId = req.params.id;
    let fullname = req.body.fullname;
    let username = req.body.username;
    let email = req.body.email;
    let phoneno = req.body.phoneno;
    let gender = req.body.gender;
    function validateEmpId(data, id) {
        let c = 0;
        let idx;
        data.forEach((item, i) => { if (item.empId === parseInt(id)) { c++; idx = i; } });
        return (c == 1) ? { "bool": true, "idx": idx } : false;
    }
    fs.readFile(filePath).then((data) => {
        obj = JSON.parse(data);
        let validId = validateEmpId(obj.users, empId);
        if (validId.bool == true) {
            obj.users[validId.idx].fullname = fullname;
            obj.users[validId.idx].username = username;
            obj.users[validId.idx].email = email;
            obj.users[validId.idx].phoneno = phoneno;
            obj.users[validId.idx].gender = gender;
            let jsondata = JSON.stringify(obj);
            fs.writeFile(filePath, jsondata).then(() => {
                res.status(201).json({ "Status": `${empId} Detail is Updated Successfully` });
            }).catch((err) => {
                res.status(400).json({ "Status": "Updation Unsuccessfull" });
            });
        }
        else {
            res.status(400).json({ "Status": `${empId} is not Valid` });
        }
    })
}
async function deleteUser(req, res) {
    let empId = req.params.id;
    function validateEmpId(data, id) {
        let c = 0;
        let idx;
        data.forEach((item, i) => { if (item.empId === parseInt(id)) { c++; idx = i; } });
        return (c == 1) ? { "bool": true, "idx": idx } : false;
    }
    fs.readFile(filePath).then((data) => {
        obj = JSON.parse(data);
        let validId = validateEmpId(obj.users, empId);
        if (validId.bool == true) {
            obj.users.splice(obj.users[validId.idx], 1);
            let jsondata = JSON.stringify(obj);
            fs.writeFile(filePath, jsondata).then(() => {
                res.status(201).json({ "Status": `${empId} User is deleted successfully` });
            }).catch((err) => {
                res.status(400).json({ "Status": "Deletion Unsuccessfull" });
            })
        }
        else {
            res.status(400).json({ "Status": `${empId} is not available` });
        }
    })
}