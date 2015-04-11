$(document).ready(function(){
    var template = Handlebars.compile($('#countryTemplate').html());
    var baseUrl = 'https://api.parse.com/1/classes/';

    var townTemplate = Handlebars.compile($('#townTemplate').html());

    $('#addCountry').on('click', addCountry);

    makeRequest('GET', baseUrl + 'Country/', null, function(result){
        makeRequest('GET', baseUrl + 'Town/', null, function(townResults){
            result.results.forEach(function (current) {
                $('main').append(template(
                    {
                        name: current.name,
                        objectId: current.objectId
                    }));

                townResults.results.forEach(function(currentTown){
                    if(currentTown.country.objectId === current.objectId){
                        $('.townsSection').last().append(townTemplate({name : currentTown.name, objectId : currentTown.objectId}));
                    }
                });
            });

            $('.countryDelete').on('click', deleteCountry);
            $('.countryEdit').on('click', editCountry);
            $('.showTowns').on('click', showTowns);
            $('.showTowns').trigger('click');
        }, null);
    }, null);

    function deleteCountry(event){
        makeRequest('DELETE', baseUrl + 'Country/' + $(event.target.parentNode.parentNode).attr('data-id'), null,
            function(result){
                $(event.target.parentNode.parentNode).remove();
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
                $('.showTowns').last().on('click', showTowns);
                $('.showTowns').last().trigger('click');

                $('#countryField').val('');
            }, null);
        }
    }

    function showTowns(event){
        $(event.target.parentNode).next().slideToggle('normal', null);
    }

    function editCountry(event){
        if($(event.target).prev().val().trim().length == 0){
            alert('You cannot set empty string for country');
        } else{
            makeRequest('PUT', baseUrl + 'Country/' + $(event.target.parentNode.parentNode).attr('data-id'),
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