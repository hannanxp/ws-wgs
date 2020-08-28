var express = require('express'); // Get the module
var app = express(); // Create express by calling the prototype in var express
var http = require('http').createServer(app);
var WebSocket = require('ws');

/**
 * Produce random alphanumeric string
 */
function randomStr(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// static web app
app.use('/s', express.static(__dirname + '/node_modules/'));
app.use('/j', express.static(__dirname + '/js/'));

// default routing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ws.html');
});

// get command arguments
var myArgs = process.argv.slice(2);
var port = 80;
var wsPort = 3000
if (myArgs.length > 0) {
  port = myArgs[0];
  
  if (myArgs.length > 1) {
    wsPort = myArgs[1];
  }
}

// run webserver
http.listen(port, () => {
  console.log('web server listening on *:' + port);
});

// run websocket server
var ws = new WebSocket.Server({ port: wsPort });
ws.on('connection', ws => {
  
  // send message every 2500 ms for panel 1
  setInterval(function(){ 
    msg = randomStr(10);
    ws.send('show_panel_1' + ":" + msg);
  }, 2500);
  
  // send message every 300 ms for panel 2
  setInterval(function(){ 
    msg = randomStr(10);
    ws.send('show_panel_2' + ":" + msg);
  }, 300);
  
  // receive incomming message
  ws.on('message', function incoming(message) {
    ws.send(message);
  });

  
})
