document.addEventListener("touchmove", function(event){
    event.preventDefault();
})
var c = document.getElementsByTagName('canvas')[0],
x = c.getContext('2d'),
pr = window.devicePixelRatio || 1,
w = window.innerWidth,
h = window.innerHeight

var minimumDistance = 10;

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

var points = [];
var a = new Point(0, 0);
var b = new Point(100, 0);

function generateMidpoint(a, b){
    var midX = (a.x + b.x)/2;
    var midY = (a.y + b.y)/2;
    var mid = new Point(midX, midY);
    
    var dist = mid.x - a.x;
    if (dist <= minimumDistance){
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

