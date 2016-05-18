$(document).ready(function () {
	console.log("DOM is ready")
	$('#magic').keyup( function() {
		var parameters = {users: $(this).val(), ajax: true}

		if (parameters.users) {
			$.post ('/searchresult', parameters, function (data) {
				$('#results').empty();
				data.forEach(function(person){
					$('#results').append('<option>' + person.firstname + " " + person.lastname + '</option>' + '<option>' + person.lastname + " " + person.firstname + '</option>')
				})
				console.log(data)
			})
		}
	})
})