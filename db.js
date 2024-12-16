const mongoose = require("mongoose");
console.log("uwuwuwu");
const Schema = mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstname: String,
    lastname: String
})
const adminSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstname: String,
    lastname: String
})
const coursesSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    creator: ObjectId
})
const purchasesSchema = new mongoose.Schema({
    courseId: Object,
    userId: ObjectId
})


const userModel = mongoose.model('users', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const coursesModel = mongoose.model('courses', coursesSchema);
const purchasesModel = mongoose.model('purchases', purchasesSchema);

module.exports = {
    userModel, adminModel, coursesModel, purchasesModel
}