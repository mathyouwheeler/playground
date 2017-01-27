var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.route({
	path: '/{name}', 
	method: 'GET', 
  handler: (request, reply) => {
		reply(`Hello ${request.params.name}`);
		// console.log(request);
  }
});

server.start((err) => {
	if (err) throw err;
});

// server.start(function (err) {
// 	if (err) {
// 		throw err;
// 	}
// 	console.log(`Server running at: ${server.info.uri}`);
// })

// var Hapi = require('hapi');
// var server = new Hapi.Server();

// server.connection({
//     host: 'localhost',
//     port: Number(process.argv[2] || 8080)
// });

// server.route({
//     method: 'GET',
//     path: '/',
//     handler: (request, reply) => {
//         reply('Hello hapi');
//     }
// });

// server.start((err) => {
//     if (err) throw err;
// });