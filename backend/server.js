const express=require("express")
const app=express()

const cors=require("cors")
require("dotenv").config()
  
const corsOption={
    origin:"*",
    credentials:true
}

const PORT=  process.env.PORT || 7000
app.use(cors(corsOption))
app.use(express.json())

const weatherRoutes = require("./routes/weather.routes");
app.use("/api/v1/weather", weatherRoutes);

app.get("/",(req,res)=>{
    res.send({
        activeStatus:true,
        error:false
    })
})
app.listen(PORT,(err)=>{
    if(err) throw new err
    console.log(`Server running `)
})