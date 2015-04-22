$(document).ready(function(){
	$.ajax({
		headers: {
			'X-Parse-Application-Id' : 'HYnQ9Wod0hcKdzAYsNtguMj9SQIoCjq0ZdprzEU6',
			'X-Parse-REST-API-Key': 'YG1uFHxN9ZkIBCEZgbllk9loeDMLBZKkuI2FYsIx'
		},
		method: 'GET',
		url: 'https://api.parse.com/1/classes/Template'
	}).then(function(result){
		var info = JSON.parse(JSON.stringify(result.results));

		var template = Handlebars.compile($('#rows-template').html());

		$('tbody').html(template({rows : info}));
	});
});