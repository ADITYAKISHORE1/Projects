import User from "../models/user.js";
import { setUser } from "../service/auth.js";
const handleUserSignup = async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        await User.create({
            name,
            email,
            password,
        });
    }
    catch{
        res.end("<h1>User already registered!</h1>");
    }
    // const sessionId = uuidv4();
    // setUser(sessionId,{email,password});
    // res.cookie("uid", sessionId);
    return res.redirect("/");
} 
const handleUserLogin = async(req,res)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email, password});
    if(!user){
        return res.render("login.ejs",{
            error: "Invalid Username or Password !!",
        });
    }
    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
};


export {handleUserSignup,handleUserLogin};