/*!
 * APN Agent - Scenario Connection Header
 * @see
 */

/*
// uncomment section to enable debug output
process.env.DEBUG = process.env.DEBUG
  ? process.env.DEBUG + ',apnagent:*'
  : 'apnagent:*';
*/

/*!
 * Locate your certificate
 */
var apnagent = require('apnagent')
  , agent = module.exports = new apnagent.Agent();

module.exports = function(path,env,password,res){
console.log('Header class path '+path);
var join = require('path').join
  , pfx = join(__dirname, '../_certs/'+path);

/*!
 * Create a new gateway agent
 */


/*!
 * Configure agent
 */
console.log("Prefix "+pfx);
console.log("passphrase "+password);
agent.set("passphrase",password)
agent
  .set('pfx file', pfx)
  .enable(env);

/*!
 * Error Mitigation

 msg.keys(o).forEach(function(key) {
  var val = o[key];
console.log("Keys..."+val);
});
 */

agent.on('message:error', function (err, msg) {
  if (err) throw err;
  switch (err.name) {
    // This error occurs when Apple reports an issue parsing the message.
    
    case 'GatewayNotificationError':
      console.log('[message:error] GatewayNotificationError: %s', err.message);
			    res.render('index', { title: 'GatewayNotificationError : '+err.message });

      // The err.code is the number that Apple reports.
      // Example: 8 means the token supplied is invalid or not subscribed
      // to notifications for your application.
      if (err.code === 8) {
        console.log('    > %s', msg.device().toString());
			    res.render('index', { title: '    > %s : '+ msg.device().toString() });
        // In production you should flag this token as invalid and not
        // send any futher messages to it until you confirm validity
      }

      break;

    // This happens when apnagent has a problem encoding the message for transfer
    case 'SerializationError':
      console.log('[message:error] SerializationError: %s', err.message);
			    res.render('index', { title: 'SerializationError : '+err.message });
      break;

    // unlikely, but could occur if trying to send over a dead socket
    default:
      console.log('[message:error] other error: %s', err.messag);

      res.render('index', { title: 'Other error : '+err.message });
      break;
  }
});

/*!
 * Make the connection
 */
  console.log('apnagent [%s] gateway password', password);
agent.connect(function (err) {
  var env = agent.enabled('sandbox')
    ? 'sandbox'
    : 'production';
  if (err) throw err;
  console.log('apnagent [%s] gateway connected', env);

});
 return agent;
}

