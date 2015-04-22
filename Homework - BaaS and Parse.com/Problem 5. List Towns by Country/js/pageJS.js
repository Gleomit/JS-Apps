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
            $('.townAdd').on('click', addTown);
            $('.showTowns').trigger('click');
            $('.townDelete').on('click', deleteTown);
            $('.townEdit').on('click', editTown);
        }, null);
    }, null);

    function deleteCountry(event){
        makeRequest('DELETE', baseUrl + 'Country/' + $(event.target).parents('.country').last().attr('data-id'), null,
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
                $('.townAdd').last().on('click', addTown);

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
            makeRequest('PUT', baseUrl + 'Country/' + $(event.target).parents('.country').last().attr('data-id'),
                {name : $(event.target).prev().val()}, function(result){
                    $(event.target.parentNode).prev().text($(event.target).prev().val());
                    $(event.target).prev().val('');
                }, null);
        }
    }

    function addTown(event){
        if($(event.target).prev().val().trim().length == 0){
            alert('You add town with empty string as a name');
        } else{
            makeRequest('POST', baseUrl + 'Town/',
                {
                    name : $(event.target).prev().val(),
                    country: {
                        __type : 'Pointer',
                        className: 'Country',
                        objectId : $(event.target).parents('.country').last().attr('data-id')
                    }

                }, function(result){
                makeRequest('PUT', baseUrl + 'Country/' + $(event.target).parents('.country').last().attr('data-id'),
                    {
                        towns : {
                            __op: "AddRelation",
                            objects: [{
                                __type: "Pointer",
                                className: "Town",
                                objectId: result.objectId
                            }]
                        }
                    },
                    function(result){
                    }, null);
                    $(event.target.parentNode).append(townTemplate({name : $(event.target).prev().val(), objectId: result.objectId}));
                    $(event.target).prev().val('');

                    $('.townDelete').last().on('click', deleteTown);
                    $('.townEdit').last().on('click', editTown);
            }, null);


        }
    }

    function editTown(event){
        if($(event.target).prev().val().trim().length == 0){
            alert('You cannot set empty string for town');
        } else{
            makeRequest('PUT', baseUrl + 'Town/' + $(event.target).parents('.town').last().attr('data-id'),
                {name : $(event.target).prev().val()}, function(result){
                    $(event.target.parentNode).prev().text($(event.target).prev().val());
                    $(event.target).prev().val('');
                }, null);
        }
    }

    function deleteTown(event){
        makeRequest('DELETE', baseUrl + 'Town/' + $(event.target).parents('.town').last().attr('data-id'), null,
            function(result){
              $(event.target).parents('.town').last().remove();
            }, null);
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
