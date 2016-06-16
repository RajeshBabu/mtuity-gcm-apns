var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');
 
var message = new gcm.Message();
/* Post users listing. https://www.npmjs.com/package/node-gcm  and https://www.npmjs.com/package/node-pushserver*/
router.post('/', function(req, res) {  
           console.log(", ID"+req.body.env+",..."+req.body.notification);
   message.addData('message', req.body.messages);
   console.log(req.body.notification); 
   var regTokens = [req.body.regid]; 
   // Set up the sender with you API key 
   var sender = new gcm.Sender(req.body.apikey); 
  // Now the sender can be used to send messages 
  sender.send(message, { registrationTokens: regTokens }, function (err, response) {
	if(err){
              console.log(err);
              res.render('index', { title: 'Failed to sent notification  '+err });
        }
	else{ 	
            console.log(response);
            res.render('index', { title: 'Notification sent.' });
           }
  });  
});
module.exports = router
 

