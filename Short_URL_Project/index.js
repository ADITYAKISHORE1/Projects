import express from 'express';
import { connectToDB } from './connect.js';
import URL from './models/url.js';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = 8001;
connectToDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("MongoDB Connected!!"))
    .catch((err) => console.log("Error in connecting with DB ", err));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);
import urlRoute from './routes/url.js';
import staticRoute from './routes/staticRouter.js';
import userRoute from './routes/user.js';
import {checkForAuthentication, restrictTo } from './middlewares/auth.js';
app.set("view engine", "ejs");
app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);
app.get("/test", async (req, res) => {
    const allURLs = await URL.find({});
    res.render("home.ejs", {
        urls: allURLs,
    });
})
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));