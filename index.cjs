const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const fetch = require ('node-fetch');

const app = express();


app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    let locDate = { temp: "Temp", disc: "Discription", location: "Location", humidity: "Humidity ", feel: "Feel ", speed: "Speed" };
    res.render("index",{locDate: locDate});
});


app.post("/", async(req,res)=>{
    try{
    let location = await req.body.city;
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=14939e97db08aa21e14708df24e5c229&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    let locDate = {};
    locDate.temp = Math.floor(data.main.temp);
     locDate.desc = data.weather[0].description;
     locDate.feel = data.main.feels_like;
     locDate.humidity = data.main.humidity;
     locDate.speed = data.wind.speed;
     locDate.location = location;
     console.log(locDate);
     res.render("index",{locDate:locDate,});
    }catch (err){
        console/log(err);
        res.status(400).json({data:"not found!"})
    }
     
});

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});