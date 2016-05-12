var express = require('express');
var fs = require('fs');

var app = express();

var reading = require ('../manualmodules/readfile');


//// Here I execute the code needed for part 0

app.set('views', './src/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	reading.readFile('./users.json', function(parsedData) {
		console.log(parsedData)
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
	var searchname = request.body.users[0].toUpperCase() + request.body.users.slice(1);
	console.log(searchname);

	for (var i = 0; i < parsedData.length; i++) {
		if (searchname == parsedData[i].firstname) {
		response.send("match!!!")
		}
		else {
		response.send("nothing found")
		}
	}
});






///// Here I tell the port to listen


var server = app.listen(3000, function () {
	console.log('Example app listening on port: ' + server.address().port);
});

