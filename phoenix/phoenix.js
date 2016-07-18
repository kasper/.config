#!/usr/bin/env coffee -p

# Preferences
Phoenix.set
  daemon: true
  openAtLogin: true

# Globals
HIDDEN_DOCK_MARGIN = 3
INCREMENT = 0.05
CONTROL_SHIFT = [ 'ctrl', 'shift' ]
CONTROL_ALT_SHIFT = [ 'ctrl', 'alt', 'shift' ]

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

  # Update frames
  update: ->
    @frame = @window.frame()
    @difference =
      x: @parent.x - @frame.x
      y: @parent.y - @frame.y
      width: @parent.width - @frame.width
      height: @parent.height - @frame.height

  # Set frame
  set: ->
    @window.setFrame @frame
    @update()
    this

  # Move to screen
  screen: (screen) ->
    @parent = screen.visibleFrameInRectangle()
    @update()
    this

  # Move to cardinal directions NW, NE, SE, SW or relative direction CENTRE
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

  # Resize SE-corner by factor
  resize: (factor) ->
    if factor.width?
      delta = Math.min @parent.width * factor.width, @difference.width + @difference.x - @margin
      @frame.width += delta
    if factor.height?
      delta = Math.min @parent.height * factor.height, @difference.height - @frame.y + @margin + HIDDEN_DOCK_MARGIN
      @frame.height += delta
    this

  # Maximise to fill whole screen
  maximise: ->
    @frame.width = @parent.width - (2 * @margin)
    @frame.height = @parent.height - (2 * @margin)
    this

  # Halve width
  halve: ->
    @frame.width /= 2
    this

  # Fit to screen
  fit: ->
    @maximise() if @difference.width < 0 or @difference.height < 0
    this

  # Fill relatively to LEFT or RIGHT-side of screen, or fill whole screen
  fill: (direction) ->
    @maximise()
    @halve() if direction?
    switch direction
      when LEFT then @to NW
      when RIGHT then @to NE
      else @to NW
    this

# Chain a Window-object
Window::chain = ->
  new ChainWindow this

# To direction in screen
Window::to = (direction, screen) ->
  window = @chain()
  window.screen(screen).fit() if screen?
  window.to(direction).set()

# Position Bindings

Key.on 'q', CONTROL_SHIFT, ->
  Window.focused()?.to(NW)

Key.on 'w', CONTROL_SHIFT, ->
  Window.focused()?.to(NE)

Key.on 's', CONTROL_SHIFT, ->
  Window.focused()?.to(SE)

Key.on 'a', CONTROL_SHIFT, ->
  Window.focused()?.to(SW)

Key.on 'z', CONTROL_SHIFT, ->
  Window.focused()?.to(CENTRE)

Key.on 'q', CONTROL_ALT_SHIFT, ->
  window = Window.focused()
  window?.to(NW, window.screen().next())

Key.on 'w', CONTROL_ALT_SHIFT, ->
  window = Window.focused()
  window?.to(NE, window.screen().next())

Key.on 's', CONTROL_ALT_SHIFT, ->
  window = Window.focused()
  window?.to(SE, window.screen().next())

Key.on 'a', CONTROL_ALT_SHIFT, ->
  window = Window.focused()
  window?.to(SW, window.screen().next())

Key.on 'z', CONTROL_ALT_SHIFT, ->
  window = Window.focused()
  window?.to(CENTRE, window.screen().next())

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

Key.on 'ä', CONTROL_SHIFT, ->
  Window.focused()?.chain().resize(width: INCREMENT).set()

Key.on 'ö', CONTROL_SHIFT, ->
  Window.focused()?.chain().resize(width: -INCREMENT).set()

Key.on "'", CONTROL_SHIFT, ->
  Window.focused()?.chain().resize(height: INCREMENT).set()

Key.on '¨', CONTROL_SHIFT, ->
  Window.focused()?.chain().resize(height: -INCREMENT).set()

# Focus Bindings

Key.on '<', CONTROL_SHIFT, ->
  [ ..., last ] = Window.recent()
  last?.focus()
