var express = require('express');
var fs = require('fs');

var app = express();

app.set('views', './src/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	fs.readFile('./users.json', function (error, data) {
		if (error) {
			console.log(error);
		}

		var parsedData = JSON.parse(data);
    	console.log(parsedData);
    	res.render("index", {
      		users: parsedData
		});
	});
});

var server = app.listen(3000, function () {
	console.log('Example app listening on port: ' + server.address().port);
});