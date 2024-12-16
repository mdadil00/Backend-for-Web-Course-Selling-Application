const { Router } = require("express");
const { userMW } = require("../middlewares/user")
const { purchasesModel, coursesModel } = require("../db");
const courseRouter = Router();

courseRouter.post("/buy", userMW, async function (req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchasesModel.create({
        userId, courseId
    })
    res.json({
        message: "bought the course"
    })

})

courseRouter.get("/preview", async function (req, res) {
    const userId = req.userId;

    const courses = await coursesModel.find({
        userId
    })
    res.json({
        courses
    })

})
module.exports = {
    courseRouter: courseRouter
}