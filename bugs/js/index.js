
(function(){

    var canvas = document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");

    var bugs = [];
    var bugCol =["#622569", "#b8a9c9", "#d6d4e0"]
    var bugLength = 3;
    var bugSize = 5;
    var dx = 1; // how much they move per draw?
    var dy = 1;

    function initBugs() {
        // adds to the bug list
        // prob of bug appearing
        var bugProb = 0.0001;  // 1% chance
        for (x=0; x<canvas.width; x++){
          for (y=0; y<canvas.height; y++) {
            if (Math.random() < bugProb) {
                // make a bug!
                var dx = 2*(Math.random() - 0.5); // direction of travel
                var dy = 2*(Math.random() - 0.5);
                var xi = x; // where the bug is
                var yi = y;
                var bug = {'dx':dx, 'dy':dy, 'x':x, 'y':y};
                bugs.push(bug);
            }
          }
        }
    }

    function drawBugs() {
        for(i=0; i<bugs.length; ++i) {
            r = bugs[i]
            for (j=0; j<bugLength; j++) {
                ctx.beginPath();
                ctx.rect(r.x+ (-1*r.dx*j*bugSize), r.y+ (-1*r.dy*j*bugSize), bugSize, bugSize);
                ctx.fillStyle = bugCol[j];
                ctx.fill();
                ctx.closePath();
            }
            bugs[i].x += bugs[i].dx;
            bugs[i].y += bugs[i].dy;
            if (bugs[i].x < 1) {bugs[i].x = canvas.width;}
            if (bugs[i].x > canvas.width) {bugs[i].x = 1;}
            if (bugs[i].y < 1) {bugs[i].y = canvas.height;}
            if (bugs[i].y > canvas.width) {bugs[i].y = 1;}

        }
    }


    function draw() {        // -- //
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBugs();
        requestAnimationFrame(draw);
    }


    function start() {
      initBugs();
      draw();
    }

    //requestAnimationFrame(draw);
    window.onload = function() { start(); };
})();
