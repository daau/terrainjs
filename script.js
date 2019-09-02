class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Curve {
    constructor(color, leftPoint, rightPoint, decay, decayRate, minX, minY) {
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

    render(context) {
        this.points.forEach((obj, index) => {
            if (index == 0){
                context.beginPath();
                context.moveTo(obj.x, obj.y);
            } else {
                context.lineTo(obj.x, obj.y);
            }
        });
        context.lineTo(this.w, this.h);   // bottom right
        context.lineTo(0, this.h);        // bototm left
        context.closePath();
        context.fillStyle = this.color;
        context.fill(); 
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
        this.canvasContext      = this.canvas.getContext('2d');

        this.backgroundColor    = backgroundColor;
        this.curves             = curves;               // Background first, foreground last

        this.w                  = window.innerWidth;
        this.h                  = window.innerHeight;
        
        this.setupCanvas();
        this.generateTerrain();
    }

    setupCanvas(){
        const pr = window.devicePixelRatio || 1; // High DPI scaling
        const w = window.innerWidth;
        const h = window.innerHeight;

        this.canvas.width = window.innerWidth*pr;
        this.canvas.height = window.innerHeight*pr;
        this.canvasContext.scale(pr, pr);
    }

    generateTerrain(){
        this.setBackground();
        this.drawCurves();
    }

    setBackground() {
        this.canvasContext.fillStyle = this.backgroundColor;
        this.canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    drawCurves() {
        this.curves.forEach((curve) => curve.render(this.canvasContext));
    }
}


const MIN_X = 3,
MIN_Y = 1000,
DECAY = 10,
DECAY_RATE = 20;

const c = document.getElementsByTagName('canvas')[0];
const w = window.innerWidth;
const h = window.innerHeight;

let curves = [];

curves.push(new Curve(
    '#ebf6ff',
    new Point(0, 300),
    new Point(w, 200),
    DECAY,
    DECAY_RATE + 20,
    MIN_X,
    MIN_Y
))

curves.push(new Curve(
    '#d9eeff',
    new Point(0, 400),
    new Point(w, 300),
    DECAY,
    DECAY_RATE + 10,
    MIN_X,
    MIN_Y
));

curves.push(
new Curve(
    '#b3ddff',
    new Point(0, 500),
    new Point(w, 300),
    DECAY,
    DECAY_RATE,
    MIN_X,
    MIN_Y
));

let terrain = new Terrain(c, 'white', curves);