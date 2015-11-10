window.addEventListener('load', canvasApp, false);
/**
 * Foggy Tree
 * Inspired by http://www.contextfreeart.org/gallery/view.php?id=4
 * Created by newbiettn on 10/11/2015.
 */

function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp() {
    if (!canvasSupport) {
        return;
    } else {
        // screen
        const FPS = .5;
        var interval_time = 1000 / FPS;

        //canvas attributes
        var myCanvas = document.getElementById('myCanvas');
        myCanvas.width = window.innerWidth;
        myCanvas.height = window.innerHeight;

        //context
        var context = myCanvas.getContext('2d');

        var dotRadius = 6;
        var angleOffsetA = 1.5 * Math.PI/180;
        var angleOffsetB = 50 * Math.PI/180;


        //loop game
        function paintLoop() {
            window.setTimeout(paintLoop, interval_time);
            draw();
        }

        function seed1(dotRadius, angle, x, y){
            if (dotRadius > 1) {
                //create chance
                var r = Math.random();

                //98%
                if (r > 0.1) {
                    drawCircle (x, y, dotRadius);
                    var newx = x + Math.cos(angle) * dotRadius * 2;
                    var newy = y + Math.sin(angle) * dotRadius * 2;
                    seed1(dotRadius * 0.99, angle - angleOffsetA, newx, newy);

                } else { //2%
                    drawCircle (x, y, dotRadius);
                    var newx = x + Math.cos(angle);
                    var newy = y + Math.sin(angle);
                    seed2(dotRadius * 0.99, angle + angleOffsetA, newx, newy);
                    seed1(dotRadius * 0.60, angle + angleOffsetB, newx, newy);
                    seed2(dotRadius * 0.50, angle - angleOffsetB, newx, newy);
                }
            }

        }
        function seed2(dotRadius, angle, x, y) {
            if (dotRadius > 1) {
                //create chance
                var r = Math.random();

                //95%
                if (r > 0.1) {
                    drawCircle (x, y, dotRadius);
                    var newx = x + Math.cos(angle) * dotRadius * 2;
                    var newy = y + Math.sin(angle) * dotRadius * 2;
                    seed2(dotRadius * 0.99, angle + angleOffsetA, newx, newy);

                } else { //2%
                    drawCircle (x, y, dotRadius);
                    var newx = x + Math.cos(angle);
                    var newy = y + Math.sin(angle);
                    seed1(dotRadius * 0.99, angle + angleOffsetA, newx, newy);
                    seed2(dotRadius * 0.60, angle + angleOffsetB, newx, newy);
                    seed1(dotRadius * 0.50, angle - angleOffsetB, newx, newy);
                }
            }
        }

        //draw circle, to avoid repeated code
        function drawCircle(x, y, radius) {
            context.fillStyle = '#f597b0';
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        }

        //draw everything
        function draw() {
            //fill screen
            context.fillStyle = '#000';
            context.fillRect(0, 0, myCanvas.width, myCanvas.height);

            context.fillStyle = 'white';
            context.font = "30px Helvetica";
            context.fillText("Foggy Tree", 10, 50);

            seed1(dotRadius, 270 * Math.PI/180, myCanvas.width/2, myCanvas.height);
        }

        paintLoop();
    }
}

