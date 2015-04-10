$(document).ready(function(){
    var template = Handlebars.compile($('#countryTemplate').html());

    $.ajax({
        url: 'https://api.parse.com/1/classes/Country/',
        headers: {
            'X-Parse-Application-Id' : 'MCYs6zTfyozcYVTr9EB3kHFT3TtftYSwhiwrjoqf',
            'X-Parse-REST-API-Key' : 'V8BcCj4Kgg0dGdr6il03rI4T7yojvOvSoSsiTT4Z'
        },
        type: 'GET',
        success: function(result){
            result.results.forEach(function (current) {
               $('main').append(template({country: current.name}));
            });
        }
    });
});