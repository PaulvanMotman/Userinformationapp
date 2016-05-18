var express = require('express');
var fs = require('fs');

var app = express();

var reading = require ('../manualmodules/readfile');

/// We need this to acces the javascript (static) file
app.use(express.static('./resources/'));


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


/// Here I create the API for the ajax form

app.post('/searchresult', function (request, response) {
	var username = request.body.users[0].toUpperCase() + request.body.users.slice(1);

	console.log("post request received: " + username);
	var storeUser = []
	var ajax = request.body.ajax

	reading.readFile('./users.json', function(parsedData) {
		for (var i = 0; i < parsedData.length; i++) {
			if (parsedData[i].firstname.indexOf(username) > -1 || parsedData[i].lastname.indexOf(username) > -1 || (parsedData[i].firstname + " " + parsedData[i].lastname).indexOf(username) > -1 || (parsedData[i].lastname + " " + parsedData[i].firstname).indexOf(username) > -1) {
				storeUser.push(parsedData[i])
			}
		};
		if (!ajax) {
			response.render('searchresult', {
				storeUser: storeUser
			})
		}
		else {
			response.send(storeUser)
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
	console.log(newuser)
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




///

