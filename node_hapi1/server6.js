
'use strict';

//NodeJS Hapi - module   ( Hapi / static-express )

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({ host: 'localhost' , port: 8089, routes: {
        cors: true
      } });

//use cors, because http-request come from other doimain than server


// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {

	console.log("/hello GET-handler executed.");

        //return reply('hello world');
	return reply(JSON.stringify('hello world'));
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

