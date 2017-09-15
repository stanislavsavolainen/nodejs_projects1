
var express = require('express');
var app = express();
var port = 5758;
var BodyParser = require('body-parser');
var errorhandler = require('errorhandler')

//Joi validation
var expressJoi = require('express-joi');
 
var minimum_lenght = 5; //5 characters
var maximum_lenght = 8; //8 characters


//got to link 127.0.0.1:5758/link1?input_a=123123   ( host + port + entry point link + 'input_a' keu as query string parameter)
//this query string must be between 5 and 8 long to enter handler function or fail

app.use(express.static('web_public'));
app.use(errorhandler());


app.listen(port, function () { console.log("Server started at port " + port); } );





//my validation scema
const validationSchema = {
  input_a : expressJoi.Joi.string().min(minimum_lenght).max(maximum_lenght).required()
};


app.get('/link1' , expressJoi.joiValidate(validationSchema) ,function (req, res, next) { 

	console.log("String is valid ");

	//if( ! err ) console.log("Error detected");
	

	res.send("String is valid");



});
