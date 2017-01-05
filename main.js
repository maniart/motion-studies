function createOnceLog() {
  var counter = 0;
  return function onceLog() {
    if(counter < 1) {
      console.log.apply(console, arguments);
    }
    counter ++;
  }
}
var logger = createOnceLog();

var BLACK = '#000';
var GREY = '#eee';

var containerEl = document.querySelector('#container');

function Word(text) {
  this.text = text;
  this.el = document.createElement('span');
  this.el.innerText = this.text;
  this.timer = null;
  this.active = false;
};

Word.prototype.setText = function setText(text) {
  this.text = text;
  this.el.innerText = text;
  return this;
};

Word.prototype.setActive = function setActive(isActive) {
  this.active = isActive;
  return this;
};

Word.prototype.changeColor = function changeColor(color) {
  this.el.style.color = color;
  return this;
};

Word.prototype.react = function react() {
  if (this.active) {
    return;
  }

  var reset = function() {
    this.setActive(false).changeColor(GREY);
    window.clearTimeout(this.timer);
    this.timer = null;
  }.bind(this);

  this
    .setActive(true)
    .changeColor(BLACK);

  this.timer = window.setTimeout(reset, 500);

  return this;
};

var text = "Mulvey identifies three \"looks\" or perspectives that occur in film which, she argues, serve to sexually objectify women. The first is the perspective of the male character on screen and how he perceives the female character. The second is the perspective of the spectator as they see the female character on screen. The third \"look\" joins the first two looks together: it is the male audience member's perspective of the male character in the film. This third perspective allows the male audience to take the female character as his own personal sex object because he can relate himself, through looking, to the male character in the film. Gaze the male audience member's perspective of the male character in the film. This third perspective allows the male audience to take the female character as his own personal sex object because he can relate himself, through looking, to the male character Gaze.".split(' ');

var words = [];

var word;

var timer;

var row;

text.forEach(function(value, index) {
  word = new Word(value);
  words.push(word);

  if(index % 15 === 0) {
    row = document.createElement('div');
    row.className = 'row';
    containerEl.appendChild(row);
  }

  row.appendChild(word.el);

});

var diffy = Diffy.create({
  resolution: { x: 15, y: 10 },
  sensitivity: 0.5,
  threshold: 20,
  debug: true,
  containerClassName: 'my-diffy-container',
  sourceDimensions: { w: 130, h: 100 },
  onFrame: function (matrix) {
    for(var i = 0; i < matrix.length; i ++) {
      for(var j = 0; j < matrix[i].length; j ++) {
        var pos = (j * matrix.length) + i;

        if(matrix[i][j] < 100) {

          words[pos].react();
          // words[pos].setActive(true);

        } else {

          // words[pos].el.style.color = '#eee';
          // words[pos].setActive(false);

        }
      }
    }
  }
});
console.log(words.length);

