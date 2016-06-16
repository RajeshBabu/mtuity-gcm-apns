var express = require('express');
var router = express.Router();
router.post('/', function(req, res) {  
  var agent = require('./_header')()
  , device = req.body.device;

/*!
 * Send message
 */

agent.createMessage()
  .device(device)
  .alert('Custom variables')
  .set('id_1', 12345)
  .set('id_2', 'abcdef')
  .send();  
});
module.exports = router
 

