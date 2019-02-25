var VapidPublicKey="BBMQzxSGmbzzFfVBm6ESlL8ImlRbzufrxpqCNcjBqDpm7_MGAbeQwQtM_KMjRBQKmFnWm8T_JiijYqiV5kcVdr0";

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}



//check for service worker
if('serviceWorker' in navigator)
{
	
	
		Notification.requestPermission().then(function(permission){

		if(permission==="granted")
		{

			navigator.serviceWorker.register('./sw.js');
			navigator.serviceWorker.ready.then(function(reg){

					var subscriptionOptions={
      					userVisibleOnly: true,
      					applicationServerKey: urlBase64ToUint8Array(VapidPublicKey)
    				};	
	
				reg.pushManager.subscribe(subscriptionOptions).then(function(subscription){

		
					var message={ 'title':'WELCOME',
						          'description':'this is test notification',
						          'image':'./flower.jpg',
						          'icon':'./logo.png',
						          'url':'http://www.hospitilio.com/'
						        };


			      fetch('/subscribe',{
	 		            method:'POST',
			            body:JSON.stringify(subscription),
			            headers:{ 'content-type':'application/json'}
			         });

			    /*  fetch('/push',{
				        method:'POST',
				        body:JSON.stringify(message),
				        headers:{ 'content-type':'application/json'}
			          });*/
		        

		        });//end of subscription
    	    });
        }//end of ifPermission granted
	});//end of request permission

	

	
	
}




