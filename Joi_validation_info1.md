

 
 JOI validation don't allow handle-function happen when user enter back-end endpoint with not valid or wrong data. Joi validation hapi-module only ...


 JOI-validation  (varriable names required be same at front-end when send http-request, if required validate http-request data ) :
 
  name : Joi.string().allow(''),
  birthday : Joi.number().integer(),
  childId : Joi.string().required(),
  email : Joi.email().required(),
  active: Joi.boolean().required(),
  text: Joi.string(),
  data: Joi.any.required(),
  a : Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)



  Package.json
    -> "joi": "^10.6.0"  (hemmo-backend 10.2.2)

  const Joi = require('joi');  
  
  npm install joi --save      
 

 	
