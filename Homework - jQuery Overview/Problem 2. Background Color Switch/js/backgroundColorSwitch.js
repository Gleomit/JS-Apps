$(document).ready(function () {
    $('#paint').on('click', function () {
        var classElements = $('.' + $('#class').val());
        classElements.css('background-color', $('#color').val());
        $('#class').val('');
    });
});