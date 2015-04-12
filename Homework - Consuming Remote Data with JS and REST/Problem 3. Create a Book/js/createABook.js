$(document).ready(function(){
    var baseUrl = 'https://api.parse.com/1/classes/';
    var bookISBNS = [];
    var main = $('main');

    makeRequest('GET', baseUrl + "Book/", null, function(result){
        result.results.forEach(function(currentBook){
            main.prepend(getBookHTML(currentBook.title, currentBook.author, currentBook.isbn));
            bookISBNS.push(currentBook.isbn);
        });

        main.find('.showInfo').on('click', showInfo);
        main.find('.showInfo').trigger('click');
    }, null);

    $('#addBook').on('click', addBook);

    function showInfo(event){
        $(event.target).next().slideToggle('fast', null);
    }

    function addBook(){
        var bookTitle = $('#bookTitle').val().trim();
        var bookAuthor = $('#bookAuthor').val().trim();

        if(bookTitle.length == 0 || bookAuthor.length == 0){
            alert('You left one of the fields empty.');
        } else{
            var uniqueISBN = generateISBN();

            while(bookISBNS.indexOf(uniqueISBN) > -1){
                uniqueISBN = generateISBN();
            }

            makeRequest('POST', baseUrl + 'Book/',
                {
                    title: bookTitle,
                    author: bookAuthor,
                    isbn: uniqueISBN
                }, function(result){
                    bookISBNS.push(uniqueISBN);

                    $('main').prepend(getBookHTML(bookTitle, bookAuthor, uniqueISBN));
                    $('#bookTitle').val('');
                    $('#bookAuthor').val('');

                    main.find('.showInfo').first().on('click', showInfo);
                    main.find('.showInfo').first().trigger('click');
                }, null);
        }
    }

    function getBookHTML(title, author, isbn){
        var htmlToAppend = '<div class="book"><h1 class="showInfo">'
            + title + '</h1>'
            + '<section class="infoToShow">'
            + '<h3>Author: ' + author + '</h3>'
            + '<h3>ISBN: ' + isbn + '</h3>'
            + '</section></div>';

        return htmlToAppend;
    }

    function generateISBN(){
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

    function makeRequest(method, url, data, success, error){
        $.ajax({
            method: method,
            headers:{
                'X-Parse-Application-Id' : '9aWvS8y2dSQ6QOwHG6I1bqCmYWJltpMlcXFY7sbo',
                'X-Parse-REST-API-Key' : 'iEi0GmpDXhGYIP6ehczN1eyVwGTHklPcYC98D5VW'
            },
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: success,
            error: error
        });
    }
});