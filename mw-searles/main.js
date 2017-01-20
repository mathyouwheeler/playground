http.createServer(function (req, res) {
  setTimeout(function () {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Worldn');
  }, 2000);
}).listen(8000);