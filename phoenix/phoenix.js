#!/usr/bin/env coffee -p

# Preferences
Phoenix.set
  daemon: true
  openAtLogin: true

# Globals
HIDDEN_DOCK_MARGIN = 3
INCREMENT = 0.05
CONTROL_SHIFT = [ 'ctrl', 'shift' ]

# Relative Directions
LEFT = 'left'
RIGHT = 'right'
CENTRE = 'centre'

# Cardinal Directions
NW = 'nw'
NE = 'ne'
SE = 'se'
SW = 'sw'

class ChainWindow

  constructor: (@window, @margin = 10) ->
    @parent = @window.screen().visibleFrameInRectangle()
    @update()

  update: ->
    @frame = @window.frame()
    @difference =
      x: @parent.x - @frame.x
      y: @parent.y - @frame.y
      width: @parent.width - @frame.width
      height: @parent.height - @frame.height

  to: (direction) ->

    # X-coordinate
    switch direction
      when NW, SW
        @frame.x = @parent.x + @margin
      when NE, SE
        @frame.x = @parent.x + @difference.width - @margin
      when CENTRE
        @frame.x = @parent.x + (@difference.width / 2)

    # Y-coordinate
    switch direction
      when NW, NE
        @frame.y = @parent.y + @margin
      when SE, SW
        @frame.y = @parent.y + @difference.height - @margin
      when CENTRE
        @frame.y = @parent.y + (@difference.height / 2)

    this

  resize: (factor) ->
    if factor.x?
      delta = Math.min @parent.width * factor.x, @difference.width + @difference.x - @margin
      @frame.width += delta
    if factor.y?
      delta = Math.min @parent.height * factor.y, @difference.height - @frame.y + @margin + HIDDEN_DOCK_MARGIN
      @frame.height += delta
    this

  maximise: ->
    @frame.width = @parent.width - (2 * @margin)
    @frame.height = @parent.height - (2 * @margin)
    this

  halve: ->
    @frame.width /= 2
    this

  fill: (direction) ->
    @maximise()
    @halve() if direction?
    switch direction
      when LEFT then @to NW
      when RIGHT then @to NE
      else @to NW
    this

  set: ->
    @window.setFrame @frame
    @update()
    this

Window::chain = ->
  new ChainWindow this

# Position Bindings

Key.on 'q', CONTROL_SHIFT, ->
  Window.focused()?.chain().to(NW).set()

Key.on 'w', CONTROL_SHIFT, ->
  Window.focused()?.chain().to(NE).set()

Key.on 's', CONTROL_SHIFT, ->
  Window.focused()?.chain().to(SE).set()

Key.on 'a', CONTROL_SHIFT, ->
  Window.focused()?.chain().to(SW).set()

Key.on 'z', CONTROL_SHIFT, ->
  Window.focused()?.chain().to(CENTRE).set()

# Size Bindings

Key.on 'å', CONTROL_SHIFT, ->
  Window.focused()?.chain().fill().set()

Key.on 'o', CONTROL_SHIFT, ->
  Window.focused()?.chain().fill(LEFT).set()

Key.on 'p', CONTROL_SHIFT, ->
  Window.focused()?.chain()
    .fill(RIGHT)
    .set()
    .to(NE) # Ensure position for windows larger than expected
    .set()

Key.on '¨', CONTROL_SHIFT, ->
  Window.focused()?.chain().resize(y: -INCREMENT).set()

Key.on "'", CONTROL_SHIFT, ->
  Window.focused()?.chain().resize(y: INCREMENT).set()

Key.on 'ö', CONTROL_SHIFT, ->
  Window.focused()?.chain().resize(x: -INCREMENT).set()

Key.on 'ä', CONTROL_SHIFT, ->
  Window.focused()?.chain().resize(x: INCREMENT).set()

# Focus Bindings

Key.on '<', CONTROL_SHIFT, ->
  [ ..., last ] = Window.recent()
  last?.focus();
