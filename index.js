require('dotenv').config()

const express = require("express");
const mongoose=require("mongoose");
const { useRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
app.use(express.json());

app.use("/user", useRouter);
app.use("/admin", adminRouter);
app.use("/courses", courseRouter);

async function main() {
    mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("listening in port 3000");
}

main();