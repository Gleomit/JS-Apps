$(window).ready(function() {

    var intervalTime = 5000;
    var currentPosition = 0;
    var slideWidth = parseFloat($('#slidesContainer').css('width'));
    var slides = $('.slide');
    var numberOfSlides = slides.length;
    var autoInterval;
    $('#slidesContainer').css('overflow', 'hidden');

    slides
        .wrapAll('<div id="slideInner"></div>')
        .css({
            'float' : 'left',
            'width' : slideWidth
        });

    $('#slideInner').css('width', slideWidth * numberOfSlides);
    $('#slideshow')
        .prepend('<span class="control" id="leftControl">Move left</span>')
        .append('<span class="control" id="rightControl">Move right</span>');

    manageControls(currentPosition);

    autoInterval = setInterval(onInterval, intervalTime);

    $('.control')
        .on('click', function(){
            clearInterval(autoInterval);

            currentPosition = ($(this).attr('id') == 'rightControl')
                ? currentPosition + 1 : currentPosition - 1;

            manageControls(currentPosition);

            $('#slideInner').animate({
                'marginLeft' : slideWidth * (-currentPosition)
            });

            autoInterval = setInterval(onInterval, intervalTime);
        });

    function manageControls(position){
        if(position == 0){
            $('#leftControl').hide()
        } else{
            $('#leftControl').show()
        }

        if(position == numberOfSlides - 1){
            $('#rightControl').hide()
        } else{
            $('#rightControl').show()
        }
    }

    function onInterval(){
        currentPosition += 1;

        if(currentPosition == numberOfSlides){
            currentPosition = 0;
        }

        manageControls(currentPosition);

        $('#slideInner').animate({
            'marginLeft' : slideWidth * (-currentPosition)
        });
    }
});

