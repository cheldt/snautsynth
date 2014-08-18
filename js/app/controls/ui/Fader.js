define(['dejavu', 'app/controls/ui/RangeControl', 'app/event/Event', 'kinetic'],
    function(dejavu, RangeControl, Event, Kinectic){
    var Fader = dejavu.Class.declare({
        $name: 'Fader',

        $extends: RangeControl,

        _borderColor: null,

        _color: null,

        _faderBorder: null,

        _faderKnob: null,

        _length: null,

        _position: null,

        _orientation: null,

        _tmpPosition: null,

        _trackLength: null,

        _startTrackX: null,

        _startTrackY: null,

        _valueDisplayArea: null,

        _valueDisplayText: null,

        $constants: {
            ORIENTATION_HORIZONTAL :  0,
            ORIENTATION_VERTICAL:     1,
            LABEL_OFFSET:             20,
            FADER_KNOB_HEIGHT:        30,
            FADER_KNOB_WIDTH:         40,
            FADER_TRACK_HEIGHT:       30,
            FADER_TRACK_BORDER_WIDTH: 5,
            BORDER_RADIUS:            3,
            VAL_DISPLAY_AREA_WIDTH:   60,
            VAL_DISPLAY_AREA_HEIGHT:  30,
            VAL_DISPLAY_FONT_SIZE:    18
        },

        initialize: function (
            id, x, y, value, canvasState,
            valueDspMult, minValue, maxValue,
            length, color, snapStep, snapDistance,
            doubleClickSnapValue, formatter,
            orientation ) {
            this.$super(id, x, y, value, canvasState, valueDspMult, minValue, maxValue, snapStep,
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
                stroke:       '#000',

                id:           id
            });

            this._kineticGroup.add(this._faderBorder);

            this._trackLength = this._length * 0.9;

            this._tmpPosition = this.calcPositionFromValue(value);

            this._startTrackX = Fader.FADER_TRACK_HEIGHT / 2;
            this._startTrackY = (this._length - this._trackLength) / 2;

            if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                this._startTrackX = (this._length - this._trackLength) / 2;
                this._startTrackY = Fader.FADER_TRACK_HEIGHT / 2;
            }

            endPointX       = this._startTrackX;
            endPointY       = this._startTrackY + this._trackLength;

            if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                endPointX = this._startTrackX + this._trackLength;
                endPointY = this._startTrackY;
            }

            // create track-line
            trackLine = new Kinetic.Line({
                points:      [this._startTrackX, this._startTrackY, endPointX, endPointY],
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

            displayAreaX = this._startTrackX - (Fader.VAL_DISPLAY_AREA_WIDTH / 2);
            displayAreaY = this._trackLength + Fader.VAL_DISPLAY_AREA_HEIGHT;

            if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                displayAreaX = (-1) * Fader.VAL_DISPLAY_AREA_WIDTH - (this._startTrackX);
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
                    baseLayer.setAttr('event', new Event(myFader.getId(), myFader.getValue(), Event.TYPE_VALUE_CHANGED));
                }
            });

            container.addEventListener('mouseup', function(evt) {
                if (myFader.getSelected()) {
                    myFader.setSelected(false);
                    myFader.getCanvasState().unlockPointer();
                }
            });

            container.addEventListener('dblclick', function(evt) {
                    var stage      = myFader.getCanvasState().getStage();
                    var pointerPos = stage.getPointerPosition();
                    var shape      = stage.getIntersection(pointerPos);

                    if (!shape) {
                        return;
                    }

                    if (myFader.getId() == shape.getId()) {
                        myFader.setValue(myFader.getDoubleClickSnapValue());
                        var position = myFader.calcPositionFromValue(myFader.getValue());
                        myFader.updateKnobPosition(position);
                    }
            });
        },

        calcKnobPosition: function(position) {
            var knob       = this._faderKnob;
            var knobHeight = knob.getHeight();
            var knobWidth  = knob.getWidth();

            if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                knobX = this._startTrackX + (position - knobWidth / 2);
                knobY = this._startTrackY - knobHeight / 2;
            } else {
                knobX = this._startTrackX - knobWidth / 2;
                knobY = this._startTrackY + (this._trackLength - position - knobHeight / 2);
            }

            return {
                x: knobX,
                y: knobY
            };
        },

        calcPositionFromValue: function(value) {
            var valueRange = this._maxValue - this._minValue;

            // _trackLength => valueRange
            // position => value
            return (this._trackLength * value) / valueRange;
        },

        calcValueFromPosition: function(position) {
            var minValue   = this._minValue;
            var maxValue   = this._maxValue;
            var valueRange = this._maxValue - this._minValue;

            // valueRange => this._trackLength
            // value => position

            if (0 == position) {
                return this._minValue;
            } else {
                return this._minValue + (valueRange * position) / this._trackLength;
            }
        },

        update: function(mousePos) {
            if(this._selected) {

                var forward       = false;
                var lastValue     = this._canvasState.getLastValue();
                var mouseDelta    = 0;
                var maxMouseDelta = 200;

                var maxPosition   = this._trackLength;

                var value;

                if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                    mouseDelta = mousePos.getX();
                } else {
                    mouseDelta = (-1) * mousePos.getY();
                }

                var speedup    = Math.abs((10 * mouseDelta) / maxMouseDelta);
                var speed      = 2.05

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

                var knob = this._knob;

                value = this.calcValueFromPosition(this._tmpPosition);

                if (mouseMoves) {
                    if(this._snapStep != 0) {
                        var snap = false;
                        if (forward && value - lastValue >= this._snapStep - this._snapDistance) {
                            snap = true;
                        } else if( Math.abs(value - lastValue) >=  this._snapStep - this._snapDistance ) {
                            snap = true;
                        }

                        if (snap) {
                            var step = this._snapStep;
                            if ( !forward ) {
                                if(this._value + step <= this._maxValue) {
                                    this._value = this._value + step;
                                }
                                else {
                                    this._value = this._maxValue;
                                }
                            }
                            else {
                                if(this._value - step >= this._minValue) {
                                    this._value = this._value - step;
                                }
                                else {
                                    this._value = this._minValue;
                                }
                            }
                            this._canvasState.setLastValue(this._value);
                            this._tmpPosition = this.calcPositionFromValue(this._value);
                            this.updateKnobPosition(this._tmpPosition);
                            this.updateValueDisplayText();
                        }
                    } else {
                        var knob = this._knob;
                        this._value = value;
                        this.updateKnobPosition(this._tmpPosition);
                        this.updateValueDisplayText();
                    }

                }

            }
        },

        updateKnobPosition: function(position) {
            var knob  = this._faderKnob;
            var coord = this.calcKnobPosition(position) ;

            knob.setX(coord.x);
            knob.setY(coord.y);
        },

        updateValueDisplayText: function() {
            var text = this._formatter.format(this._value * this._valueDspMult);
            this._valueDisplayText.setText(text);
            $textWidth  = this._valueDisplayText.getTextWidth();
            $textHeight = this._valueDisplayText.getTextHeight();

            $displayTextX = this._startTrackX - ($textWidth / 2);
            $displayTextY = this._valueDisplayArea.getY() + (this._valueDisplayArea.getHeight() / 2) - ($textHeight / 2);

            if (Fader.ORIENTATION_HORIZONTAL == this._orientation) {
                $displayTextX = this._valueDisplayArea.getX() + (Fader.VAL_DISPLAY_AREA_WIDTH / 2) - ($textWidth / 2);
            }

            this._valueDisplayText.setX($displayTextX);
            this._valueDisplayText.setY($displayTextY)
        }
    });
    return Fader;
});
