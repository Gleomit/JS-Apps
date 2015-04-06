$(document).ready(function(){
    if(window.localStorage != null){
        var questions,
            currentQuestion,
            currentTimerLeft,
            interval,
            i;

        var questionForm,
            answerInputs;

        questionForm = $('#questionForm');
        answerInputs = $('#questionForm').find('.answer');

        localStorage.isCompleted = localStorage.isCompleted || 'false';
        localStorage.firstTime = localStorage.firstTime || 'true';
        localStorage.atQuestion = localStorage.atQuestion || '0';
        localStorage.questions = localStorage.questions || JSON.stringify([]);
        localStorage.timerLeft = localStorage.timerLeft || '300';

        questions = JSON.parse(localStorage.questions);
        currentQuestion = parseInt(localStorage.atQuestion);
        currentTimerLeft = parseInt(localStorage.timerLeft);

        if(localStorage.isCompleted === 'true'){
            questionForm.append('<button id="resetQuiz">Restart</button>');
        } else {
            questionForm.append('<button id="submitButton">Submit</button>');

            interval = setInterval(function(){
                currentTimerLeft -= 1;

                if(currentTimerLeft <= 0) {
                    clearInterval(interval);
                    currentTimerLeft = 0;

                    localStorage.isCompleted = 'true';
                    localStorage.questions = JSON.stringify(questions);
                    localStorage.timerLeft = currentTimerLeft;
                }

                $('#timeShow').text(Math.floor(currentTimerLeft / 60) + ':' + ((currentTimerLeft - Math.floor(currentTimerLeft / 60)) % 59 + 1));
            }, 1000);

            if(localStorage.firstTime === 'true'){
                localStorage.questions = JSON.stringify(loadSampleQuestions());
                questions = JSON.parse(localStorage.questions);
                localStorage.firstTime = 'false';
            }

            updateHTMLElements();

            $(window).on('unload', function(){
                localStorage.atQuestion = currentQuestion;
                localStorage.questions = JSON.stringify(questions);
                localStorage.timerLeft = currentTimerLeft;

                clearInterval(interval);
            });

            $('#previous').on('click', function(){
                checkForSelectedAnswer();
                currentQuestion -= 1;

                if(currentQuestion < 0){
                    currentQuestion = 0;
                } else{
                    onQuestionChange();
                }
            });

            $('#next').on('click', function(){
                checkForSelectedAnswer();

                currentQuestion += 1;

                if(currentQuestion > questions.length - 1){
                    currentQuestion = questions.length - 1;
                } else{
                    onQuestionChange();
                }
            });

            $('#submitButton').on('click', function(){
                checkForSelectedAnswer();

                localStorage.atQuestion = currentQuestion;
                localStorage.questions = JSON.stringify(questions);
                localStorage.timerLeft = currentTimerLeft;
                localStorage.isCompleted = 'true';
            });
        }

        $('main').append('<button id="clearLocalStorage" form="questionForm">Clear Local Storage</button>');
        $('#clearLocalStorage').on('click', clearLocalStorageVariables);

        function loadSampleQuestions(){
            var tempQuestions = [];

            tempQuestions.push(new Question('\'.MOV\' extension refers usually to what kind of file?',
                ['Image file', 'Animation/movie file', 'Audio file', 'MS Office document'], 1));
            tempQuestions.push(new Question('\'OS\' computer abbreviation usually means ?',
                ['Order of Significance', 'Open Software', 'Operating System', 'Optical Sensor'], 2));
            tempQuestions.push(new Question('\'.JPG\' extension refers usually to what kind of file?',
                ['System file', 'Animation/movie file', 'MS Encarta document', 'Image file'], 3));
            tempQuestions.push(new Question('What is the term to ask the computer to put information in order numerically or alphabetically?',
                ['Crop', 'Report', 'Record', 'Sort'], 3));

            return tempQuestions;
        }

        function checkForSelectedAnswer() {
            var selectedAnswer = -1;

            for(i = 0; i < 4; i += 1){
                if(answerInputs[i].checked == true){
                    selectedAnswer = i;
                    break;
                }
            }

            if(selectedAnswer > -1){
                questions[currentQuestion].isAnswered = true;
                questions[currentQuestion].choosenAnswer = questions[currentQuestion].possibleAnswers[selectedAnswer];
            }
        }

        function onQuestionChange(){
            if(currentQuestion <= questions.length - 1 && currentQuestion >= 0){

                $('#question').fadeToggle();

                setTimeout(function(){
                    updateHTMLElements();
                }, 300);

                $('#question').fadeToggle();
            }
        }

        function updateHTMLElements(){
            answerInputs.attr('checked', false);

            $('#theQuestion').text(questions[currentQuestion].question);

            for(i = 0; i < 4; i += 1){
                $(answerInputs[i]).next().text(questions[currentQuestion].possibleAnswers[i]);
            }

            if(questions[currentQuestion].isAnswered == true){
                answerInputs[questions[currentQuestion].possibleAnswers.indexOf(questions[currentQuestion].choosenAnswer)].checked = true;
            }
        }

        function clearLocalStorageVariables(){
            localStorage.removeItem('atQuestion');
            localStorage.removeItem('firstTime');
            localStorage.removeItem('isCompleted');
            localStorage.removeItem('questions');
            localStorage.removeItem('timerLeft');
        }
    } else {
        $('main').append('<h1>You\'ve disable localStorage in your browser.</h1>');
    }
});