$(document).ready(function(){
    var baseUrl = 'https://api.parse.com/1/classes/';
    var bookISBNS = [];
    var main = $('main');

    var tabIndex = 0;

    makeRequest('GET', baseUrl + "Book/", null, function(result){
        result.results.forEach(function(currentBook){
            main.prepend(getBookHTML(currentBook.objectId, currentBook.title, currentBook.author, currentBook.isbn));
            bookISBNS.push(currentBook.isbn);

            $('.book').on('click', showForm);
            $('.deleteBook').on('click', deleteBook);
        });
    }, null);

    $('#addBook').on('click', addBook);
    $('#saveBook').on('click', saveBook);

    function addBook(){
        var bookTitle = $('#bookTitle').val().trim();
        var bookAuthor = $('#bookAuthor').val().trim();
        var tags = [];

        if(bookTitle.length == 0 || bookAuthor.length == 0){
            alert('You left one of the fields empty.');
        } else{
            var uniqueISBN = generateISBN();

            while(bookISBNS.indexOf(uniqueISBN) > -1){
                uniqueISBN = generateISBN();
            }

            $('#addTags input').each(function(){
               if(this.value.trim().length > 0){
                   tags.push(this.value.trim());
               }
            });

            makeRequest('POST', baseUrl + 'Book/',
                {
                    title: bookTitle,
                    author: bookAuthor,
                    isbn: uniqueISBN,
                    tags: tags
                }, function(result){
                    bookISBNS.push(uniqueISBN);

                    $('main').prepend(getBookHTML(result.objectId, bookTitle, bookAuthor, uniqueISBN));
                    $('#bookTitle').val('');
                    $('#bookAuthor').val('');
                    $('#addTags').html('');
                    $('.book').first().on('click', showForm);
                    $('.deleteBook').first().on('click', deleteBook);
                }, null);
        }
    }

    function showForm(event){
        makeRequest('GET', baseUrl + 'Book/' + $(event.target).parents('.book').last().attr('data-id'), null, function(result){
            $('#editTags').html('');
            $('#editForm').attr('data-id', result.objectId);
            $('#editBookTitle').val(result.title);
            $('#editBookAuthor').val(result.author);
            $('#editBookISBN').val(result.isbn);

            result.tags.forEach(function(tag){
                $('#editTags').append('<section><input type="text" value="' + tag + '"/><button type="button" class="button red deleteTag">Remove</button></section>');
                $('#editTags').find('button').last().on('click', deleteTagField);
            });

        }, null);
    }

    function deleteBook(event){
        var selectedBook = $(event.target).parents('.book').last().attr('data-id');

        makeRequest('DELETE', baseUrl + 'Book/' + selectedBook, null, function(result){
            $(event.target).parents('.book').last().remove();

            $('#editForm').removeAttr('data-id');
            $('#editBookTitle').val('');
            $('#editBookAuthor').val('');
            $('#editBookISBN').val('');
            $('#editTags').html('');
        }, null);
    }

    function saveBook(){
        if($('#editForm').attr('data-id') == undefined){
            alert('You must select a book first.');
        } else{
            var bookTitle = $('#editBookTitle').val().trim();
            var bookAuthor = $('#editBookAuthor').val().trim();
            var bookISBN = $('#editBookISBN').val().trim();
            var selectedBook = $('#editForm').attr('data-id');
            var tags = [];

            if(bookTitle.length == 0 || bookAuthor.length == 0 || bookISBN.length == 0){
                alert('One of the fields is empty');

                var theBook = $(".book[data-id=" + selectedBook + "]");
                $('#editBookTitle').val(theBook.find('h2').first().text());
                $('#editBookAuthor').val(theBook.find('h2').first().next().text().substring(8));
                $('#editBookISBN').val(theBook.find('h2').last().text().substring(6));
            } else{
                $('#editTags input').each(function(){
                    if(this.value.trim().length > 0){
                        tags.push(this.value.trim());
                    }
                });

                makeRequest('PUT', baseUrl + 'Book/' + selectedBook,
                    {
                        title: bookTitle,
                        author: bookAuthor,
                        isbn: bookISBN,
                        tags: tags
                    }, function(result){
                        var theBook = $(".book[data-id=" + selectedBook + "]");

                        theBook.find('h2').first().text('Title: ' + bookTitle);
                        theBook.find('h2').first().next().text('Author: ' + bookAuthor);
                        theBook.find('h2').last().text('ISBN: ' + bookISBN);

                        $('#editForm').removeAttr('data-id');

                        $('#editBookTitle').val('');
                        $('#editBookAuthor').val('');
                        $('#editBookISBN').val('');
                        $('#editTags').html('');
                    }, null);
            }
        }
    }

    function getBookHTML(objectId, title, author, isbn){
        var htmlToAppend = '<div class="book" data-id="' + objectId + '" tabindex="' + tabIndex + '"><section><h2 class="showInfo">Title: '
            + title + '</h2>'
            + '<h2>Author: ' + author + '</h2>'
            + '<h2>ISBN: ' + isbn + '</h2></section>'
            + '<section><button type="button" class="button deleteBook">Delete</button></section>'
            + '</div>';

        tabIndex++;
        return htmlToAppend;
    }

    $('#addTag').on('click', function () {
       $('#addTags').append('<section><input type="text" /><button type="button" class="button red deleteTag">Remove</button></section>');
        $('#addTags').find('button').last().on('click', deleteTagField);
    });

    $('#editTag').on('click', function () {
        $('#editTags').append('<section><input type="text" /><button type="button" class="button red deleteTag">Remove</button></section>');
        $('#editTags').find('button').last().on('click', deleteTagField);
    });

    function deleteTagField(event){
        $(event.target.parentNode).remove();
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