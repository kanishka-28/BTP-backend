const db = require("./database/connection/index");

const express = require("express");
const cors = require("cors")
const user = require("./routes")

const app = express();
app.use(express.json());
app.use(cors());
db();

app.get("/", (req,res)=>{
    res.send("hello world");
})

//services/api
app.use("/user", user);

const port = 4000;
app.listen(port, ()=>{
    console.log(`app listening at port http://localhost:${port}`);
})