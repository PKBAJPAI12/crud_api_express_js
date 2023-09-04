const passport=require('passport');
const passportJwt=require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const fs=require("fs").promises;
let obj={
    users:[]
}
filePath = __dirname + '/data.json'
passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.TOKEN_SECRET,
},async function(jwt_payload,done){
    let data=await fs.readFile(filePath);
    let userData=JSON.parse(data);
    let user=getUser(userData.users,jwt_payload.id);
    if(user!=false){
        return done(null,user);
    }
    else{
        return done(err);
    }
}));
function getUser(userData,id){
    let c=0;
    let user;
    userData.forEach((item)=>{if(item.empId==id){c++; user=item}});
    return (c==1)?user:false;
}