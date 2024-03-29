const knowMotions = {
    "ticker": [
        "transform=translateY(-250%)",
        "0{transform=translateY(-250%)}",
        "15/85{transform=translateY(-50%)}",
        "100{transform-translateY(100%)}"
    ],

    "bounce": [
        "from,20%,53%,to{animation-timing-function=cubic-bezier(0.215,0.61,0.355,1) transform=translate3d(0,0,0)}",
        "40%,43%{animation-timing-function=cubic-bezier(0.755,0.05,0.855,0.06) transform=translate3d(0,-30px,0)_scaleY(1.1)}",
        "70%{animation-timing-function=cubic-bezier(0.755,0.05,0.855,0.06) transform=translate3d(0,-15px,0)_scaleY(1.05)}",
        "80%{transition-timing-function=cubic-bezier(0.215,0.61,0.355,1) transform=translate3d(0,0,0)_scaleY(0.95)}",
        "90%{transform=translate3d(0,-4px,0)_scaleY(1.02)}"
    ],
    "flash": [
        "from,50%,to{opacity=1}",
        "25%,75%{opacity=0}"
    ],
    "pulse": [
        "from{transform=scale3d(1,1,1)}",
        "50%{transform=scale3d(1.05,1.05,1.05)}",
        "to{transform=scale3d(1,1,1)}"
    ],
    "rubberBand": [
        "from{transform=scale3d(1,1,1)}",
        "30%{transform=scale3d(1.25,0.75,1)}",
        "40%{transform=scale3d(0.75,1.25,1)}",
        "50%{transform=scale3d(1.15,0.85,1)}",
        "65%{transform=scale3d(0.95,1.05,1)}",
        "75%{transform=scale3d(1.05,0.95,1)}",
        "to{transform=scale3d(1,1,1)}"
    ],
    "shakeX": [
        "from,to{transform=translate3d(0,0,0)}",
        "10%,30%,50%,70%,90%{transform=translate3d(-10px,0,0)}",
        "20%,40%,60%,80%{transform=translate3d(10px,0,0)}"
    ],
    "shakeY": [
        "from,to{transform=translate3d(0,0,0)}",
        "10%,30%,50%,70%,90%{transform=translate3d(0,-10px,0)}",
        "20%,40%,60%,80%{transform=translate3d(0,10px,0)}"
    ],
    "headShake": [
        "0%{transform=translateX(0)}",
        "6.5%{transform=translateX(-6px)_rotateY(-9deg)}",
        "18.5%{transform=translateX(5px)_rotateY(7deg)}",
        "31.5%{transform=translateX(-3px)_rotateY(-5deg)}",
        "43.5%{transform=translateX(2px)_rotateY(3deg)}",
        "50%{transform=translateX(0)}"
    ],
    "swing": [
        "20%{transform=rotate3d(0,0,1,15deg)}",
        "40%{transform=rotate3d(0,0,1,-10deg)}",
        "60%{transform=rotate3d(0,0,1,5deg)}",
        "80%{transform=rotate3d(0,0,1,-5deg)}",
        "to{transform=rotate3d(0,0,1,0deg)}"
    ],
    "tada": [
        "from{transform=scale3d(1,1,1)}",
        "10%,20%{transform=scale3d(0.9,0.9,0.9)_rotate3d(0,0,1,-3deg)}",
        "30%,50%,70%,90%{transform=scale3d(1.1,1.1,1.1)_rotate3d(0,0,1,3deg)}",
        "40%,60%,80%{transform=scale3d(1.1,1.1,1.1)_rotate3d(0,0,1,-3deg)}",
        "to{transform=scale3d(1,1,1)}"
    ],
    "wobble": [
        "from{transform=translate3d(0,0,0)}",
        "15%{transform=translate3d(-25%,0,0)_rotate3d(0,0,1,-5deg)}",
        "30%{transform=translate3d(20%,0,0)_rotate3d(0,0,1,3deg)}",
        "45%{transform=translate3d(-15%,0,0)_rotate3d(0,0,1,-3deg)}",
        "60%{transform=translate3d(10%,0,0)_rotate3d(0,0,1,2deg)}",
        "75%{transform=translate3d(-5%,0,0)_rotate3d(0,0,1,-1deg)}",
        "to{transform=translate3d(0,0,0)}"
    ],
    "jello": [
        "from,11.1%,to{transform=translate3d(0,0,0)}",
        "22.2%{transform=skewX(-12.5deg)_skewY(-12.5deg)}",
        "33.3%{transform=skewX(6.25deg)_skewY(6.25deg)}",
        "44.4%{transform=skewX(-3.125deg)_skewY(-3.125deg)}",
        "55.5%{transform=skewX(1.5625deg)_skewY(1.5625deg)}",
        "66.6%{transform=skewX(-0.78125deg)_skewY(-0.78125deg)}",
        "77.7%{transform=skewX(0.390625deg)_skewY(0.390625deg)}",
        "88.8%{transform=skewX(-0.1953125deg)_skewY(-0.1953125deg)}"
    ],
    "heartBeat": [
        "0%{transform=scale(1)}",
        "14%{transform=scale(1.3)}",
        "28%{transform=scale(1)}",
        "42%{transform=scale(1.3)}",
        "70%{transform=scale(1)}"
    ],
    "backInDown": [
        "0%{transform=translateY(-1200px)_scale(0.7) opacity=0.7}",
        "80%{transform=translateY(0px)_scale(0.7) opacity=0.7}",
        "100%{transform=scale(1) opacity=1}"
    ],
    "backInLeft": [
        "0%{transform=translateX(-2000px)_scale(0.7) opacity=0.7}",
        "80%{transform=translateX(0px)_scale(0.7) opacity=0.7}",
        "100%{transform=scale(1) opacity=1}"
    ],
    "backInRight": [
        "0%{transform=translateX(2000px)_scale(0.7) opacity=0.7}",
        "80%{transform=translateX(0px)_scale(0.7) opacity=0.7}",
        "100%{transform=scale(1) opacity=1}"
    ],
    "backInUp": [
        "0%{transform=translateY(1200px)_scale(0.7) opacity=0.7}",
        "80%{transform=translateY(0px)_scale(0.7) opacity=0.7}",
        "100%{transform=scale(1) opacity=1}"
    ],
    "backOutDown": [
        "0%{transform=scale(1) opacity=1}",
        "20%{transform=translateY(0px)_scale(0.7) opacity=0.7}",
        "100%{transform=translateY(700px)_scale(0.7) opacity=0.7}"
    ],
    "backOutLeft": [
        "0%{transform=scale(1) opacity=1}",
        "20%{transform=translateX(0px)_scale(0.7) opacity=0.7}",
        "100%{transform=translateX(-2000px)_scale(0.7) opacity=0.7}"
    ],
    "backOutRight": [
        "0%{transform=scale(1) opacity=1}",
        "20%{transform=translateX(0px)_scale(0.7) opacity=0.7}",
        "100%{transform=translateX(2000px)_scale(0.7) opacity=0.7}"
    ],
    "backOutUp": [
        "0%{transform=scale(1) opacity=1}",
        "20%{transform=translateY(0px)_scale(0.7) opacity=0.7}",
        "100%{transform=translateY(-700px)_scale(0.7) opacity=0.7}"
    ],
    "bounceIn": [
        "from,20%,40%,60%,80%,to{animation-timing-function=cubic-bezier(0.215,0.61,0.355,1)}",
        "0%{opacity=0 transform=scale3d(0.3,0.3,0.3)}",
        "20%{transform=scale3d(1.1,1.1,1.1)}",
        "40%{transform=scale3d(0.9,0.9,0.9)}",
        "60%{opacity=1 transform=scale3d(1.03,1.03,1.03)}",
        "80%{transform=scale3d(0.97,0.97,0.97)}",
        "to{opacity=1 transform=scale3d(1,1,1)}"
    ],
    "bounceInDown": [
        "from,60%,75%,90%,to{animation-timing-function=cubic-bezier(0.215,0.61,0.355,1)}",
        "0%{opacity=0 transform=translate3d(0,-3000px,0)_scaleY(3)}",
        "60%{opacity=1 transform=translate3d(0,25px,0)_scaleY(0.9)}",
        "75%{transform=translate3d(0,-10px,0)_scaleY(0.95)}",
        "90%{transform=translate3d(0,5px,0)_scaleY(0.985)}",
        "to{transform=translate3d(0,0,0)}"
    ],
    "bounceInLeft": [
        "from,60%,75%,90%,to{animation-timing-function=cubic-bezier(0.215,0.61,0.355,1)}",
        "0%{opacity=0 transform=translate3d(-3000px,0,0)_scaleX(3)}",
        "60%{opacity=1 transform=translate3d(25px,0,0)_scaleX(1)}",
        "75%{transform=translate3d(-10px,0,0)_scaleX(0.98)}",
        "90%{transform=translate3d(5px,0,0)_scaleX(0.995)}",
        "to{transform=translate3d(0,0,0)}"
    ],
    "bounceInRight": [
        "from,60%,75%,90%,to{animation-timing-function=cubic-bezier(0.215,0.61,0.355,1)}",
        "from{opacity=0 transform=translate3d(3000px,0,0)_scaleX(3)}",
        "60%{opacity=1 transform=translate3d(-25px,0,0)_scaleX(1)}",
        "75%{transform=translate3d(10px,0,0)_scaleX(0.98)}",
        "90%{transform=translate3d(-5px,0,0)_scaleX(0.995)}",
        "to{transform=translate3d(0,0,0)}"
    ],
    "bounceInUp": [
        "from,60%,75%,90%,to{animation-timing-function=cubic-bezier(0.215,0.61,0.355,1)}",
        "from{opacity=0 transform=translate3d(0,3000px,0)_scaleY(5)}",
        "60%{opacity=1 transform=translate3d(0,-20px,0)_scaleY(0.9)}",
        "75%{transform=translate3d(0,10px,0)_scaleY(0.95)}",
        "90%{transform=translate3d(0,-5px,0)_scaleY(0.985)}",
        "to{transform=translate3d(0,0,0)}"
    ],
    "bounceOut": [
        "20%{transform=scale3d(0.9,0.9,0.9)}",
        "50%,55%{opacity=1 transform=scale3d(1.1,1.1,1.1)}",
        "to{opacity=0 transform=scale3d(0.3,0.3,0.3)}"
    ],
    "bounceOutDown": [
        "20%{transform=translate3d(0,10px,0)_scaleY(0.985)}",
        "40%,45%{opacity=1 transform=translate3d(0,-20px,0)_scaleY(0.9)}",
        "to{opacity=0 transform=translate3d(0,2000px,0)_scaleY(3)}"
    ],
    "bounceOutLeft": [
        "20%{opacity=1 transform=translate3d(20px,0,0)_scaleX(0.9)}",
        "to{opacity=0 transform=translate3d(-2000px,0,0)_scaleX(2)}"
    ],
    "bounceOutRight": [
        "20%{opacity=1 transform=translate3d(-20px,0,0)_scaleX(0.9)}",
        "to{opacity=0 transform=translate3d(2000px,0,0)_scaleX(2)}"
    ],
    "bounceOutUp": [
        "20%{transform=translate3d(0,-10px,0)_scaleY(0.985)}",
        "40%,45%{opacity=1 transform=translate3d(0,20px,0)_scaleY(0.9)}",
        "to{opacity=0 transform=translate3d(0,-2000px,0)_scaleY(3)}"
    ],
    "fadeIn": [
        "from{opacity=0}",
        "to{opacity=1}"
    ],
    "fadeInDown": [
        "from{opacity=0 transform=translate3d(0,-100%,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeInDownBig": [
        "from{opacity=0 transform=translate3d(0,-2000px,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeInLeft": [
        "from{opacity=0 transform=translate3d(-100%,0,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeInLeftBig": [
        "from{opacity=0 transform=translate3d(-2000px,0,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeInRight": [
        "from{opacity=0 transform=translate3d(100%,0,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeInRightBig": [
        "from{opacity=0 transform=translate3d(2000px,0,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeInUp": [
        "from{opacity=0 transform=translate3d(0,100%,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeInUpBig": [
        "from{opacity=0 transform=translate3d(0,2000px,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeInTopLeft": [
        "from{opacity=0 transform=translate3d(-100%,-100%,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeInTopRight": [
        "from{opacity=0 transform=translate3d(100%,-100%,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeInBottomLeft": [
        "from{opacity=0 transform=translate3d(-100%,100%,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeInBottomRight": [
        "from{opacity=0 transform=translate3d(100%,100%,0)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "fadeOut": [
        "from{opacity=1}",
        "to{opacity=0}"
    ],
    "fadeOutDown": [
        "from{opacity=1}",
        "to{opacity=0 transform=translate3d(0,100%,0)}"
    ],
    "fadeOutDownBig": [
        "from{opacity=1}",
        "to{opacity=0 transform=translate3d(0,2000px,0)}"
    ],
    "fadeOutLeft": [
        "from{opacity=1}",
        "to{opacity=0 transform=translate3d(-100%,0,0)}"
    ],
    "fadeOutLeftBig": [
        "from{opacity=1}",
        "to{opacity=0 transform=translate3d(-2000px,0,0)}"
    ],
    "fadeOutRight": [
        "from{opacity=1}",
        "to{opacity=0 transform=translate3d(100%,0,0)}"
    ],
    "fadeOutRightBig": [
        "from{opacity=1}",
        "to{opacity=0 transform=translate3d(2000px,0,0)}"
    ],
    "fadeOutUp": [
        "from{opacity=1}",
        "to{opacity=0 transform=translate3d(0,-100%,0)}"
    ],
    "fadeOutUpBig": [
        "from{opacity=1}",
        "to{opacity=0 transform=translate3d(0,-2000px,0)}"
    ],
    "fadeOutTopLeft": [
        "from{opacity=1 transform=translate3d(0,0,0)}",
        "to{opacity=0 transform=translate3d(-100%,-100%,0)}"
    ],
    "fadeOutTopRight": [
        "from{opacity=1 transform=translate3d(0,0,0)}",
        "to{opacity=0 transform=translate3d(100%,-100%,0)}"
    ],
    "fadeOutBottomRight": [
        "from{opacity=1 transform=translate3d(0,0,0)}",
        "to{opacity=0 transform=translate3d(100%,100%,0)}"
    ],
    "fadeOutBottomLeft": [
        "from{opacity=1 transform=translate3d(0,0,0)}",
        "to{opacity=0 transform=translate3d(-100%,100%,0)}"
    ],
    "flip": [
        "from{transform=perspective(400px)_scale3d(1,1,1)_translate3d(0,0,0)_rotate3d(0,1,0,-360deg) animation-timing-function=ease-out}",
        "40%{transform=perspective(400px)_scale3d(1,1,1)_translate3d(0,0,150px)_rotate3d(0,1,0,-190deg) animation-timing-function=ease-out}",
        "50%{transform=perspective(400px)_scale3d(1,1,1)_translate3d(0,0,150px)_rotate3d(0,1,0,-170deg) animation-timing-function=ease-in}",
        "80%{transform=perspective(400px)_scale3d(0.95,0.95,0.95)_translate3d(0,0,0)_rotate3d(0,1,0,0deg) animation-timing-function=ease-in}",
        "to{transform=perspective(400px)_scale3d(1,1,1)_translate3d(0,0,0)_rotate3d(0,1,0,0deg) animation-timing-function=ease-in}"
    ],
    "flipInX": [
        "from{transform=perspective(400px)_rotate3d(1,0,0,90deg) animation-timing-function=ease-in opacity=0}",
        "40%{transform=perspective(400px)_rotate3d(1,0,0,-20deg) animation-timing-function=ease-in}",
        "60%{transform=perspective(400px)_rotate3d(1,0,0,10deg) opacity=1}",
        "80%{transform=perspective(400px)_rotate3d(1,0,0,-5deg)}",
        "to{transform=perspective(400px)}"
    ],
    "flipInY": [
        "from{transform=perspective(400px)_rotate3d(0,1,0,90deg) animation-timing-function=ease-in opacity=0}",
        "40%{transform=perspective(400px)_rotate3d(0,1,0,-20deg) animation-timing-function=ease-in}",
        "60%{transform=perspective(400px)_rotate3d(0,1,0,10deg) opacity=1}",
        "80%{transform=perspective(400px)_rotate3d(0,1,0,-5deg)}",
        "to{transform=perspective(400px)}"
    ],
    "flipOutX": [
        "from{transform=perspective(400px)}",
        "30%{transform=perspective(400px)_rotate3d(1,0,0,-20deg) opacity=1}",
        "to{transform=perspective(400px)_rotate3d(1,0,0,90deg) opacity=0}"
    ],
    "flipOutY": [
        "from{transform=perspective(400px)}",
        "30%{transform=perspective(400px)_rotate3d(0,1,0,-15deg) opacity=1}",
        "to{transform=perspective(400px)_rotate3d(0,1,0,90deg) opacity=0}"
    ],
    "lightSpeedInRight": [
        "from{transform=translate3d(100%,0,0)_skewX(-30deg) opacity=0}",
        "60%{transform=skewX(20deg) opacity=1}",
        "80%{transform=skewX(-5deg)}",
        "to{transform=translate3d(0,0,0)}"
    ],
    "lightSpeedInLeft": [
        "from{transform=translate3d(-100%,0,0)_skewX(30deg) opacity=0}",
        "60%{transform=skewX(-20deg) opacity=1}",
        "80%{transform=skewX(5deg)}",
        "to{transform=translate3d(0,0,0)}"
    ],
    "lightSpeedOutRight": [
        "from{opacity=1}",
        "to{transform=translate3d(100%,0,0)_skewX(30deg) opacity=0}"
    ],
    "lightSpeedOutLeft": [
        "from{opacity=1}",
        "to{transform=translate3d(-100%,0,0)_skewX(-30deg) opacity=0}"
    ],
    "rotateIn": [
        "from{transform=rotate3d(0,0,1,-200deg) opacity=0}",
        "to{transform=translate3d(0,0,0) opacity=1}"
    ],
    "rotateInDownLeft": [
        "from{transform=rotate3d(0,0,1,-45deg) opacity=0}",
        "to{transform=translate3d(0,0,0) opacity=1}"
    ],
    "rotateInDownRight": [
        "from{transform=rotate3d(0,0,1,45deg) opacity=0}",
        "to{transform=translate3d(0,0,0) opacity=1}"
    ],
    "rotateInUpLeft": [
        "from{transform=rotate3d(0,0,1,45deg) opacity=0}",
        "to{transform=translate3d(0,0,0) opacity=1}"
    ],
    "rotateInUpRight": [
        "from{transform=rotate3d(0,0,1,-90deg) opacity=0}",
        "to{transform=translate3d(0,0,0) opacity=1}"
    ],
    "rotateOut": [
        "from{opacity=1}",
        "to{transform=rotate3d(0,0,1,200deg) opacity=0}"
    ],
    "rotateOutDownLeft": [
        "from{opacity=1}",
        "to{transform=rotate3d(0,0,1,45deg) opacity=0}"
    ],
    "rotateOutDownRight": [
        "from{opacity=1}",
        "to{transform=rotate3d(0,0,1,-45deg) opacity=0}"
    ],
    "rotateOutUpLeft": [
        "from{opacity=1}",
        "to{transform=rotate3d(0,0,1,-45deg) opacity=0}"
    ],
    "rotateOutUpRight": [
        "from{opacity=1}",
        "to{transform=rotate3d(0,0,1,90deg) opacity=0}"
    ],
    "hinge": [
        "0%{animation-timing-function=ease-in-out}",
        "20%,60%{transform=rotate3d(0,0,1,80deg) animation-timing-function=ease-in-out}",
        "40%,80%{transform=rotate3d(0,0,1,60deg) animation-timing-function=ease-in-out opacity=1}",
        "to{transform=translate3d(0,700px,0) opacity=0}"
    ],
    "jackInTheBox": [
        "from{opacity=0 transform=scale(0.1)_rotate(30deg) transform-origin=center/bottom}",
        "50%{transform=rotate(-10deg)}",
        "70%{transform=rotate(3deg)}",
        "to{opacity=1 transform=scale(1)}"
    ],
    "rollIn": [
        "from{opacity=0 transform=translate3d(-100%,0,0)_rotate3d(0,0,1,-120deg)}",
        "to{opacity=1 transform=translate3d(0,0,0)}"
    ],
    "rollOut": [
        "from{opacity=1}",
        "to{opacity=0 transform=translate3d(100%,0,0)_rotate3d(0,0,1,120deg)}"
    ],
    "zoomIn": [
        "from{opacity=0 transform=scale3d(0.3,0.3,0.3)}",
        "50%{opacity=1}"
    ],
    "zoomInDown": [
        "from{opacity=0 transform=scale3d(0.1,0.1,0.1)_translate3d(0,-1000px,0) animation-timing-function=cubic-bezier(0.55,0.055,0.675,0.19)}",
        "60%{opacity=1 transform=scale3d(0.475,0.475,0.475)_translate3d(0,60px,0) animation-timing-function=cubic-bezier(0.175,0.885,0.32,1)}"
    ],
    "zoomInLeft": [
        "from{opacity=0 transform=scale3d(0.1,0.1,0.1)_translate3d(-1000px,0,0) animation-timing-function=cubic-bezier(0.55,0.055,0.675,0.19)}",
        "60%{opacity=1 transform=scale3d(0.475,0.475,0.475)_translate3d(10px,0,0) animation-timing-function=cubic-bezier(0.175,0.885,0.32,1)}"
    ],
    "zoomInRight": [
        "from{opacity=0 transform=scale3d(0.1,0.1,0.1)_translate3d(1000px,0,0) animation-timing-function=cubic-bezier(0.55,0.055,0.675,0.19)}",
        "60%{opacity=1 transform=scale3d(0.475,0.475,0.475)_translate3d(-10px,0,0) animation-timing-function=cubic-bezier(0.175,0.885,0.32,1)}"
    ],
    "zoomInUp": [
        "from{opacity=0 transform=scale3d(0.1,0.1,0.1)_translate3d(0,1000px,0) animation-timing-function=cubic-bezier(0.55,0.055,0.675,0.19)}",
        "60%{opacity=1 transform=scale3d(0.475,0.475,0.475)_translate3d(0,-60px,0) animation-timing-function=cubic-bezier(0.175,0.885,0.32,1)}"
    ],
    "zoomOut": [
        "from{opacity=1}",
        "50%{opacity=0 transform=scale3d(0.3,0.3,0.3)}",
        "to{opacity=0}"
    ],
    "zoomOutDown": [
        "40%{opacity=1 transform=scale3d(0.475,0.475,0.475)_translate3d(0,-60px,0) animation-timing-function=cubic-bezier(0.55,0.055,0.675,0.19)}",
        "to{opacity=0 transform=scale3d(0.1,0.1,0.1)_translate3d(0,2000px,0) animation-timing-function=cubic-bezier(0.175,0.885,0.32,1)}"
    ],
    "zoomOutLeft": [
        "40%{opacity=1 transform=scale3d(0.475,0.475,0.475)_translate3d(42px,0,0)}",
        "to{opacity=0 transform=scale(0.1)_translate3d(-2000px,0,0)}"
    ],
    "zoomOutRight": [
        "40%{opacity=1 transform=scale3d(0.475,0.475,0.475)_translate3d(-42px,0,0)}",
        "to{opacity=0 transform=scale(0.1)_translate3d(2000px,0,0)}"
    ],
    "zoomOutUp": [
        "40%{opacity=1 transform=scale3d(0.475,0.475,0.475)_translate3d(0,60px,0) animation-timing-function=cubic-bezier(0.55,0.055,0.675,0.19)}",
        "to{opacity=0 transform=scale3d(0.1,0.1,0.1)_translate3d(0,-2000px,0) animation-timing-function=cubic-bezier(0.175,0.885,0.32,1)}"
    ],
    "slideInDown": [
        "from{transform=translate3d(0,-100%,0) visibility-visible}",
        "to{transform=translate3d(0,0,0)}"
    ],
    "slideInLeft": [
        "from{transform=translate3d(-100%,0,0) visibility-visible}",
        "to{transform=translate3d(0,0,0)}"
    ],
    "slideInRight": [
        "from{transform=translate3d(100%,0,0) visibility-visible}",
        "to{transform=translate3d(0,0,0)}"
    ],
    "slideInUp": [
        "from{transform=translate3d(0,100%,0) visibility-visible}",
        "to{transform=translate3d(0,0,0)}"
    ],
    "slideOutDown": [
        "from{transform=translate3d(0,0,0)}",
        "to{visibility-hidden transform=translate3d(0,100%,0)}"
    ],
    "slideOutLeft": [
        "from{transform=translate3d(0,0,0)}",
        "to{visibility-hidden transform=translate3d(-100%,0,0)}"
    ],
    "slideOutRight": [
        "from{transform=translate3d(0,0,0)}",
        "to{visibility-hidden transform=translate3d(100%,0,0)}"
    ],
    "slideOutUp": [
        "from{transform=translate3d(0,0,0)}",
        "to{visibility-hidden transform=translate3d(0,-100%,0)}"
    ]
};
