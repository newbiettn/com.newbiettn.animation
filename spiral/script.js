window.addEventListener('load', canvasApp, false);
/**
 * Created by newbiettn on 3/11/2015.
 */

function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp() {
    if (!canvasSupport) {
        return;
    } else {
        // screen
        const FPS = 60;
        var interval_time = 1000 / FPS;

        //canvas attributes
        var myCanvas = document.getElementById('myCanvas');
        myCanvas.width = window.innerWidth;
        myCanvas.height = window.innerHeight;

        var context = myCanvas.getContext('2d');

        //particle
        var xInit = myCanvas.width/2,
            yInit = myCanvas.height/2;

        var maxSize = 8;
        var minSize = 5;

        var particles = new Array();

        //loop game
        function paintLoop() {
            window.setTimeout(paintLoop, interval_time);
            draw();
        }

        //x = (a + b * angle) * cos(angle)
        //y = (a + b * angle) * sin(angle)
        function makeSpiral(particle) {
            angle = particle.v * 0.1;
            particle.v++;
            dx = (particle.a + particle.b * angle) * Math.cos(angle);
            dy = (particle.a + particle.b * angle) * Math.sin(angle);
            particle.x += dx;
            particle.y += dy;
            particle.et -= .0005;
        }

        function makeParticle(){
            var tempRadius = Math.floor(Math.random() * maxSize) + minSize;
            var tempX = myCanvas.width/2;
            var tempY = myCanvas.height/2;
            var tempA = Math.random();
            var tempB = Math.random();
            var tempValue = Math.random();
            var tempExistTimer = 1;

            //color
            var redValue = Math.floor(Math.random() * 255);
            var greenValue = Math.floor(Math.random() * 255);
            var blueValue = Math.floor(Math.random() * 255);

            return tempParticle = {
                x: tempX,
                y: tempY,
                r: tempRadius,
                a: tempA,
                b: tempB,
                v: tempValue,
                et: tempExistTimer,
                redValue: redValue,
                greenValue: greenValue,
                blueValue: blueValue};
        }

        var currentParticles = new Array();

        function draw() {
            //fill screen
            context.fillStyle = '#000';
            context.fillRect(0, 0, myCanvas.width, myCanvas.height);

            context.fillStyle = 'white';
            context.font = "normal small-caps lighter 30px Courier";
            context.fillText("Spiral Particle", 10, 50);

            currentParticles.push(makeParticle());
            var tempParticle;
            for (var j = 0; j < currentParticles.length - 1; j++) {
                tempParticle = currentParticles[j];
                makeSpiral(tempParticle);
                context.globalAlpha = tempParticle.et;
                context.fillStyle = "rgba(" + tempParticle.redValue +", "+ tempParticle.greenValue+", "+ tempParticle.blueValue +", "+ tempParticle.et +")";
                context.beginPath();
                context.arc(tempParticle.x, tempParticle.y, tempParticle.r, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();
            }
        }

        paintLoop();
    }
}

