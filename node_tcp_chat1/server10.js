

//npm init
//npm install express --save  <------- express server
//npm install body-parser --save <---- body-parser for http-request / http-response handling
//npm install ws --save   <------------webSocket


//===INIT NODEJS + WebSocket + EXPRESS + TCP/IP Socket =============

//http static express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var express_port = 4142;


//TCP/IP
var net = require('net');
var HOST = '127.0.0.1';
var tcp_PORT = 6970;
var hasClient = false;

var sockets = [];
var messages = [];
var id = 1;

//WebSocket
const WebSocket = require('ws');
var ws_client;


// ======================== EXPRESS functions ======================

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
//----
app.use(allowCrossDomain);

//--------------------------------------


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

//-------------------------------------

function express_init(){
	console.log("NodeJS express modules initialized");
}

const server = app.listen(express_port, express_init);

//-------------------------------------

app.get('/all_msg', function (req, res) {

  var uptime = process.uptime();

  console.log("Client ask server for messages, server uptime : " +uptime + "seconds ");

  //var vastaus = "1234"; 	
  //res.send(JSON.stringify(vastaus ) ) ;

  //console.log("Viestit :" +messages);

   messages.forEach((m) => console.log("Messagez :" +m) );

  res.send(JSON.stringify(messages)); //lähettää kaikki chattailu viesit käyttäjälle
})





// ========================= TCP/IP functions ======================

net.createServer(function(sock) {
    sockets.push(sock);

	 //generate unique index number for user
	 var index = id++;

	 console.log("User "+index + ": is entered to server");
	// ************ send old message to all new clients ********
	 messages.forEach((m) => sock.write(m));
	 ws_client.send(messages);

	// *********** receive message from server *****************
	 sock.on('data', function(data) {
	
		

		// client data
		var ip_addr = sock.remoteAddress;


		//client TCP-client message
		var server_date_and_time =  new Date().toString(); //new Date().toTimeString();
  		var client_message_to_server = 'User' + index + '* (' + server_date_and_time + ' ip-address ----> ' +ip_addr + ' ) : *' +data;

		  	console.log("TCP User "+ index +  " : wrote new message to server : " + client_message_to_server);

		//write message for all client
		sockets.forEach((s) => s.write(client_message_to_server));
		messages.push(client_message_to_server);

		//write message also to webSocket
		ws_client.send(client_message_to_server);
	 });

	// ********** if connection lost with client *************** 
	sock.on('close', function(data) {
        console.log( 'TCP User' +index + ' : left , connection : CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
	var i = sockets.indexOf(sock);
	sockets.splice(i, 1);
    });


}).listen(tcp_PORT, HOST);

// TCP/IP socket send message via WebSocket when one of client write 
// new message to server, then React client receive new message from
// server automaticaly with auto update


// ======================= WebSocket functions =====================
//const server = http.createServer(app);
//express create server for webSocket -> webSocket will use same port 
//as express module
const wss = new WebSocket.Server({ server });


wss.on('connection', (ws, req) => {
	console.log("WebSocket client connected to server");
	//receive message from client
	ws_client = ws;
	ws.on('message', function incoming(message) {
   	 console.log('received: %s', message);
  	});
	// 123456   

});

wss.on('close' , function disconnnect(){
	console.log("WebSocket client disconnected from server");
} );


