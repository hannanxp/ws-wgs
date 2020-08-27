var express = require('express'); // Get the module
var app = express(); // Create express by calling the prototype in var express
var http = require('http').createServer(app);
var io = require('socket.io')(http);

function randomStr(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function showData() {
  console.log("Hello");
  setTimeout(showData, 3000);
}



app.use('/s', express.static(__dirname + '/node_modules/'));

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html');
  res.sendFile(__dirname + '/panel.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
  
  showData();
  
});

