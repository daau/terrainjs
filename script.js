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

// Earth
setBackground('#6da5ff');
createTerrain(
    new Point(0, 500),
    new Point(w, 300),
    '#9ef95e'
);
createTerrain(
    new Point(0, 500),
    new Point(w, 700),    
    '#6cb737'
);
createTerrain(
    new Point(0, 800),
    new Point(w, 500),
    '#3a7a0d'
);