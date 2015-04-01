$(document).ready(function () {
    var carsFromJSON = JSON.parse("[{\"manufacturer\":\"BMW\",\"model\":\"E92 320i\",\"year\":2011,\"price\":50000,\"class\":\"Family\"},{\"manufacturer\":\"Porsche\",\"model\":\"Panamera\",\"year\":2012,\"price\":100000,\"class\":\"Sport\"}, {\"manufacturer\":\"Peugeot\",\"model\":\"305\",\"year\":1978,\"price\":1000,\"class\":\"Family\"}]");
    var tableHead,
        tableBody;
    var i = 0;
    $('main').append('<table><thead><tr></tr></thead><tbody></tbody></table>');

    tableHead = $('thead').find('tr');
    tableBody = $('tbody');

    for(var prop in carsFromJSON[i]){
        tableHead.append('<td>' + prop.toString()[0].toUpperCase() + prop.toString().substring(1) + '</td>');
    }

    for(i = 0; i < carsFromJSON.length; i += 1){
        var toAppend = '<tr>';

        for(var prop in carsFromJSON[i]){
            toAppend += '<td>' + carsFromJSON[i][prop.toString()] + '</td>';
        }

        toAppend += '</tr>';
        tableBody.append(toAppend);
    }
});