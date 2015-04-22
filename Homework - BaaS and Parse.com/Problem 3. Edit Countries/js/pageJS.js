$(document).ready(function(){
    var template = Handlebars.compile($('#countryTemplate').html());
    var baseUrl = 'https://api.parse.com/1/classes/';

    $('#addCountry').on('click', addCountry);

    makeRequest('GET', baseUrl + 'Country/', null, function(result){
        result.results.forEach(function (current) {
            $('main').append(template({name: current.name, objectId: current.objectId}));
        });

        $('.countryDelete').on('click', deleteCountry);
        $('.countryEdit').on('click', editCountry);
    }, null);

    function deleteCountry(event){
        makeRequest('DELETE', baseUrl + 'Country/' + $(event.target).parents('.country').last().attr('data-id'), null,
            function(result){
              $(event.target).parents('.country').last().remove();
            }, null);
    }

    function addCountry(){
        if($('#countryField').val().trim().length == 0){
            alert('You need to enter a country');
        } else{
            makeRequest('POST', baseUrl + 'Country/', {name: $('#countryField').val()}, function(result){
                $('main').append(template({name: $('#countryField').val(), objectId: result.objectId}));
                $('.countryDelete').last().on('click', deleteCountry);
                $('.countryEdit').last().on('click', editCountry);
            });
        }
    }

    function editCountry(event){
        if($(event.target).prev().val().trim().length == 0){
            alert('You cannot set empty string for country');
        } else{
            makeRequest('PUT', baseUrl + 'Country/' + $(event.target).parents('.country').last().attr('data-id'),
                {name : $(event.target).prev().val()}, function(result){
                    $(event.target.parentNode).prev().text($(event.target).prev().val());
                    $(event.target).prev().val('');
            }, null);
        }
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
