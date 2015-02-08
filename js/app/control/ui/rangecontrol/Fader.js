/**
 * @namespace Snautsynth.Control.UI.RangeControl
 */
define(
    [
        'dejavu',
        'app/control/ui/rangecontrol/RangeControl',
        'app/event/Event',
        'kinetic',
        'app/util/Position'
    ],
    function(
        dejavu,
        RangeControl,
        Event,
        Kinectic,
        Position
    ) {
        'use strict';

        var Fader = dejavu.Class.declare({
            $name: 'Fader',

            $extends: RangeControl,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             * @protected
             *
             * @type {string}
             */
            _borderColor:        null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             * @protected
             *
             * @type {string}
             */
            _color:              null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             * @protected
             *
             * @type {Kinetic.Rect}
             */
            _faderBorder:        null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             * @protected
             *
             * @type {Kinetic.Rect}
             */
            _faderKnob:          null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             * @protected
             *
             * @type {number}
             */
            _length:             null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             * @protected
             *
             * @type {number}
             */
            _orientation:        null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             * @protected
             *
             * @type {number}
             */
            _tmpPosition:        null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             * @protected
             *
             * @type {number}
             */
            _trackLength:        null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             * @protected
             *
             * @type {number}
             */
            _startTrackPosition: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             * @protected
             *
             * @type {Kinetic.Rect}
             */
            _valueDisplayArea:   null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             * @protected
             *
             * @type {Kinetic.Text}
             */
            _valueDisplayText:   null,

            $constants: {
                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Fader
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                ORIENTATION_HORIZONTAL :  0,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Fader
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                ORIENTATION_VERTICAL:     1,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Fader
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                LABEL_OFFSET:             20,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Fader
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                FADER_KNOB_HEIGHT:        30,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Fader
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                FADER_KNOB_WIDTH:         40,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Fader
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                FADER_TRACK_HEIGHT:       30,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Fader
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                FADER_TRACK_BORDER_WIDTH: 5,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Fader
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                BORDER_RADIUS:            3,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Fader
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                VAL_DISPLAY_AREA_WIDTH:   60,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Fader
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                VAL_DISPLAY_AREA_HEIGHT:  30,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Fader
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                VAL_DISPLAY_FONT_SIZE:    18
            },

            /**
             * @constructor
             * @class Snautsynth.Control.UI.RangeControl.Fader
             * @extends Snautsynth.Control.UI.RangeControl.RangeControl
             *
             * @param {number}                                         id
             * @param {Snautsynth.Util.Position}                       position
             * @param {number}                                         value
             * @param {Snautsynth.Canvas.CanvasState}                  canvasState
             * @param {number}                                         valueDspMult
             * @param {Snautsynth.DataType.NumberRange}                valueRange
             * @param {number}                                         length
             * @param {string}                                         color
             * @param {Snautsynth.Control.UI.RangeControl.SnapOptions} snapOptions
             * @param {Snautsynth.Util.Formatter.NumberFormatter}      formatter
             * @param {number}                                         orientation
             */
            initialize: function(
                id,
                position,
                value,
                canvasState,
                valueDspMult,
                valueRange,
                length,
                color,
                snapOptions,
                formatter,
                orientation
            ) {
                this.$super(
                    id,
                    position,
                    value,
                    canvasState,
                    valueDspMult,
                    valueRange,
                    snapOptions,
                    formatter
                );

                this._length      = length;
                this._color       = color;
                this._orientation = orientation;

                var height        = this._length;
                var width         = Fader.FADER_TRACK_HEIGHT;

                if (Fader.ORIENTATION_HORIZONTAL === this._orientation) {
                    height = Fader.FADER_TRACK_HEIGHT;
                    width  = this._length;
                }

                //create border
                this._faderBorder = new Kinectic.Rect({
                    cornerRadius: Fader.BORDER_RADIUS,
                    height:       height,
                    width:        width,
                    strokeWidth:  Fader.FADER_TRACK_BORDER_WIDTH,

                    fill:         color,
                    stroke:       '#000',

                    id:           id
                });

                this._kineticGroup.add(this._faderBorder);

                this._trackLength = this._length * 0.9;
                this._tmpPosition = this.calcPositionFromValue(value);

                this._startTrackPosition = new Position(
                    Fader.FADER_TRACK_HEIGHT / 2,
                    (this._length - this._trackLength) / 2
                );

                if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                    this._startTrackPosition = new Position(
                        (this._length - this._trackLength) / 2,
                        Fader.FADER_TRACK_HEIGHT / 2
                    );
                }

                var startTrackX = this._startTrackPosition.getX();
                var startTrackY = this._startTrackPosition.getY();

                var endPointX = startTrackX;
                var endPointY = startTrackY + this._trackLength;

                if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                    endPointX = startTrackX + this._trackLength;
                    endPointY = startTrackY;
                }

                // create track-line
                var trackLine = new Kinetic.Line({
                    points:      [startTrackX, startTrackY, endPointX, endPointY],
                    strokeWidth: Fader.FADER_TRACK_BORDER_WIDTH,
                    lineCap:     'round',
                    lineJoin:    'round',

                    stroke:      '#000'
                });

                this._kineticGroup.add(trackLine);

                height = Fader.FADER_KNOB_HEIGHT;
                width  = Fader.FADER_KNOB_WIDTH;

                if (Fader.ORIENTATION_HORIZONTAL === this._orientation) {
                    height = Fader.FADER_KNOB_WIDTH;
                    width  = Fader.FADER_KNOB_HEIGHT;
                }

                //create handle
                this._faderKnob = new Kinetic.Rect({
                    cornerRadius: Fader.BORDER_RADIUS,
                    height:       height,
                    width:        width,
                    strokeWidth:  Fader.FADER_TRACK_BORDER_WIDTH,

                    fill:         color,
                    stroke:       '#000'
                });

                this._kineticGroup.add(this._faderKnob);

                var displayAreaX = startTrackX - (Fader.VAL_DISPLAY_AREA_WIDTH / 2);
                var displayAreaY = this._trackLength + Fader.VAL_DISPLAY_AREA_HEIGHT;

                if (Fader.ORIENTATION_HORIZONTAL === this._orientation) {
                    displayAreaX = (-1) * Fader.VAL_DISPLAY_AREA_WIDTH - (startTrackX);
                    displayAreaY = 0;
                }


                //create value display
                this._valueDisplayArea = new Kinetic.Rect({
                    x:            displayAreaX,
                    y:            displayAreaY,
                    cornerRadius: Fader.BORDER_RADIUS,
                    height:       Fader.VAL_DISPLAY_AREA_HEIGHT,
                    width:        Fader.VAL_DISPLAY_AREA_WIDTH,
                    strokeWidth:  Fader.FADER_TRACK_BORDER_WIDTH,
                    fill:         color,
                    stroke:       '#000'
                });

                this._kineticGroup.add(this._valueDisplayArea);

                this._valueDisplayText = new Kinetic.Text({
                    fill:     '#000',
                    fontSize: Fader.VAL_DISPLAY_FONT_SIZE
                });

                this._kineticGroup.add(this._valueDisplayText);

                this.updateValueDisplayText();

                this.updateKnobPosition(this._tmpPosition);

                var myFader = this;

                var container = this.getCanvasState().getContainer();

                // add eventlistener for mousedown => lock mouse
                this._faderKnob.on('mousedown', function(evt) {
                    myFader.getCanvasState().lockPointer();
                    myFader.getCanvasState().setLastValue(myFader.getValue());
                    myFader.setSelected(true);
                });

                container.addEventListener('mousemove', function(evt) {
                    if (myFader.getSelected()) {
                        var mousePos  = myFader.getCanvasState().getMousePosition(evt);
                        var baseLayer = myFader.getCanvasState().getBaseLayer();

                        myFader.update(mousePos);
                        baseLayer.setAttr(
                            'event',
                            new Event(myFader.getId(), myFader.getValue(), Event.TYPE_VALUE_CHANGED)
                        );
                    }
                });

                container.addEventListener('mouseup', function(evt) {
                    if (myFader.getSelected()) {
                        myFader.setSelected(false);
                        myFader.getCanvasState().unlockPointer();
                    }
                });


                if (null !== snapOptions) {
                    container.addEventListener('dblclick', function(evt) {
                        var stage      = myFader.getCanvasState().getStage();
                        var pointerPos = stage.getPointerPosition();
                        var shape      = stage.getIntersection(pointerPos);

                        if (!shape) {
                            return;
                        }

                        if (myFader.getId() === shape.getId()) {
                            myFader.setValue(snapOptions.getDoubleClickSnapValue());
                            var position = myFader.calcPositionFromValue(myFader.getValue());
                            myFader.updateKnobPosition(position);
                        }
                    });
                }
            },

            /**
             * Calculates faderknob-coordinates from position
             *
             * @param {number} position
             *
             * @return {Object}
             */
            calcKnobPosition: function(position) {
                var knob         = this._faderKnob;
                var knobHeight   = knob.getHeight();
                var knobWidth    = knob.getWidth();
                var startTrackX  = this._startTrackPosition.getX();
                var startTrackY  = this._startTrackPosition.getY();
                var knobX, knobY = 0;

                if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                    knobX = startTrackX + (position - knobWidth / 2);
                    knobY = startTrackY - knobHeight / 2;
                } else {
                    knobX = startTrackX - knobWidth / 2;
                    knobY = startTrackY + (this._trackLength - position - knobHeight / 2);
                }

                return new Position(
                    knobX,
                    knobY
                );
            },

            /**
             * Calculates faderknob-position from value
             *
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             *
             * @param {number} value
             *
             * @return {number}
             */
            calcPositionFromValue: function(value) {
                // _trackLength => valueRange
                // position => value
                return (this._trackLength * value) / this._valueRange.calcRange();
            },


            /**
             * Calculates value from position
             *
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             *
             * @param {number} position
             *
             * @return {number}
             */
            calcValueFromPosition: function(position) {
                // valueRange => this._trackLength
                // value => position
                if (0 == position) {
                    return this._valueRange.getMin();
                } else {
                    return this._valueRange.getMin() + (this._valueRange.calcRange() * position) / this._trackLength;
                }
            },

            /**
             * Updates value and track-knob-position on mouse-move
             *
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             *
             * @param {Snautsynth.Util.Position} mousePos
             */
            update: function(mousePos) {
                if(this._selected) {
                    var forward       = false;
                    var lastValue     = this._canvasState.getLastValue();
                    var mouseDelta    = 0;
                    var maxMouseDelta = 200;
                    var maxPosition   = this._trackLength;

                    var value;

                    if (Fader.ORIENTATION_HORIZONTAL === this._orientation) {
                        mouseDelta = mousePos.getX();
                    } else {
                        mouseDelta = (-1) * mousePos.getY();
                    }

                    var snapOptions = this.getSnapOptions();
                    var speedup     = Math.abs((10 * mouseDelta) / maxMouseDelta);
                    var speed       = 2.05;
                    var mouseMoves  = true;


                    if (null === snapOptions || (null !== snapOptions && 0 === snapOptions.getSnapStep())) {
                        speed = speed * speedup;
                    }

                    if (mouseDelta < 0) {
                        if ( (this._tmpPosition - speed) > 0) {
                            this._tmpPosition -= speed;
                        } else {
                            this._tmpPosition = 0;
                        }
                        forward = true;
                    } else if (mouseDelta > 0) {
                        if ( (this._tmpPosition + speed) < maxPosition) {
                            this._tmpPosition += speed;
                        } else {
                            this._tmpPosition = maxPosition;
                        }
                    } else {
                        mouseMoves = false;
                    }

                    value = this.calcValueFromPosition(this._tmpPosition);

                    if (mouseMoves) {
                        if (null !== snapOptions && 0 !== snapOptions.getSnapStep()) {
                            var step = 0;

                            if (Math.abs(value - lastValue) >= this._snapStep - this._snapDistance) {
                                step = snapOptions.getSnapStep();
                            }

                            if (0 !== step) {
                                if (!forward) {
                                    if (this._value + step <= this._valueRange.getMax()) {
                                        this._value = this._value + step;
                                    } else {
                                        this._value = this._valueRange.getMax();
                                    }
                                } else {
                                    if (this._value - step >= this._valueRange.getMin()) {
                                        this._value = this._value - step;
                                    } else {
                                        this._value = this._valueRange.getMin();
                                    }
                                }
                                this._canvasState.setLastValue(this._value);
                                this._tmpPosition = this.calcPositionFromValue(this._value);
                                this.updateKnobPosition(this._tmpPosition);
                                this.updateValueDisplayText();
                            }
                        } else {
                            this._value = value;
                            this.updateKnobPosition(this._tmpPosition);
                            this.updateValueDisplayText();
                        }
                    }
                }
            },

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             *
             * @param {number} position
             */
            updateKnobPosition: function(position) {
                var knob  = this._faderKnob;
                var coord = this.calcKnobPosition(position) ;

                knob.setX(coord.getX());
                knob.setY(coord.getY());
            },

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Fader
             * @instance
             */
            updateValueDisplayText: function() {
                var text = this._formatter.format(this._value * this._valueDspMult);

                this._valueDisplayText.setText(text);

                var textWidth  = this._valueDisplayText.getTextWidth();
                var textHeight = this._valueDisplayText.getTextHeight();

                var displayTextX = this._startTrackPosition.getX() - (textWidth / 2);
                var displayTextY =
                    this._valueDisplayArea.getY() +
                    (this._valueDisplayArea.getHeight() / 2) -
                    (textHeight / 2);

                if (Fader.ORIENTATION_HORIZONTAL === this._orientation) {
                    displayTextX = this._valueDisplayArea.getX() + (Fader.VAL_DISPLAY_AREA_WIDTH / 2) - (textWidth / 2);
                }

                this._valueDisplayText.setX(displayTextX);
                this._valueDisplayText.setY(displayTextY);
            }
        });

        return Fader;
});
