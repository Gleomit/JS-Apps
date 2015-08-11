var App = App || {};

App.views = (function () {
	var EditView = function () {
		
	}; 

	EditView.prototype.render = function(element, data){
        $(element).html(App.templateBuilder('editBook-template', data));
	};
    
    EditView.prototype.assignEvents = function(){
        
    };
    
	var CreateView = function () {
		
	}; 

	CreateView.prototype.render = function(element){
        $(element).html(App.templateBuilder('createBook-template', {}));
	};
    
    CreateView.prototype.assignEvents = function(){
        $('#addBook').on('click', function(event){
            var bookTitle = $('#bookTitle').val().trim();
            var bookAuthor = $('#bookAuthor').val().trim();
            
            if(bookTitle.length <= 0 || bookAuthor.length <= 0){
                alert("All fields are required.");
                $('form').find('input').val('');
            } else{
                var dataToPass = {bookTitle: bookTitle, bookAuthor: bookAuthor};
                App.models.BookModel.create(dataToPass);
            }
        });    
    };
    
	var ListView = function () {
		
	};
    
    ListView.prototype.assignEvents = function(){
        
    };
    
	ListView.prototype.render = function(element, data){
        $(element).html(App.templateBuilder('listBooks-template', data));
	};

	return {
		EditView: EditView,
		CreateView: CreateView,
		ListView: ListView
	};
})(); 