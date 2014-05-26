define(['dejavu', 'app/controls/ui/RangeControl', 'app/event/Event', 'kinetic'],
    function(dejavu, RangeControl, Event, Kinectic){
    var Fader = dejavu.Class.declare({
        $name: 'Fader',

        $extends: RangeControl,

        _borderColor: null,

        _color: null,

        _faderBorder: null,

        _faderKnob: null,

        _position: null,

        _tmpPosition: null,

        _orientation: null,

        _length: null,

        _trackLength: null,

        $constants: {
            ORIENTATION_HORIZONTAL :  0,
            ORIENTATION_VERTICAL:     1,
            LABEL_OFFSET:             20,
            FADER_KNOB_HEIGHT:        30,
            FADER_KNOB_WIDTH:         40,
            FADER_TRACK_HEIGHT:       30,
            FADER_TRACK_BORDER_WIDTH: 5,
            BORDER_RADIUS:            3
        },

        initialize: function (
            id, x, y, value, canvasState,
            label, valueDspMult, minValue, maxValue,
            length, color, snapStep, snapDistance,
            doubleClickSnapValue, formatter,
            orientation ) {
            this.$super(id, x, y, value, canvasState, label, valueDspMult, minValue, maxValue, snapStep,
                snapDistance, doubleClickSnapValue, formatter );

            this._length      = length;
            this._color       = color;
            this._orientation = orientation;

            height            = this._length;
            width             = Fader.FADER_TRACK_HEIGHT;

            if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
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
                stroke:       '#000'
            });

            this._kineticGroup.add(this._faderBorder);

            this._trackLength = this._length * 0.9;

            this._tmpPosition = this.calcPositionFromValue(value);

            startPointX     = Fader.FADER_TRACK_HEIGHT / 2;
            startPointY     = (this._length - this._trackLength) / 2;

            if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                startPointX = (this._length - this._trackLength) / 2;
                startPointY = Fader.FADER_TRACK_HEIGHT / 2;
            }

            endPointX       = startPointX;
            endPointY       = startPointY + this._trackLength;

            if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                endPointX = startPointX + this._trackLength;
                endPointY = startPointY;
            }

            // create track-line
            trackLine = new Kinetic.Line({
                points:      [startPointX, startPointY, endPointX, endPointY],
                strokeWidth: Fader.FADER_TRACK_BORDER_WIDTH,
                lineCap:     'round',
                lineJoin:    'round',

                stroke:      '#000'
            });

            this._kineticGroup.add(trackLine);

            height = Fader.FADER_KNOB_HEIGHT;
            width  = Fader.FADER_KNOB_WIDTH;

            if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                height = Fader.FADER_KNOB_WIDTH;
                width  = Fader.FADER_KNOB_HEIGHT;
            }

            knobPos = this.calcKnobPosition(
                this._tmpPosition,
                height,
                width,
                startPointX,
                startPointY
            );

            //create handle
            this._faderKnob = new Kinetic.Rect({
                x:            knobPos.x,
                y:            knobPos.y,
                cornerRadius: Fader.BORDER_RADIUS,
                height:       height,
                width:        width,
                strokeWidth:  Fader.FADER_TRACK_BORDER_WIDTH,

                fill:         color,
                stroke:       '#000'
            });

            this._kineticGroup.add(this._faderKnob);


            var myFader = this;

            // add eventlistener for mousedown => lock mouse
            this._faderKnob.on('mousedown', function(evt) {
                myFader.getCanvasState().lockPointer();
                myFader.getCanvasState().setLastValue(myFader.getValue());
                myFader.setSelected(true);
            });

            this._faderKnob.on('mousemove', function(evt) {
                var mousePos  = myFader.getCanvasState().getMousePosition(evt);
                var baseLayer = myFader.getCanvasState().getBaseLayer();

                myFader.update(mousePos);
                baseLayer.setAttr('event', new Event(this._id, this._value, Event.TYPE_VALUE_CHANGED));
            });

            this._faderKnob.on('mouseup mouseleave', function(evt) {
                myFader.getCanvasState().unlockPointer();
                myFader.setSelected(false);
            });

            this._kineticGroup.on('dblclick', function(evt) {

            });
        },

        calcKnobPosition: function(position, knobHeight, knobWidth, startPointX, startPointY) {
            if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                knobX = startPointX + position - knobWidth / 2;
                knobY = startPointY - knobHeight / 2;
            } else {
                knobX = startPointX - knobWidth / 2;
                knobY = startPointY + position - knobHeight / 2;
            }

            return {
                x: knobX,
                y: knobY
            };
        },

        calcPositionFromValue: function(value) {
            var minValue   = this._minValue;
            var maxValue   = this._maxValue;
            var valueRange = this._maxValue - this._minValue;

            return (this._trackLength * value) / valueRange;
        },

        calcValueFromPosition: function(position) {
            var minValue   = this._minValue;
            var maxValue   = this._maxValue;
            var valueRange = this._maxValue - this._minValue;

            // valueRange => this._trackLength
            // value => position

            if (0 == position) {
                return 0;
            } else {
                return (valueRange * position) / this._trackLength;
            }
        },

        update: function(mousePos) {
            if(this._selected) {
                var mouseDelta    = 0;
                var maxMouseDelta = 200;

                var maxPosition   = this._trackLength;


                if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                    mouseDelta = mousePos.getX();
                } else {
                    mouseDelta = mousePos.getY();
                }

                var speedup    = Math.abs((10 * mouseDelta) / maxMouseDelta);
                var speed      = 0.05

                var mouseMoves = true;

                if (0 == this._snapStep) {
                    speed = speed * speedup;
                }


                if (mouseDelta < 0) {
                    if ( (this._tmpPosition - speed) > 0) {
                        this._tmpPosition -= speed;
                    } else {
                        this._tmpPosition = 0;
                    }
                } else if (mouseDelta > 0) {
                    if ( (this._tmpPosition + speed) < maxPosition) {
                        this._tmpPosition += speed;
                    } else {
                        this._tmpPosition = maxPosition;
                    }
                } else {
                    mouseMoves = false;
                }

                var knob = this._knob;

                if (mouseMoves) {
                    if(this._snapStep != 0) {

                    } else {
                        var knob = this._knob;

                    }

                }

            }
        }
    });
    return Fader;
});
