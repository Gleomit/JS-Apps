(function(){
    function Question(question, answersArray, theRightAnswer){
        this.question = question;
        this.isAnswered = false;
        this.choosenAnswer = "";
        this.possibleAnswers = answersArray;
        this.rightAnswer = this.possibleAnswers[theRightAnswer];
    }

    return Question;
});