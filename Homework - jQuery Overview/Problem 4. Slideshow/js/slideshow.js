$(window).ready(function() {

    var currentSlide = 0;
    var allSlides = $('.slide');

    $('#slides-wrapper').width(allSlides.length * window.outerWidth);

    setFramePosition(currentSlide);

    $('.nextSlide').click(function(){
        currentSlide += 1;

        if(currentSlide >= allSlides){
            currentSlide = 0;
        }

        setFramePosition(currentSlide);
    });

    $('.previousSlide').click(function(){
        currentSlide -= 1;

        if(currentSlide < 0){
            currentSlide = allSlides.length - 1;
        }

        setFramePosition(currentSlide);
    });

});

//calculate the slideshow frame position and animate it to the new position
function setFramePosition(pos){

    //calculate position
    var px = window.outerWidth * pos * - 1;
    //set ul left position
    $('#slideshow .slide').animate({
        left: px
    }, 300);
}