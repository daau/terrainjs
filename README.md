# TerrainJS

### Earth
![Screenshot](/earth.png?raw=true "Screenshot")

### Mars
![Screenshot](/mars.png?raw=true "Screenshot")


This is a midpoint displacement (AKA diamond-square) based terrain generator, written in Javascript. A dynamically fitted canvas is created, and a background colour can be set. You can then draw as many terrain curves as you'd like by calling the createTerrain() function. The terrain curve itself is generated recursively. The createTerrain() function takes three arguments: a starting point, an endpoint, and a colour. Example usage follows, below:

The following code sets the background colour.

```javascript
setBackground('brown');
// alternatively
setBackground('#1d95f2');
```

And, the following code will generate a green terrain curve, starting from (x:0 y:500) and ending at (x:w, y:600) where w is the width of the browser.
```javascript
createTerrain(
    new Point(0, 500),
    new Point(w, 600),
    'green'
)
```

To make a field of grass, you can make several calls to the createTerrain() function. The background will be drawn first, and the foreground last.

```javascript
// Draw a fluffy field of grass
createTerrain(
    new Point(0, 400),
    new Point(w, 200),
    '#9ef95e' // Light green
);
createTerrain(
    new Point(0, 400),
    new Point(w, 600),    
    '#6cb737' // Medium green
);
createTerrain(
    new Point(0, 700),
    new Point(w, 400),
    '#3a7a0d' // Dark green
);
```

### Customization
Changing the DECAY, DECAY_RATE, and MIN_Y constants will affect the aggressiveness of the terrain "bumps." By adjusting these values, you can create very beautiful scenery. One example would be to have an aggressive decay rate for the foreground curve, but unaggressive decay rate for the background.

Changing the MIN_X constant sets the resoution of the terrain curve.


### Contributing
Improvements and fork requests are welcome.

### Installation and usage
```
git clone
open index.html in your browser
refresh the page for new scenery!
```

### License
This software is released under the MIT license.