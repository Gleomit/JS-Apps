$(document).ready(function(){
    var questions = [];
    questions.push(new Question('\'.MOV\' extension refers usually to what kind of file?',
        ['Image file', 'Animation/movie file', 'Audio file', 'MS Office document'], 2));
    questions.push(new Question('\'OS\' computer abbreviation usually means ?',
        ['Order of Significance', 'Open Software', 'Operating System', 'Optical Sensor'], 'Operating System'));
    questions.push(new Question('\'.MOV\' extension refers usually to what kind of file?',
        ['Image file', 'Animation/movie file', 'Audio file', 'MS Office document'], 2));
    //console.log(JSON.parse(localStorage.getItem('question')));
});