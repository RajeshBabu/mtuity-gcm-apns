var express = require('express');
var router = express.Router();
var multer  =   require('multer');
var parser = require('json-parser');
var app         =   express();
var gcm = require('node-gcm');
 
var message = new gcm.Message();
var path;
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '_certs');
  },
  filename: function (req, file, callback) {
   path =  file.fieldname + '-' + Date.now()+".p12";
    callback(null, path);
  }
});
var upload = multer({ storage : storage}).single('iosapikey');

router.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

router.post('/',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            res.end("Error uploading file."+err);
        }
           console.log("Path "+path+", ID"+req.body.env+",..."+req.body.os);
       if(req.body.os === 'android'){
		 message.addData('message', req.body.messages);
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
                            if(response.success == 1){
			    res.render('index', { title: "Notification Sent."});
                             }else{
			       res.render('index', { title: response.results[0].error});
                             }
			   }
		  });  
       }else{
	var agent = require('./_header')(path,req.body.env,req.body.password,res),
            device = req.body.deviceid;

	/*!
	 * Send message
	 */

	agent.createMessage()
	  .device(device)
	  .alert(req.body.alert)          
	  .set('id_1', 12345)
	  .set('id_2', 'abcdef')
	  .send(function (err) {

      // handle apnagent custom errors
      if (err && err.toJSON) {
        res.render('index', { title: 'Notification Failed :  '+err.message });
      } 

      // handle anything else (not likely)
      else if (err) {
        res.render('index', { title: 'Notification Failed :  '+err.message });
      }

      // it was a success
      else {
    console.log("Error message ");
        res.render('index', { title: 'Notification Sent.  ' });
      }
    });

       }
    });
});
module.exports = router
