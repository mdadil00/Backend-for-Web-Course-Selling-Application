const { Router } = require("express");

const adminRouter = Router();
const { adminModel, coursesModel } = require("../db");
const jwt = require("jsonwebtoken");

const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMW } = require("../middlewares/admin");


//.................signUP.....................
adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstname, lastname } = req.body;

    // put tyry catch here
    await adminModel.create({
        email: email, password: password, firstname: firstname, lastname: lastname
    })

    res.json({
        message: "account formed"
    })
})

//.................SIGNin.....................
adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ // not find it should be findOne , find returns and empty array which makes if(admin) always true
        email: email,
        password: password
    })

    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD)
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


adminRouter.post("/course", adminMW, async function (req, res) {
    const adminId = req.userId;
    const { title, description, price, image } = req.body;
    const course = await coursesModel.create({
        title, description, image, price, adminId
    })

    res.json({
        message: "course created",
        courseId: course._id
    })
})
adminRouter.put("/course",adminMW, async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await coursesModel.updateOne({
        _id: courseId,
        creator:adminId
    }, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})
adminRouter.get("/bulk",adminMW, async function (req, res) {
    const adminId=req.userId;
    const courses = await coursesModel.find({
        creator:adminId
    })

    res.json({
        message: "your courses",
        courses
    })
})
module.exports = {
    adminRouter: adminRouter
}