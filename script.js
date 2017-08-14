class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

document.addEventListener("touchmove", function(event){
    event.preventDefault();
});

var c = document.getElementsByTagName('canvas')[0],
x = c.getContext('2d'),
pr = window.devicePixelRatio || 1,
w = window.innerWidth,
h = window.innerHeight

c.width = w*pr;
c.height = h*pr;
x.scale(pr, pr);


var points = []

function generateMidpoint(a, b, scale){
    var midX = (a.x + b.x)/2;
    var midY = (a.y + b.y)/2;
    var mid = new Point(midX, generateY(midY, scale));
    
    var dist = mid.x - a.x;
    if (dist <= 5){
        points.push(a);
        return;
    }

    generateMidpoint(a, mid, scale+10);
    generateMidpoint(mid, b, scale+10);

}

function midpointDisplacement(a, b){
    generateMidpoint(a, b);
    points.push(b);
}

function generateY(midY, scale){
    var random = Math.random() * (500 - 2)/scale + 2;
    var f = Math.floor(random);
    return (midY + (f * plusOrMinus()));
}

function plusOrMinus() {
    return Math.random() < 0.5 ? -1 : 1;
}

function draw(a, b, color){
    points = []
    generateMidpoint(a, b, 2);
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
    console.log(points);
}

function setBackground(color){
    x.fillStyle = '#ead569';
    x.fillRect(0, 0, w, h);
}


// EXAMPLES

// Earth
// setBackground('#1d95f2');
// draw(
//     new Point(0, 400),
//     new Point(w+20, 200),
//     '#9ef95e'
// );
// draw(
//     new Point(0, 400),
//     new Point(w+20, 600),    
//     '#6cb737'
// );
// draw(
//     new Point(0, 700),
//     new Point(w+20, 400),
//     '#3a7a0d'
// );

// Mars
// setBackground('#ead569');
// draw(
//     new Point(0, 200),
//     new Point(w+20, 400),
//     '#ea9760'
// );
// draw(
//     new Point(0, 500),
//     new Point(w+20, 600),    
//     '#a34625'
// );
// draw(
//     new Point(0, 700),
//     new Point(w+20, 600),
//     '#44190a'
// );