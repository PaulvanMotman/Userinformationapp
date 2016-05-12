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

app.get('/search-user', function (request, response) {
	response.render("search", {
	});
});

app.post('/searchresult', function (request, response) {
	var username = request.body.users[0].toUpperCase() + request.body.users.slice(1);

	console.log("post request received: " + username);

	reading.readFile('./users.json', function(parsedData) {
		var storeUser = []
		for (var i = 0; i < parsedData.length; i++) {
			if (username == parsedData[i].firstname || username == parsedData[i].lastname) {
				storeUser.push(parsedData[i].firstname, parsedData[i].lastname, parsedData[i].email)
			}
		};
		if (storeUser.length !== 0) {
			response.send("Firstname: " + storeUser[0].toString() + "<br>" + "Lastname: " + storeUser[1].toString() + "<br>" + "Email: " + storeUser[2].toString())
		}
		else {
			response.send("To bad, try again!")
		}
	});
});

///// Here I execute the code needed for part 2

app.get('/add-user', function (request, response) {
	response.render("add", {
	});
});

app.post('/add-user', function (request, response) {
	var newuser = request.body
	var userList = fs.readFileSync('./users.json')
	var users = JSON.parse (userList)
	users.push (newuser)
	var userJSON = JSON.stringify (users)
	fs.writeFileSync ('./users.json', userJSON)
	response.redirect ('/')
});



///// Here I tell the port to listen


var server = app.listen(3000, function () {
	console.log('Example app listening on port: ' + server.address().port);
});

