var express = require('express'); // Get the module
var app = express(); // Create express by calling the prototype in var express
var http = require('http').createServer(app);
var WebSocket = require('ws');


function randomStr(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.use('/s', express.static(__dirname + '/node_modules/'));

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html');
  res.sendFile(__dirname + '/ws.html');
});


var myArgs = process.argv.slice(2);
var port = 80;
if (myArgs.length > 0) {
  port = myArgs[0];
}

http.listen(port, () => {
  console.log('listening on *:' + port);
});

var ws = new WebSocket.Server({ port: 3000 });
ws.on('connection', ws => {
  setInterval(function(){ 
    msg = randomStr(10);
    ws.send('show_panel_2' + ":" + msg);
  }, 1000);
  
})
