var App = App || {};

$(document).ready(function(){

    App.router = new Sammy(function(){
        this.get('#/', function(){
            App.controllers.BookController.showAll();
        });

        this.get('#/book/:objectId/edit', function(){
            App.controllers.BookController.showEdit(this.params['objectId']);
        });

        this.get('#/book/create', App.controllers.BookController.showCreate);
    });

    App.router.run('#/');
});