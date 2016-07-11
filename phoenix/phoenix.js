'use strict';

var controlShift = [ 'ctrl', 'shift' ];
var controlAltShift = [ 'ctrl', 'alt', 'shift' ];
var margin = 10;
var increment = 0.1;

/* Preferences */

Phoenix.set({
  daemon: true,
  openAtLogin: true
});

/* Position */

var Position = {

  central: function (frame, window) {
    return {
      x: frame.x + ((frame.width - window.width) / 2),
      y: frame.y + ((frame.height - window.height) / 2)
    };
  },

  top: function (frame, window) {
    return {
      x: window.x,
      y: frame.y
    };
  },

  bottom: function (frame, window) {
    return {
      x: window.x,
      y: (frame.y + frame.height) - window.height
    };
  },

  left: function (frame, window) {
    return {
      x: frame.x,
      y: window.y
    };
  },

  right: function (frame, window) {
    return {
      x: (frame.x + frame.width) - window.width,
      y: window.y
    };
  },

  topLeft: function (frame, window, margin) {
    return {
      x: Position.left(frame, window).x + margin,
      y: Position.top(frame, window).y + margin
    };
  },

  topRight: function (frame, window, margin) {
    return {
      x: Position.right(frame, window).x - margin,
      y: Position.top(frame, window).y + margin
    };
  },

  bottomLeft: function (frame, window, margin) {
    return {
      x: Position.left(frame, window).x + margin,
      y: Position.bottom(frame, window).y - margin
    };
  },

  bottomRight: function (frame, window, margin) {
    return {
      x: Position.right(frame, window).x - margin,
      y: Position.bottom(frame, window).y - margin
    };
  }
};

/* Grid */

var Frame = {
  width: 1,
  height: 1,
  half: {
    width: 0.5,
    height: 0.5
  }
};

/* Window Functions */

Window.prototype.to = function (position) {
  this.setTopLeft(position(this.screen().visibleFrameInRectangle(), this.frame(), margin));
}

Window.prototype.grid = function (x, y, reverse) {

  var frame = this.screen().visibleFrameInRectangle();

  var newWindowFrame = _(this.frame()).extend({
    width: (frame.width * x) - (2 * margin),
    height: (frame.height * y) - (2 * margin)
  });

  var position = reverse ? Position.topRight(frame, newWindowFrame, margin) :
                           Position.topLeft(frame, newWindowFrame, margin);

  this.setFrame(_(newWindowFrame).extend(position));
}

Window.prototype.reverseGrid = function (x, y) {
  this.grid(x, y, true);
}

Window.prototype.resize = function (multiplier) {

  var frame = this.screen().visibleFrameInRectangle();
  var newSize = this.size();

  if (multiplier.x) {
    newSize.width += frame.width * multiplier.x;
  }

  if (multiplier.y) {
    newSize.height += frame.height * multiplier.y;
  }

  this.setSize(newSize);
}

Window.prototype.increaseWidth = function () {
  this.resize({ x: increment });
}

Window.prototype.decreaseWidth = function () {
  this.resize({ x: -increment });
}

Window.prototype.increaseHeight = function () {
  this.resize({ y: increment });
}

Window.prototype.decreaseHeight = function () {
  this.resize({ y: -increment });
}

/* Position Bindings */

Key.on('q', controlShift, function () {
  Window.focused() && Window.focused().to(Position.topLeft);
});

Key.on('w', controlShift, function () {
  Window.focused() && Window.focused().to(Position.topRight);
});

Key.on('a', controlShift, function () {
  Window.focused() && Window.focused().to(Position.bottomLeft);
});

Key.on('s', controlShift, function () {
  Window.focused() && Window.focused().to(Position.bottomRight);
});

Key.on('z', controlShift, function () {
  Window.focused() && Window.focused().to(Position.central);
});

/* Grid Bindings */

Key.on('p', controlShift, function () {
  Window.focused() && Window.focused().grid(Frame.half.width, Frame.half.height);
});

Key.on('å', controlShift, function () {
  Window.focused() && Window.focused().grid(Frame.width, Frame.half.height);
});

Key.on('ö', controlShift, function () {
  Window.focused() && Window.focused().grid(Frame.half.width, Frame.height);
});

Key.on('ä', controlShift, function () {
  Window.focused() && Window.focused().grid(Frame.width, Frame.height);
});

/* Reverse Grid Bindings */

Key.on('å', controlAltShift, function () {
  Window.focused() && Window.focused().reverseGrid(Frame.half.width, Frame.half.height);
});

Key.on('p', controlAltShift, function () {
  Window.focused() && Window.focused().reverseGrid(Frame.width, Frame.half.height);
});

Key.on('ä', controlAltShift, function () {
  Window.focused() && Window.focused().reverseGrid(Frame.half.width, Frame.height);
});

Key.on('ö', controlAltShift, function () {
  Window.focused() && Window.focused().reverseGrid(Frame.width, Frame.height);
});

/* Resize Bindings */

Key.on(',', controlShift, function () {
  Window.focused() && Window.focused().increaseWidth();
});

Key.on('.', controlShift, function () {
  Window.focused() && Window.focused().increaseHeight();
});

Key.on(',', controlAltShift, function () {
  Window.focused() && Window.focused().decreaseWidth();
});

Key.on('.', controlAltShift, function () {
  Window.focused() && Window.focused().decreaseHeight();
});
