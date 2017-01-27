var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');
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

server.register(Inert, function (err) {
	if (err) throw err;
})