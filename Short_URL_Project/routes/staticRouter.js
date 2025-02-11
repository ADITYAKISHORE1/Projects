import express from 'express';
import URL from "../models/url.js"
import { restrictTo } from '../middlewares/auth.js';
const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]),async(req,res)=>{
    const allurls = await URL.find({});
    return res.render("home.ejs",{
        urls:allurls,
    });
})
router.get('/',restrictTo(["NORMAL","ADMIN"]), async(req,res)=>{    
    const data = await URL.find({ createdBy: req.user});
    res.render('home.ejs',({
        urls : data,
    }));
})
router.get("/signup", (req,res)=>{
    res.render("signup.ejs");
});
router.get("/login",(req,res)=>{
    res.render("login.ejs");
});
export default router;