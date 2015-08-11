var App = App || {};

App.templateBuilder = function(templateName, data){
	var template = Handlebars.compile($('#' + templateName).html());
	return template(data);
};

App.controllers = (function () {
	var BookController = {
		showAll: function(){
            var listView = new App.views.ListView();
            
            listView.render('main');
            listView.assignEvents();
		},
		showEdit: function(objectId){
            var editView = new App.views.EditView();
            
            editView.render('main');
            editView.assignEvents();
		},
		showCreate: function(){
            var createView = new App.views.CreateView();
            
            createView.render('main');
            createView.assignEvents();
		},
        generateISBN: function(){
            var i = 0;
            var isbn = "";

            for(i = 0; i < 13; i += 1){
                if(i == 0){
                    isbn += Math.floor((Math.random() * 9) + 1).toString()
                } else{
                    isbn += Math.floor((Math.random() * 9) + 0).toString();
                }
            }

            return isbn;
        }
	}; 

	return {
		BookController: BookController
	};
})(); 