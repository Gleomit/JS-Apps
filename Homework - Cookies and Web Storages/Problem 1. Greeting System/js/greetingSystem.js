$(document).ready(function(){
    if(window.localStorage != null) {
        window.localStorage.totalVisits = window.localStorage.totalVisits || 0;
        window.sessionStorage.sessionVisits = window.sessionStorage.sessionVisits || 0;

        if (window.localStorage.totalVisits == 0) {
            $('main').append('<form>' +
            '<label for="name">Name: </label>' +
            '<input type="text" id="name" />' +
            '<section><button>Save Name</button></section>' +
            ' </form>');

            $('button').on('click', function () {
                window.localStorage.name = $('#name').val();
                window.localStorage.totalVisits = parseInt(window.localStorage.totalVisits) + 1;
                window.sessionStorage.sessionVisits = parseInt(window.sessionStorage.sessionVisits) + 1;
            });
        } else {
            $('main').append('<h1>Hi ' + window.localStorage.name + '</h1>')
                .append('<h2>Session visits: ' + window.sessionStorage.sessionVisits + '</h2>')
                .append('<h2>Total visits: ' + window.localStorage.totalVisits + '</h2>')
                .append('<form><section><button>Clear Local and Session Storage</button></section></form>');

            window.localStorage.totalVisits = parseInt(window.localStorage.totalVisits) + 1;
            window.sessionStorage.sessionVisits = parseInt(window.sessionStorage.sessionVisits) + 1;

            $('button').on('click', function () {
                window.localStorage.removeItem('name');
                window.localStorage.removeItem('totalVisits');
                window.sessionStorage.removeItem('sessionVisits');
            });
        }
    } else{
        $('main').append('<h1>You\'ve disabled localStorage on your browser.</h1>');
    }
});