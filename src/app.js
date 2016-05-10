var express = require('express');
var fs = require('fs');

var app = express();

//// Here I execute the code needed for part 0

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


//// Here I execute the code needed for part 1

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/posted', function (request, response) {
	response.render("search", {
	});
});

app.post('/posted', function (request, response) {
	console.log("post request received");
	console.log(request.body);

	response.send('data received: ' + JSON.stringify(request.body) + '\n');
});


///// Here I tell the port to listen


var server = app.listen(3000, function () {
	console.log('Example app listening on port: ' + server.address().port);
});

