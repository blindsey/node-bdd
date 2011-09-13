var http = require('http');
var app = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<html><body>Hello World<a href="#" onclick="document.title=\'node.js\'">submit</a></body></html>');
});

if(require.main == module) {
  app.listen(1337, "127.0.0.1");
  console.log( 'Server running at http://127.0.0.1:1337/' );
} else {
  module.exports = app;
}
