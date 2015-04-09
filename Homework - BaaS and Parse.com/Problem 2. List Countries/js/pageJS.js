(function(){
    Parse.initialize('MCYs6zTfyozcYVTr9EB3kHFT3TtftYSwhiwrjoqf', 'kQVxLosZatryKT5kYX05kAe1haoLS17iaSGrPzfl');
    
    var Country = Parse.Object.extend('Country');
    var Town = Parse.Object.extend('Town');

    var country = new Country();

    var query = new Parse.Query(Country);
    query.find({
        success: function(result){
            var queryTown = new Parse.Query(Town);

            for(i = 0; i < result.length; i += 1){
                console.log(result[i].get('name') + "   " + queryTown.equalTo('country', result[i]).get('name'));
            }
        }
    });
    console.log();
})();

