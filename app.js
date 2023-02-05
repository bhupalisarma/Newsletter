const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    var data = {
        members:[{
            email_address : email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
            
        }]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/5ab3f35274"
    const options={
        method:"post",
        auth:"user:6e739af02e9442482f6e5c327bcd68bc-us13"
    }

    const request = https.request(url,options,function(response){        
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

    // app.post("/failure", function (req, res) {
    //     res.sendFile(__dirname + "/signup.html")
    // });

});

app.listen(process.env.PORT,function(){
    console.log("Server working on 3000");
});


//6e739af02e9442482f6e5c327bcd68bc - us13

//5ab3f35274