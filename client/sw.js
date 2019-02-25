var url;
self.addEventListener('push',function(e){

//parese data into proper format
var data=e.data.text();
data=JSON.parse(data);


var title=data.title;
var description=data.description;
var img=data.image;
var ico=data.icon;
url=data.url;

var options={

	image:img,
	icon:ico,
	body:description
};

e.waitUntil(
self.registration.showNotification(title,options)
);


});



self.addEventListener('notificationclick',function(){

 clients.openWindow(url);


});


