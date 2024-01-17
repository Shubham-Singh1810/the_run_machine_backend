const express = require("express");
const app = express()
const cors = require("cors");
require("dotenv").config();


const user = require("./routes/user.route");


// connecting with database
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB_STRING
).then(()=>{
    console.warn("db connection done")
});
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))
const PORT = process.env.PORT || 3005;
// Routes 
app.use("/api/user", user);




app.listen(PORT, ()=>{
    console.log("app is running at port", PORT)
})