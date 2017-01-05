var SCALE = 5;
var THRESHOLD = 100;
var BASE_DIM = { w: 150, h: 100};
var RESOLUTION = { x: 15, y: 10};
var matrix = null;

function updateMatrix(newMatrix) {
  matrix = newMatrix;
}

var containerEl = document.querySelector('#container');
var params = { width: 650, height: 500 };
var two = new Two(params).appendTo(containerEl);
var circle;
var xUnit;
var yUnit;
var x;
var y;
var centerX;
var centerY;

var circles = [];

for(var j = 0; j < RESOLUTION.y; j ++) {
  for(var i = 0; i < RESOLUTION.x; i ++) {
    // debugger
    xUnit = BASE_DIM.w / RESOLUTION.x;
    yUnit = BASE_DIM.h / RESOLUTION.y;

    x = (i / RESOLUTION.x) *  BASE_DIM.w;
    y = (j / RESOLUTION.y) *  BASE_DIM.h;

    centerX = x + (xUnit / 2);
    centerY = y + (yUnit / 2);

    console.log(centerX, centerY);
    circle = two.makeCircle(centerX, centerY, 2);
    circle.noStroke();
    circle.fill = '#000';
    circle.scale = 0;

    circles.push(circle);

  }
}

var group = two.makeGroup(circles);
group.scale = 5;
var row;
var value;
var circleIndex;

two.bind('update', function(frm) {
  // initially it's null
  if(matrix === null) {
    return;
  }
  for(var i = 0; i < matrix.length; i ++) {
    var row = matrix[i];
    for(var j = 0; j < row.length; j ++) {
      value = row[j];
      circleIndex = (j * row.length) + i;
      // debugger
      if(value < THRESHOLD) {
        // console.log(circleIndex);
        // console.log(circleIndex);

        group.children[circleIndex].scale = 1;
      } else {
        group.children[circleIndex].scale = 0;
      }
    }
  }

}).play();



var diffy = Diffy.create({
  resolution: { x: 15, y: 10 },
  sensitivity: 0.5,
  threshold: 20,
  debug: true,
  containerClassName: 'diffy-container',
  sourceDimensions: { w: 130, h: 100 },
  onFrame: updateMatrix
});
