var App = App || {};

App.templateBuilder = function(templateName, data){
	var template = Handlerbars.compile($('#' + templateName).html());
	return template(data);
};

App.controllers = (function () {
	var BookController = {
		showAll: function(){

		},
		showEdit: function(objectId){

		},
		showCreate: function(objectId){

		}
	}; 

	return {
		BookController: BookController
	};
})(); 