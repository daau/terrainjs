# TerrainJS

### Earth
![Screenshot](/earth.png?raw=true "Screenshot")

### Mars
![Screenshot](/mars.png?raw=true "Screenshot")


This is a midpoint displacement (AKA diamond-square) based terrain generator, written in Javascript. A dynamically fitted canvas is created, and a background colour can be set. You can then draw as many terrain curves as you'd like by calling the draw() function. The draw() function takes three arguments: a starting point, an endpoint, and a colour. Example usage follows, below:

The following code sets the background colour.

```javascript
setBackground('brown');
// alternatively
setBackground('#1d95f2');
```

And, following code will generate a green terrain curve, starting from (x:0 y:500) and ending at (x:w, y:600) where w is the width of the browser.
```javascript
draw(
	new Point(0, 500),
    new Point(w, 600),
    'green'
)
```

To make a field of grass, you can make several calls to the draw() function. The background will be drawn first, and the foreground last.

```
// Draw a fluffy field of grass
draw(
    new Point(0, 400),
    new Point(w+20, 200),
    '#9ef95e'
);
draw(
    new Point(0, 400),
    new Point(w+20, 600),    
    '#6cb737'
);
draw(
    new Point(0, 700),
    new Point(w+20, 400),
    '#3a7a0d'
);
```


Improvements and fork requests are welcome.

### Installation and usage
```
git clone
open index.html
refresh the page for new scenery!
```