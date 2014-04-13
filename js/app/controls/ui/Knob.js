define(['dejavu', 'app/controls/ui/RangeControl',  'app/utils/String', 'app/utils/Drawing', 'kinetic'], function(dejavu, RangeControl, StringUtils, DrawingUtils, Kinetic){
    var Knob = dejavu.Class.declare({
        $name: 'Knob',

        $extends: RangeControl,

        _borderColor: null,

        _color: null,

        _knobX: null,

        _knobY: null,

        _knobCircle: null,

        _maxPointerRad: null,

        _maxValue: null,

        _minPointerRad: null,

        _minValue: null,

        _pointerColor: null,

        _pointer: null,

        _pointerRadian: null,

        _radius: null,

        _valueDisplayArea: null,

        _valueDisplayText: null,

        _tmpPointerRad: null,
        
        getMaxPointerRad: function() {
            return this._maxPointerRad;
        },
 
        getMaxValue: function() {
            return this._maxValue;    
        },

        getMinPointerRad: function() {
            return this._minPointerRad;
        },

        getMinValue: function() {
            return this._minValue;
        },
        
        getPointerRadian: function() {
            return this._pointerRadian;
        },
        setPointerRadian: function(pointerRadian) {
            this._pointerRadian = pointerRadian;
            return this;
        },
        
        setTmpPointerRad: function(tmpPointerRad) {
            this._tmpPointerRad = tmpPointerRad;
            return this;
        },
        
        $constants: {
            LABEL_OFFSET:              20,
            BORDER_WIDTH:              5,

            POINTER_MAX_DEG:           405,
            POINTER_MIN_DEG:           135,
            POINTER_WIDTH:             7,

            VAL_DISPLAY_CORNER_RADIUS: 3,
            VAL_DISPLAY_BORDER_WIDTH:  5,
            VAL_DISPLAY_FONT_SIZE:     18,
            VAL_DISPLAY_HEIGHT:        23,
            VAL_DISPLAY_WIDTH:         64,
            VAL_DISPLAY_Y:             27
        },

        initialize: function (id, x, y, value, canvasState, label, valueDspMult,  minValue, maxValue, radius, color, snapStep, snapDistance, doubleClickSnapValue) {
            this.$super(id, x, y, value, canvasState, label, valueDspMult, minValue, maxValue, snapStep, snapDistance, doubleClickSnapValue);
            
            this._minValue      = minValue;
            this._maxValue      = maxValue;
            
            var pointerDeg      = Knob.POINTER_MAX_DEG - Knob.POINTER_MIN_DEG;


            this._minPointerRad = Knob.calcDegToRad(Knob.POINTER_MIN_DEG);
            this._maxPointerRad = Knob.calcDegToRad(Knob.POINTER_MAX_DEG);

            this._radius        = radius;

            // init pointer radian from value
            this._pointerRadian = Knob.calcRadFromValue(value, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);
            this._tmpPointerRad = this._pointerRadian;

            // create components of control
            this._knobX         = radius + x;
            this._knobY         = radius + y;

            // create knob circle
            this._knobCircle = new Kinetic.Circle({
                x:      this._knobX,
                y:      this._knobY,
                radius: radius,
                fill:   color
             });

            this._kineticGroup.add(this._knobCircle);

            // create knob border
            var arc = new Kinetic.Arc({
                x:           this._knobX,
                y:           this._knobY,
                innerRadius: radius - Knob.BORDER_WIDTH,
                outerRadius: radius,

                angle:       pointerDeg,
                rotation:    Knob.POINTER_MIN_DEG,

                fill:        '#000',
                stroke:      '#000'
            });

            this._kineticGroup.add(arc);

            // create pointer and set initial position
            var initialPointerPos = this.calcPointerPos();

            this._pointer = new Kinetic.Line({
                points:     [this._knobX, this._knobY, initialPointerPos.x, initialPointerPos.y],
                stroke:     '#000',
                lineJoin:   'round',
                strokeWidth: Knob.POINTER_WIDTH
            });

            this._kineticGroup.add(this._pointer);

            // create knob value-display
            this._valueDisplayArea = new Kinetic.Rect({
               x:            this._knobX - Knob.VAL_DISPLAY_WIDTH / 2,
               y:            this._knobY + Knob.VAL_DISPLAY_Y,

               cornerRadius: Knob.VAL_DISPLAY_CORNER_RADIUS,
               height:       Knob.VAL_DISPLAY_HEIGHT,
               width:        Knob.VAL_DISPLAY_WIDTH,
               strokeWidth:  Knob.VAL_DISPLAY_BORDER_WIDTH,

               fill:          color,
               stroke:       '#000'
            });

            this._kineticGroup.add(this._valueDisplayArea);

            this._valueDisplayText = new Kinetic.Text({
               fill:     '#000',
               fontSize: Knob.VAL_DISPLAY_FONT_SIZE,
            });

            this.updateValueDisplayText(this._value);

            this._kineticGroup.add(this._valueDisplayText);

            var myKnob = this;

            // add eventlistener for mousedown => lock mouse
            this._kineticGroup.on('mousedown', function(evt) {
                myKnob.getCanvasState().lockPointer();
                myKnob.getCanvasState().setLastValue(myKnob.getValue());
                myKnob.setSelected(true);
            });

            this._kineticGroup.on('mousemove', function(evt) {
                var mousePos = myKnob.getCanvasState().getMousePosition(evt);
                myKnob.update(mousePos);
            });

            this._kineticGroup.on('mouseup mouseleave', function(evt) {
                myKnob.getCanvasState().unlockPointer();
                myKnob.setSelected(false);
            });
            
            this._kineticGroup.on('dblclick', function(evt) {
                myKnob.setValue(myKnob.getDoubleClickSnapValue());
                myKnob.setPointerRadian(
                    Knob.calcRadFromValue(
                        myKnob.getDoubleClickSnapValue(), myKnob.getMinPointerRad(), myKnob.getMaxPointerRad(), myKnob.getMinValue(), myKnob.getMaxValue()
                    )
                );
                var newPointerPos = myKnob.calcPointerPos();
                myKnob.updatePointerPosition(newPointerPos);
                myKnob.setTmpPointerRad(myKnob.getPointerRadian());
                myKnob.updateValueDisplayText(myKnob.getValue().toFixed(0))
                //myKnob._canvasState.fire("valuechanged", this, { value: this._value, id:  this._id});
            });
        },

        $statics: {
            // calculate degree from radian
            calcRadToDeg: function(radian) {
                return (radian * 180) / Math.PI;
            },

            // calculate radian from degree
            calcDegToRad: function(degree) {
                return (degree * Math.PI) / 180;
            },

            calcRadFromValue: function(value, minRad, maxRad, minValue, maxValue) {
                var totalRad = maxRad - minRad;
                var totalValue = maxValue - minValue;

                // totalRadian                  -> totalValue
                // resultradian + radian-offset -> (value - value-offset)
                return ((totalRad * (value - minValue)) / totalValue) + minRad;
            },

            calcValueFromRad: function(radian, minRad, maxRad, minValue, maxValue) {
                var totalRad = maxRad - minRad;
                var totalValue = maxValue - minValue;

                // totalValue                  -> totalRadian
                // resultvalue + value-offset  -> (radian - radian-offset)
                return ((totalValue * (radian - minRad)) / totalRad) + minValue;
            },

            // x,y is the point to test
            // cx, cy is circle center, and radius is circle radius
            pointInCircle: function(x, y, cx, cy, radius) {
                var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
                return distancesquared <= radius * radius;
            }
        },

        calcPointerPos: function() {
            var pointerLength = (this._radius / 1.23);
            return {
                x: Math.cos(this._pointerRadian) * pointerLength + this._knobX,
                y: Math.sin(this._pointerRadian) * pointerLength + this._knobY
            };
        },

        getKnobX: function() {
            return (this._x + this._radius);
        },

        getKnobY: function() {
           return (this._y + this._radius + (Knob.BORDER_WIDTH / 2) + ((this._label !== null) ? Knob.LABEL_OFFSET : 0));
        },

        update: function(mousePos) {
            
            console.log(this._tmpPointerRad);
            if(this._selected) {
                this._clickCounter = 0;

                var maxMouseDelta  = 200;
                var mouseY         = mousePos.getY();
                
                //1 - 200
                //x   - 45
                var speedup        = Math.abs((10 * mouseY) / maxMouseDelta);

                var value;
                var forward        = false;
                var mouseMoves     = true;

                var lastValue      = this._canvasState.getLastValue();
                var speed          = 0.05

                if(this._snapStep == 0) {
                   speed = speed * speedup;
                }

                if( mouseY < 0 ) {

                    //check if knob was turned to far clockwise
                    if ( ( this._tmpPointerRad + speed) <= this._maxPointerRad ) {
                        this._tmpPointerRad += speed;
                    }
                    else {
                        this._tmpPointerRad = this._maxPointerRad;
                    }

                    forward = true;
                } else if ( mouseY > 0 ) {

                    //check if knob was turned to far counter clockwise
                    if ( ( this._tmpPointerRad - speed) >= this._minPointerRad ) {
                        this._tmpPointerRad -= speed;
                    }
                    else {
                        this._tmpPointerRad = this._minPointerRad;
                    }
                } else {
                    mouseMoves = false;
                }

                value = Knob.calcValueFromRad(this._tmpPointerRad, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);

                if(mouseMoves) {
                    if(this._snapStep != 0) {
                        var snap = false;
                        if( forward ) {
                            if ( value - lastValue >= this._snapStep - this._snapDistance ) {
                                snap = true;
                            }
                        } else {
                            if ( Math.abs(value - lastValue) >=  this._snapStep - this._snapDistance ) {
                                snap = true;
                            }
                        }

                        if(snap) {
                            var step = this._snapStep;
                            if ( forward ) {
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
                            this._pointerRadian = this.$self.calcRadFromValue(this._value, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);
                            var newPointerPos = this.calcPointerPos();
                            this.updatePointerPosition(newPointerPos);
                            this.updateValueDisplayText(33);
                            //this._canvasState.fire("valuechanged", this, { value: this._value, id:  this._id});
                        }
                    } else {
                        this._pointerRadian = Knob.calcRadFromValue(value, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);
                        this._value = value;
                        var newPointerPos = this.calcPointerPos();
                        this.updatePointerPosition(newPointerPos);
                        this.updateValueDisplayText(this._value.toFixed(0));
                        //this._canvasState.fire("valuechanged", this, { value: this._value, id:  this._id});
                    }

                }
            }
        },
        
        updateValueDisplayText: function(text) {
            this._valueDisplayText.setText(text);
            $textWidth  = this._valueDisplayText.getTextWidth();
            $textHeight = this._valueDisplayText.getTextHeight();

            this._valueDisplayText.setX(this._knobX - $textWidth / 2)
            this._valueDisplayText.setY(this._valueDisplayArea.getY() + (Knob.VAL_DISPLAY_HEIGHT / 2) - ($textHeight / 2))
        },
        
        updatePointerPosition: function(newPointerPos) {
            this._pointer.setPoints([this._knobX, this._knobY, newPointerPos.x, newPointerPos.y])
        },

    });
    
    return Knob;
});
