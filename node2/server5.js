var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 8081;

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
//app.use(express.static('web_public'))

app.use(allowCrossDomain);


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

app.use(express.static('web_public'));
app.get('/index.htm', function (req, res) {
  res.sendFile(__dirname + "/" + "index.htm");
})



//========================================================================

//app.post('/profiles1', urlencodedParser, function (req, res) {
app.post('/save_profiles1', function (req, res) {

  console.log(JSON.stringify(req.body));

  console.log("***********  SAVE PROFILES  ******************");

  console.log("Save profile..");

  writeToFile(JSON.stringify(req.body)); //server write client data to JSON-file on server

  res.send(JSON.stringify(req.body));
})


//=========================================================================

app.post('/read_profiles1', function (req, res) {

  console.log("*********** READ PROFILES **************");
  console.log("Read profile content : " + JSON.stringify(req.body));


  var server_file_data = readFromFile();

console.log("Server data : " + server_file_data);

 res.send(JSON.stringify(server_file_data ) ) ;
})




//===========================================================================

var server = app.listen(port, function () {

  //var host = server.address().address
  //var port = server.address().port

  //console.log("Example app listening at http://%s:%s", host, port)
  console.log("Server runing port : " + port)

})


//===========================================================================

function writeToFile(json_data) {

  var fs = require('fs');

  /*
  var stream = fs.createWriteStream("server_data.json");
  stream.once('open', function(fd) {
    stream.write(json_data);
  
   
  
    //stream.write("My second row\n");
    stream.end();
  });
  */
  fs.appendFileSync('message.txt', json_data);


}

//===========================================================================


function readFromFile() {

  var fs = require('fs');

  var text_data = fs.readFileSync('message.txt', 'utf8');

  return text_data;
}