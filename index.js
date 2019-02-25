var express=require('express');
var webPush=require('web-push');
var bodyParser=require('body-parser');
var path=require('path');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var subscription;
var app=express();
app.use(bodyParser.json());

//set static path
app.use(express.static(path.join(__dirname,"client")));

var VapidPublicKey="BBMQzxSGmbzzFfVBm6ESlL8ImlRbzufrxpqCNcjBqDpm7_MGAbeQwQtM_KMjRBQKmFnWm8T_JiijYqiV5kcVdr0";
var VapidPrivateKey="MpxvotLgi0zV_gCktPGYcRxmvLWGCg7XRQAuCKB56Hc";



webPush.setVapidDetails('mailto:someMail@gmail.com',VapidPublicKey,VapidPrivateKey);

//subscribe route

app.post('/subscribe',function(req,res){

subscription= req.body;

console.log('subscription='+subscription);
//send 201 status

res.status(201).json({});

//var payload=JSON.stringify({'title':'test push'});

//webPush.sendNotification(subscription,payload);


});



app.post('/push',function(req,res){

var notificationMessage=JSON.stringify(req.body);
webPush.sendNotification(subscription,notificationMessage);

});






var port=5000;

app.listen(port,function(){console.log("started")});