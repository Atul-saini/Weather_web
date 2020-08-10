const express= require("express");
const https= require("https");
const bodyparser=require("body-parser");
const app= express();

app.use(bodyparser.urlencoded({extended: true}));


app.get("/", function(req,res){

  res.sendFile(__dirname + "/index.html");
  console.log(__dirname)
});


app.post("/",function(req, res){


  const query=req.body.cityname;
  console.log(query)
  const appid="e72ca729af228beabd5d20e3b7749713";
  const unit="metric";
 const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;
 console.log(url)

https.get(url,function(response){
  response.on("data",function(data){
    const weatherdata= JSON.parse(data);
    console.log(weatherdata)
    const temp= weatherdata.main.temp;
    const desc=weatherdata.weather[0].description;
   const icon= weatherdata.weather[0].icon;
   const imageurl="http://openweathermap.org/img/wn/" + icon+ "@2x.png";
    res.write("<p>The Weather is currently"+ desc +"</p>");
    res.write("<h1>the tempreature in London is"+ temp +"degree celcius</h1>");
    res.write("<img src=" + imageurl + ">")
    res.send();

  });
});
})


app.listen(3000,function(){
  console.log("server is running on port 3000");
})
