const { Router } = require("express");
const { userModel, purchasesModel, coursesModel } = require("../db");
const useRouter = Router();
const jwt = require("jsonwebtoken");

const { JWT_USER_PASSWORD } = require("../config");
const { userMW } = require("../middlewares/user");

useRouter.post("/signup", async function (req, res) {
    const { email, password, firstname, lastname } = req.body;

    // put tyry catch here
    await userModel.create({
        email: email, password: password, firstname: firstname, lastname: lastname
    })

    res.json({
        message: "account formed"
    })
})
useRouter.post("/signin", async function (req, res) {
    // ideally pass should be hashed 
    const { email, password } = req.body;
    const user = await userModel.findOne({ // not find it should be findOne , find returns and empty array which makes if(user) always true
        email: email,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD)
        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({
            message: "incorrect creds"
        })
    }



})
useRouter.get("/purchases", userMW, async function (req, res) {
    const userId = req.userId;

    const purchases = await purchasesModel.find({
        userId
    })
    const coursesData = await coursesModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    })
    res.json({
        purchases,
        coursesData
    })
})
module.exports = {
    useRouter: useRouter
}