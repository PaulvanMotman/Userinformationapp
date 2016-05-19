/// First always make sure the document is loaded
$(document).ready(function () {

	/// Check if your function is working by console logging stuff
	console.log("DOM is ready")

	// Here I declare the boolean that is used by setTimeout
	var canFireRequest = true

	/// Whenever a key is entered within the #magic form:
	$('#magic').keyup(function() {

		/// parameters is assigned an object containing the values of keys that are entered
		var parameters = {users: $(this).val(), ajax: true}

		/// as soon as parameters contains values
		if (parameters.users) {
			/// and if canfirerequest is true
			if (canFireRequest) {
				/// (and afterwards emediatly set to false)
				canFireRequest = false
				/// ajax magic is happening
				$.post ('/searchresult', parameters, function (data) {
					/// dropdowns empties after text is deleted
					$('#results').empty();
					/// dropdown is filled with data 
					data.forEach(function(person){
						$('#results').append('<option>' + person.firstname + " " + person.lastname + '</option>' + '<option>' + person.lastname + " " + person.firstname + '</option>')
					})
					console.log(data)
				})
			}
			setTimeout(function() {
    			canFireRequest = true
			}, 300);
		}
	})
})