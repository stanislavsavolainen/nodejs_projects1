
var express = require('express');
var app = express();
var port = 5758;
var BodyParser = require('body-parser');

//Joi validation
var expressJoi = require('express-joi-validator');
var Joi = require('joi');
 
var minimum_lenght = 5; //5 characters
var maximum_lenght = 8; //8 characters


//got to link 127.0.0.1:5758/link1?input_a=123123   ( host + port + entry point link + 'input_a' keu as query string parameter)
//this query string must be between 5 and 8 long to enter handler function or fail

app.use(express.static('web_public'));

app.listen(port, function () { console.log("Server started at port " + port); } );

//my validation scema
const validationSchema = {
	query: {
	  input_a : Joi.string().min(minimum_lenght).max(maximum_lenght).required()
	}
};


app.get('/link1' , expressJoi(validationSchema) ,function (req, res) { 

	console.log("String is valid ");

	res.send("String is valid");
});
