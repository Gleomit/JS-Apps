$(document).ready(function(){
	var booksCollection = [{"book":"The Grapes of Wrath","author":"John Steinbeck","price":"34,24","language":"French"},
						{"book":"The Great Gatsby","author":"F. Scott Fitzgerald","price":"39,26","language":"English"},
						{"book":"Nineteen Eighty-Four","author":"George Orwell","price":"15,39","language":"English"},
						{"book":"Ulysses","author":"James Joyce","price":"23,26","language":"German"},
						{"book":"Lolita","author":"Vladimir Nabokov","price":"14,19","language":"German"},
						{"book":"Catch-22","author":"Joseph Heller","price":"47,89","language":"German"},
						{"book":"The Catcher in the Rye","author":"J. D. Salinger","price":"25,16","language":"English"},
						{"book":"Beloved","author":"Toni Morrison","price":"48,61","language":"French"},
						{"book":"Of Mice and Men","author":"John Steinbeck","price":"29,81","language":"Bulgarian"},
						{"book":"Animal Farm","author":"George Orwell","price":"38,42","language":"English"},
						{"book":"Finnegans Wake","author":"James Joyce","price":"29,59","language":"English"},
						{"book":"The Grapes of Wrath","author":"John Steinbeck","price":"42,94","language":"English"}]

	// Group all books by language and sort them by author (if two books have the same author, sort by price)
	console.log('Group all books by language and sort them by author (if two books have the same author, sort by price):');

	var grouped = _.groupBy(booksCollection, 'language');

	for(var language in grouped){
		console.log('Language - ' + language);

		_.chain(grouped[language]).sortBy('price').sortBy('author').value()
		.forEach(function(language){
			console.log(language);
		});
	}


	//Get the average book price for each author
	console.log('Get the average book price for each author:');
	var grouped = _.groupBy(booksCollection, 'author');
	for(var author in grouped){
		var sum = 0;

		grouped[author].forEach(function(book){
			sum += parseFloat(book.price);
		});

		console.log('Average book price for ' + author + ' = ' + sum / grouped[author].length);
	}
	

	//Get all books in English or German, with price below 30.00, and group them by author
	console.log('Get all books in English or German, with price below 30.00, and group them by author:');

	var grouped = _.groupBy(_.filter(booksCollection, function(book){
		return ((book.language === "English" || book.language === "German") && parseFloat(book.price) < 30);
	}), 'author');

	for(var author in grouped){
		console.log('Author - ' + author + ':');

		grouped[author].forEach(function(currentAuthor){
			console.log(currentAuthor);
		});

		console.log('\n');
	}
});