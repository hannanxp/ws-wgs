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
  showPanel1();
  showPanel2();
  showPanel3();
  showPanel4();
}

function showPanel1() {
  var msg;
  
  msg = randomStr(10);
  io.emit('show_panel_1', msg);
  
  setTimeout(showPanel1, 2500);
}

function showPanel2() {
  var msg;
  
  msg = randomStr(10);
  io.emit('show_panel_2', msg);
  
  setTimeout(showPanel2, 300);
}

function showPanel3() {
  var msg;
  
  msg = randomStr(10);
  io.emit('show_panel_3', msg);
  
  setTimeout(showPanel3, 6500);
}

function showPanel4() {
  var msg;
  
  msg = randomStr(10);
  io.emit('show_panel_4', msg);
  
  setTimeout(showPanel4, 5500);
}

app.use('/s', express.static(__dirname + '/node_modules/'));

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html');
  res.sendFile(__dirname + '/panel.html');
});

io.on('connection', (socket) => {
  //
});

http.listen(3000, () => {
  console.log('listening on *:3000');
  
  showData();
  
});

