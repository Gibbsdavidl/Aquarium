
(function(){

    var canvas = document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");

    var rain = [];
    var rainCol =["#622569", "#b8a9c9", "#d6d4e0"]
    var rainLength = 3;
    var rainSize = 10;
    var raindropProb = 0.01;
    var dx = 0.01;
    var dy = 1;

    function makeRain() {
        // adds to the rain list
        for (x=0; x<canvas.width; x++){
            if (Math.random() < raindropProb) {
                // make the rain!
                var zoomy = Math.random()*5;
                var rd = {'x':x, 'y':0, 'd':zoomy};
                rain.push(rd);
            }
        }
    }

    function rmRain() {
        // remove rain that's below the bottom
        newRain = [];
        for (i=0; i<rain.length;i++){
            if (rain[i].y < canvas.height) {
                newRain.push(rain[i]);
            }
        }
        rain = newRain;
    }

    function drawRain() {
        for(i=0; i<rain.length; ++i) {
            r = rain[i]
            for (j=0; j<rainLength; j++) {
                ctx.beginPath();
                ctx.rect(r.x+dx*j, r.y+rainSize*j, rainSize, rainSize);
                ctx.fillStyle = rainCol[j];
                ctx.fill();
                ctx.closePath();
            }
            rain[i].x += dx;
            rain[i].y += r.d;
        }
    }


    function draw() {
        // -- //
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        makeRain();
        drawRain();
        rmRain();
        requestAnimationFrame(draw);
    }

    //requestAnimationFrame(draw);
    window.onload = function() { draw(); };
})();
