var fs = require ('fs')

var parsedData

function readFile (filename, callback) {
	fs.readFile(filename, function (error, data) {
		if (error) {
			console.log(error);
		}

		parsedData = JSON.parse(data);
    	callback(parsedData)
	});
};

module.exports.readFile = readFile