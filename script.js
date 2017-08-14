document.addEventListener("touchmove", function(event){
    event.preventDefault();
})
var c = document.getElementsByTagName('canvas')[0]
x = c.getContext('2d')
pr = window.devicePixelRatio || 1
w = window.innerWidth
h = window.innerHeight
f = 90
q
m = Math
r = 0
u = m.PI*2
v = m.cos
z = m.random