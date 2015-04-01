$(document).ready(function () {
    var headerOne = $('h1').first();
    headerOne.before("<h2>Before Element</h2>");
    headerOne.after("<h3>After Element</h3>");
});