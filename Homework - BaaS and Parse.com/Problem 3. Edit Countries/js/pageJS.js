$(document).ready(function(){
    var template = Handlebars.compile($('#countryTemplate').html());
    var baseUrl = 'https://api.parse.com/1/classes/';

    $('#addCountry').on('click', function(){
        //$('#countrySection').toggleClass('hide');
        if($('#countryField').val().trim().length == 0){
            alert('You need to enter a country');
        } else{
            makeRequest('POST', baseUrl + 'Country/', {name: $('#countryField').val()}, function(result){
                $('main').append(template({name: $('#countryField').val(), objectId: result.objectId}));
                $('.countryDelete').last().on('click', deleteMe);
            });
        }
    });

    makeRequest('GET', baseUrl + 'Country/', null, function(result){
        result.results.forEach(function (current) {
            $('main').append(template({name: current.name, objectId: current.objectId}));
        });

        $('.countryDelete').on('click', deleteMe);
    }, null);

    function deleteMe(event){
        makeRequest('DELETE', baseUrl + 'Country/' + $(event.target.parentNode.parentNode).attr('data-id'), null,
            function(result){
                $(event.target.parentNode.parentNode).remove();
            }, null);
    }

    function addCountry(){

    }

    function makeRequest(method, url, data, success, error){
        $.ajax({
            method: method,
            headers:{
                'X-Parse-Application-Id' : 'MCYs6zTfyozcYVTr9EB3kHFT3TtftYSwhiwrjoqf',
                'X-Parse-REST-API-Key' : 'V8BcCj4Kgg0dGdr6il03rI4T7yojvOvSoSsiTT4Z'
            },
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: success,
            error: error
        });
    }
});