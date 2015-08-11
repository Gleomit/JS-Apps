var App = App || {};

App.models = (function () {
	var BookModel = {
		create: function(dataToSave){
            return App.Requester.postRequest(App.baseUrl + 'Book', dataToSave);
        },
        edit: function(objectId, dataToUpdate){
            return App.Requester.putRequest(App.baseUrl + 'Book/' + objectId, dataToUpdate);
        },
        getAll: function(){
            return App.Requester.getRequest(App.baseUrl + 'Book/');
        },
        deleteById: function(bookId){
            return App.Requester.deleteRequest(App.baseUrl + '/Book');
        }
	}; 

	return {
		BookModel: BookModel
	};
})(); 