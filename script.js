const MIN_X = 1,
MIN_Y = 1000,
DECAY = 10,
DECAY_RATE = 20;

var c = document.getElementsByTagName('canvas')[0],
x = c.getContext('2d'),
pr = window.devicePixelRatio || 1, // High DPI scaling
w = window.innerWidth,
h = window.innerHeight,
points = []

c.width = w*pr;
c.height = h*pr;
x.scale(pr, pr);

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Curve {
    constructor(canvas, color, leftPoint, rightPoint, decay, decayRate, minX, minY) {
        this.canvas2D = canvas.getContext('2d');

        this.color = color;

        this.leftPoint  = leftPoint;
        this.rightPoint = rightPoint;
        this.points     = [];

        this.decay      = decay;
        this.decayRate  = decayRate;
        this.minX       = minX;
        this.minY       = minY;

        this.w = window.innerWidth;
        this.h = window.innerHeight;

        this.generatePoints();
    }

    // Generate points in between leftPoint and rightPoint using diamond-square
    generatePoints() {
        this.generateMidpoint(this.leftPoint, this.rightPoint, this.decay);

        this.points.shift(this.leftPoint);
        this.points.push(this.rightPoint);
    }

    generateMidpoint(left, right, scale) {
        const midX = (left.x + right.x)/2;
        const midY = (left.y + right.y)/2;
        const mid = new Point(midX, this.randomY(midY, scale));
        const dist = mid.x - left.x;
    
        if (dist <= this.minX){
            this.points.push(left);
            return;
        }

        this.generateMidpoint(left, mid, scale + this.decayRate);
        this.generateMidpoint(mid, right, scale + this.decayRate);
    }

    render() {
        this.points.forEach((obj, index) => {
            if (index == 0){
                this.canvas2D.beginPath();
                this.canvas2D.moveTo(obj.x, obj.y);
            } else {
                this.canvas2D.lineTo(obj.x, obj.y);
            }
        });
        this.canvas2D.lineTo(this.w, this.h);
        this.canvas2D.lineTo(0, this.h);
        this.canvas2D.closePath();
        this.canvas2D.fillStyle = this.color;
        this.canvas2D.fill(); 
    }

    randomY(midY, scale) {
        const random = Math.random() * this.minY/scale;
        const f = Math.floor(random);
        return (midY + (f * this.plusOrMinus()));
    }

    plusOrMinus() {
        return Math.random() < 0.5 ? -1 : 1;
    }
}

class Terrain {
    constructor(canvas, backgroundColor, curves) {
        this.canvas             = canvas;
        this.backgroundColor    = backgroundColor;
        this.curves             = curves;               // Background first, foreground last

        this.w                  = window.innerWidth;
        this.h                  = window.innerHeight;

        this.generateTerrain();
    }

    generateTerrain(){
        this.setBackground();
        this.drawCurves();
    }

    setBackground() {
        this.canvas.fillStyle = this.backgroundColor;
        this.canvas.fillRect(0, 0, this.w, this.h);
    }

    drawCurves() {
        this.curves.forEach((curve) => curve.render());
    }
}

function generateMidpoint(a, b, scale){
    var midX = (a.x + b.x)/2;
    var midY = (a.y + b.y)/2;
    var mid = new Point(midX, randomY(midY, scale));
    var dist = mid.x - a.x;

    if (dist <= MIN_X){
        points.push(a);
        return;
    }
    generateMidpoint(a, mid, scale + DECAY_RATE);
    generateMidpoint(mid, b, scale + DECAY_RATE);
}

function midpointDisplacement(a, b, scale){
    generateMidpoint(a, b, scale);
    points.push(b);
}

function randomY(midY, scale){ // Generate a Y coordinate
    var random = Math.random() * MIN_Y/scale;
    var f = Math.floor(random);
    return (midY + (f * plusOrMinus()));
}

function plusOrMinus() { // Randomly returns -1 or 1
    return Math.random() < 0.5 ? -1 : 1;
}

function drawCurve(color){
    points.forEach(function(obj, index){
        if (index == 0){
            x.beginPath();
            x.moveTo(obj.x, obj.y);
        } else {
            x.lineTo(obj.x, obj.y);
        }
    });
    x.lineTo(w, h);
    x.lineTo(0, h);
    x.closePath();
    x.fillStyle = color;
    x.fill();    
}

function setBackground(color){
    x.fillStyle = color;
    x.fillRect(0, 0, w, h);
}

function createTerrain(a, b, color){
    points = []
    midpointDisplacement(a, b, DECAY);
    drawCurve(color);
}

let curves = [];
curves.push(new Curve(
    c,
    '#9ef95e',
    new Point(0, 400),
    new Point(w, 200),
    DECAY,
    DECAY_RATE,
    MIN_X,
    MIN_Y
).render())

// // Earth
// setBackground('#6da5ff');
// createTerrain(
//     new Point(0, 500),
//     new Point(w, 300),
//     '#9ef95e'
// );
// createTerrain(
//     new Point(0, 500),
//     new Point(w, 700),    
//     '#6cb737'
// );
// createTerrain(
//     new Point(0, 800),
//     new Point(w, 500),
//     '#3a7a0d'
// );