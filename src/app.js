// Requiring node modules
var express = require('express');
var fs = require('fs');

// Creating a new app
var app = express();

// Importing readfile function
var reading = require ('../manualmodules/readfile');

/// We need this to acces the javascript (static) file
app.use(express.static('./resources/'));


//// Here I execute the code needed for part 0

// Setting views
app.set('views', './src/views');
app.set('view engine', 'jade');

// Listen for a get on /
app.get('/', function (req, res) {
	reading.readFile('./users.json', function(parsedData) {
		console.log(parsedData)
		// Render index.jade, and sending the parsedData with it
		res.render("index", {
      		users: parsedData
		});
	});
});


//// Here I execute the code needed for part 1

// Bodyparser is needed to retrieve data using request.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Listen for a get on /search-user
app.get('/search-user', function (request, response) {
	// Render search.jade
	response.render("search", {
	});
});


/// Listen for a post on /searchresult (which comes from an ajax call AND submit button when searching)
app.post('/searchresult', function (request, response) {
	// Store the input in the variable username, and making sure the first letter is capatilized
	var username = request.body.users[0].toUpperCase() + request.body.users.slice(1);

	console.log("post request received: " + username);

	// Create variable to store the data in, and to check if ajax call came through
	var storeUser = []
	var ajax = request.body.ajax

	// Check the database
	reading.readFile('./users.json', function(parsedData) {
		// loop through the database
		for (var i = 0; i < parsedData.length; i++) {
			// if input is equal to first letter of firstname/lastname/firstname + lastname/lastname + firstname, store user in storeUser
			if (parsedData[i].firstname.indexOf(username) > -1 || parsedData[i].lastname.indexOf(username) > -1 || (parsedData[i].firstname + " " + parsedData[i].lastname).indexOf(username) > -1 || (parsedData[i].lastname + " " + parsedData[i].firstname).indexOf(username) > -1) {
				storeUser.push(parsedData[i])
			}
		};
		// if the postrequest doesnt contain ajax, it's the submit button and we render a new page to show results
		if (!ajax) {
			response.render('searchresult', {
				storeUser: storeUser
			})
		}
		// if the postrequest does contain ajax, it's the key-up postrequest, and we send storeUser
		else {
			response.send(storeUser)
		}
	});
});

///// Here I execute the code needed for part 2

// Listen for a get on /search-user
app.get('/add-user', function (request, response) {
	response.render("add", {
	});
});

/// Listen for a post on /add-user
app.post('/add-user', function (request, response) {
	// store request.body in a variable
	var newuser = request.body
	console.log(newuser)
	// retrieve array from users.json
	var userList = fs.readFileSync('./users.json')
	// store this in a javascript readable array
	var users = JSON.parse (userList)
	// push the new user to the array
	users.push (newuser)
	// turn the array into a string
	var userJSON = JSON.stringify (users)
	// overwrite the users.json with new string
	fs.writeFileSync ('./users.json', userJSON)
	// redirect to home page with the overview of users
	response.redirect ('/')
});



///// Here I tell the server to listen on port 3000
var server = app.listen(3000, function () {
	console.log('App listening on port: ' + server.address().port);
});




///

