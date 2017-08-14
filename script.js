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


var points = [],
a = new Point(0, 500),
b = new Point(1000, 500)

midpointDisplacement(a, b);
console.log(points);

function generateMidpoint(a, b){
    var midX = (a.x + b.x)/2;
    var midY = (a.y + b.y)/2;
    var mid = new Point(midX, generateY(midY));
    
    var dist = mid.x - a.x;
    if (dist <= 5){
        points.push(a);
        return;
    }

    generateMidpoint(a, mid);
    generateMidpoint(mid, b);

}

function midpointDisplacement(a, b){
    generateMidpoint(a, b);
    points.push(b);
}

function generateY(midY){
    var random = Math.random() * (10 - 2) + 2;
    var f = Math.floor(random);
    return (midY + f) * plusOrMinus();
}

function plusOrMinus() {
    return Math.random() < 0.5 ? -1 : 1;
}


points.forEach(function(obj, index){
    if (index == 0){
        x.beginPath();
        x.moveTo(obj.x, obj.y);
    } else {
        x.lineTo(obj.x, obj.y);
    }
});
x.stroke();