$(document).ready(function(){
	var app = {};

	app.showHello = function(name){
		$('main').html('<h2>Hello, ' + name.toString() + '</h2>');
	}

	app.router = new Sammy(function(){
		this.get('#/', function(){
			$('main').html('<h2>Home</h2>');
		});

		this.get('#/:name', function(){
			app.showHello(this.params['name']);
		});
	});

	app.router.run('#/');
});