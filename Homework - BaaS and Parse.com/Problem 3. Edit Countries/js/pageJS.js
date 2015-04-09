$(document).ready(function(){

    $('#addCountry').on('click', function(){
        $('#countrySection').toggleClass('hide');
    });

    Parse.initialize('MCYs6zTfyozcYVTr9EB3kHFT3TtftYSwhiwrjoqf', 'kQVxLosZatryKT5kYX05kAe1haoLS17iaSGrPzfl');

    var Country = Parse.Object.extend('Country');
    var Town = Parse.Object.extend('Town');

    var countries = [];

    var source   = $("#countryTemplate").html();
    var template = Handlebars.compile(source);

    var query = new Parse.Query(Country);

    query.find({
        success: function(result){
            var list = [];

            result.forEach(function(country){
                list.push({name: country.get('name'), objectId: country.id});
            });

            var context = {countries: list};
            var html    = template(context);
            $('#Countries').append(html);
        }
    });

    console.log($('#Countries').find('div'));
    //$('#Countries').find('div').forEach(function(country){
    //    alert(country);
    //});
});