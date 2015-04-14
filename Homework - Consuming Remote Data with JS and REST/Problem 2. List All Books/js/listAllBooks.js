$(document).ready(function(){
    var baseUrl = 'https://api.parse.com/1/classes/';

    makeRequest('GET', baseUrl + "Book/", null, function(result){
        var main = $('main');
        result.results.forEach(function(currentBook){
            var htmlToAppend = '<div class="book"><h1 class="showInfo">'
                + currentBook.title + '</h1>'
                + '<section class="infoToShow">'
                + '<h3>Author: ' + currentBook.author + '</h3>'
                + '<h3>ISBN: ' + currentBook.isbn + '</h3>'
                + '</section></div>';

            main.prepend(htmlToAppend);
        });

        main.find('.showInfo').on('click', showInfo);
        main.find('.showInfo').trigger('click');
    }, null);

    function showInfo(event){
        $(event.target).next().slideToggle('fast', null);
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