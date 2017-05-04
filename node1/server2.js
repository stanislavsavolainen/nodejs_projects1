var express = require('express')
var app = express()
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//palvelin kuuntelee porttia eli localhost:portti/...
var portti = 8080

app.use(express.static('web_public'))

//----------------------------------------------------

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

//----------------------------------------------------

app.post('/process_post', urlencodedParser, function (req, res) {
//app.post('/process_post', function (req, res) {

    console.log("POST on suoritettu !");

     response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };

   var p_first_name = response.first_name;
   var p_last_name = response.last_name;

   console.log(response);

    res.send("POST komento on suoritettu ! <br> Nimi on : "+p_first_name + "<br>  Sukunimi : "+p_last_name );


})


// ...................


app.listen(portti, function () {
  console.log('Example app listening on port !'+portti)
})
