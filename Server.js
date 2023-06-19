const express = require('express');
const fs = require('fs');
var app = express();

//middleware
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

//mainpage
app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html')
})
//Creat Route
app.get('/adduser',function(req,res){
    res.sendFile(__dirname+'/regis.html')
})
app.post('/addUser',function(req,res){
    //create a json file with user input name
   var user= req.body.name;
   fs.writeFile(user+"Data.json",JSON.stringify(req.body),function(err){
    if(err)console.log(err);
   })
   res.send("welcome "+user);
})
//Read Route
app.get("/viewuser",function(req,res){
    res.sendFile(__dirname+"/view.html")
})
app.post("/getUser",function(req,res){
    var user= req.body.name;
    // ./MariamData.json
    fs.readFile("./"+user+"Data.json",function(err,data){
        if(err)throw err;
        var userData=JSON.parse(data);
        res.send(userData.name+" "+userData.age);
    })
})
app.get("/update",function(req,res){
    res.sendFile(__dirname+"/update.html")
})
app.post("/update",function(req,res){
    var user = req.body.name; //name field value
    fs.readFile('./'+user+"Data.json", function(err,data){
        if(err) console.log(err)
        else
        {
            fs.writeFile('./'+user+"Data.json",JSON.stringify(req.body),function(err){
                if(err) console.log(err);
                else{
                    res.send("User updated")
                }
            })
        }
    })
})
//delete route
app.get('/delete',function(req,res){
    res.sendFile(__dirname+"/delete.html")
})
app.post('/delete',function(req,res){
    var user= req.body.name;
    fs.unlink('./'+user+'Data.json', function(err){
        if(err) res.send("User not found");
        else{
            res.send("User deleted")
        }
    })
})
app.listen(8080)