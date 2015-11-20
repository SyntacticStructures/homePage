 var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

$(document).ready(function(){
    if( !isMobile.any() ){
        $.stellar({
           horizontalScrolling: false,
           verticalScrolling: true

        });
    }
    $(".contact").hover(function(){
        console.log("hovering")
        $(this).css("color","lightgrey")
    }, function(){
        $(this).css("color", "white")
    })
    var leftRight = true
    $(document).keydown(function(e) {
    switch(e.which) {
        case 37:
        if (leftRight == false) {
            $('#prev').click();
            leftRight = true;
        }
        break;

    
        case 39: // right
        if (leftRight == true) {
            $('#next').click();
            leftRight = false;
        }
        break;


        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
    $('.banner').unslider({
        // autoplay: true
        keys:false
    });
    $('#next').on("click", function(){
        $('ol li:nth-child(2)').click()
        $('#next').fadeOut()
        $('#prev').fadeOut()
        $('#prev').fadeIn()
        leftRight = false;
    })
    $('#prev').on("click", function(){
        $('ol li:nth-child(1)').click()
        $('#prev').fadeOut()
        $('#next').fadeOut()
        $('#next').fadeIn()
        leftRight = true;
    })
    function scrollToElement(elem, animationDuration, offset, completionHandler) {
        $('html, body').animate({
            scrollTop: $(elem).offset().top + offset
        }, {duration: animationDuration, complete: completionHandler });
    }
    $('#mePic').click(function() {
        scrollToElement('#content2', 1000, -220, null);
    })
    $('#iOS').click(function() {
        scrollToElement('#content3', 1000, -110, null);
    })
    $('#webPic').click(function() {
        scrollToElement('#content4', 1000, -110, function() {
            $('#webPic').css("opacity", 1)
        });
        
    })
      // This is not pretty. Don't keep it!!!!
      scrollToElement("#content1", 700, 0);
    $('#busIcon').hover(function(){
        $('#busIcon').css("opacity", 1);
    }, function() {
        $('#busIcon').css("opacity", 0.5)
    })
  })
 document.getScroll= function(){
    if(window.pageYOffset!= undefined){
      return [pageXOffset, pageYOffset];
    } else {
      var sx, sy, d= document, r= d.documentElement, b= d.body;
      sx= r.scrollLeft || b.scrollLeft || 0;
      sy= r.scrollTop || b.scrollTop || 0;
      return [sx, sy];
    }
  }
  var prevVal = 0;
  var isFaded = false;
  var iOSTotalPosition = 392;
  var totalPosition = 0;
  var webPicTotalTransformation = 0;
  var iOSPicTotalTransformation = 0;
  var opacity = 1;
    $(document).on("scroll",function() {
        var scroll = document.getScroll();
        if (scroll[1] > 1580) {
            $("#appVideo")[0].play();
        }
        console.log(prevVal-scroll[1], "difference");
        var difference = prevVal-scroll[1];
        // this will move any element in one of 4 2d directions.
        var transform = function(elem, direction, speed) {
            var diff = webPicTotalTransformation - difference;
            if (totalPosition < 300) {
                changeOpacity($('#webPic'), 300, 600, 1000);
                webPicTotalTransformation = 0;
                iOSPicTotalTransformation = 0;
                elem.css("transform", "translateX(0px)");
            } else if (totalPosition >= 300 && totalPosition <= 832) {
                changeOpacity($('#webPic'), 300, 600, 1000);
                
                if (direction == "-") {
                    elem.css("transform", "translateX(" + direction + webPicTotalTransformation/speed + "px)");
                } else if (direction == "") {
                    elem.css("transform", "translateX(" + direction + webPicTotalTransformation/speed + "px)");
                }
                webPicTotalTransformation -= difference;
                iOSPicTotalTransformation -= difference;
            } else if (totalPosition > 832 && totalPosition <= 1116) {
                // changeOpacity($('#webPic'), 300, 1000, 1000);
                console.log("webPicTotalTransformation", webPicTotalTransformation)
                 if (direction == "") {
                    // it keeps going into the negative, so we will catch it
                    if (webPicTotalTransformation/speed <= 0) {
                        webPicTotalTransformation = 0;
                        elem.css("transform", "translateX(0px)");
                    } else {
                        elem.css("transform", "translateX(" + webPicTotalTransformation/speed + "px)");
                        webPicTotalTransformation += difference;
                    }
                } else {
                    // quick fix
                    elem.css("transform", "translateX(-" + iOSPicTotalTransformation/speed + "px)");
                    iOSPicTotalTransformation += difference;  
                }
            } 
        }
        if(scroll[1] >= 1590 && scroll[1]) {
            var newOpacity = parseFloat($('#webPic').css("opacity")) + .0095555555
            $('#webPic').css("opacity", newOpacity)
        } else if (scroll[1] < 1590 && scroll[1] > 1126) {
            var currentOpacity = parseFloat($('#webPic').css("opacity")) - .0095
            console.log("lksjgoioihgroihgoirgh", currentOpacity);
            $('#webPic').css("opacity", newOpacity)
        }

        var changeOpacity = function(elem, boundOne, boundTwo, rateOfChange) {
            // base this directly off total position, since it seems to be the only accurate measure we can get
            var newOpacity = 1
            if (totalPosition < boundOne) {
                newOpacity = 1
                // if current scroll is in bounds
            } else if (totalPosition >= boundOne && totalPosition < boundTwo) {
                // decrement opacity
                newOpacity = 1 - totalPosition/rateOfChange;
                // if scroll is past the second bound
            } else if (totalPosition >= boundTwo) {
                // increment opacity
                newOpacity = 0 + totalPosition/(rateOfChange + boundOne);
            }
            elem.css("opacity", newOpacity)
        }
        
        changeOpacity($('#iOS'), 300, 600, 1000);
        iOSTotalPosition -= difference;
        // $('#iOS').translateX(difference);
        totalPosition -= difference;
        // turn the knob of second param to change dist between outer circles
        transform($('#iOS'), "", 4);
        transform($('#webPic'), "-", 4);
        console.log(totalPosition, "totalPosition");

        // logic for 3 images moving
        if (scroll[1] < 390) {
            $('#mePic').css("position", "fixed");
            $('#mePic').css("top", 442);
            $('#webPic').css("top", 442);
            $('#iOS').css("top", 442);

            if (scroll[1] >= 300 && scroll[1] < 390) {
                console.log("we are here")
            }
        // if we hit the first section, stop the mepic
        } else if (scroll[1] >= 390) {

            $('#mePic').css("position", "absolute");
            $('#mePic').css("top", 832);
            // $('#webPic').css("left", 126);
            // $("#webPic").fadeOut();
            // $("#iOS").fadeOut();
            if (scroll[1] >= 1142) {
                $('#iOS').css("position", "absolute");
                $('#iOS').css("top", 1587);
            } else {
                $('#iOS').css("position", "fixed");
                $('#iOS').css("top", 442);
            }

           if (scroll[1] >= 1939) {
                $('#webPic').css("position", "absolute");
                $('#webPic').css("top", 2384);

            } else {
                $('#webPic').css("position", "fixed");
                $('#webPic').css("top", 442);
            }

        }
        prevVal = scroll[1];
        console.log(scroll[1], "total scroll");
    

  })