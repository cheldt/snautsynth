define(['dejavu', 'app/controls/ui/RangeControl',  'app/utils/String', 'app/utils/Drawing', 'kinetic'], function(dejavu, RangeControl, StringUtils, DrawingUtils, Kinetic){
    var Knob = dejavu.Class.declare({
        $name: 'Knob',

        $extends: RangeControl,

        _minPointerRad: null,
        _maxPointerRad: null,

        //_valueDspMult: null,

        //_minValue: null,
        //_maxValue: null,

        _radius: null,
        _pointerRadian: null,
        _color: null,
        _pointerColor: null,
        _borderColor: null,

        //_snapStep: null,
        //_snapDistance: null,

        //_doubleClickSnapValue: null,
        _tmpPointerRad: null,

        _knobX: null,
        _knobY: null,

        _knobCircle: null,

        _pointer: null,

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

            var pointerDeg      = this.$static.POINTER_MAX_DEG - this.$static.POINTER_MIN_DEG;


            this._minPointerRad = this.$self.calcDegToRad(this.$static.POINTER_MIN_DEG);
            this._maxPointerRad = this.$self.calcDegToRad(this.$static.POINTER_MAX_DEG);

            this._radius = radius;

            // init pointer radian from value
            this._pointerRadian = this.$self.calcRadFromValue(value, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);
            this._tmpPointerRad = this._pointerRadian;

            // create components of control
            this._knobX = radius + x;
            this._knobY = radius + y;

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
                innerRadius: radius - this.$static.BORDER_WIDTH,
                outerRadius: radius,

                angle:       pointerDeg,
                rotation:    this.$static.POINTER_MIN_DEG,

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
                strokeWidth: this.$static.POINTER_WIDTH
            });

            this._kineticGroup.add(this._pointer);

            // create knob value-display
            var valueBorder = new Kinetic.Rect({
               x:            this._knobX - this.$static.VAL_DISPLAY_WIDTH / 2,
               y:            this._knobY + this.$static.VAL_DISPLAY_Y,

               cornerRadius: this.$static.VAL_DISPLAY_CORNER_RADIUS,
               height:       this.$static.VAL_DISPLAY_HEIGHT,
               width:        this.$static.VAL_DISPLAY_WIDTH,
               strokeWidth:  this.$static.VAL_DISPLAY_BORDER_WIDTH,

               fill:          color,
               stroke:       '#000'
            });

            this._kineticGroup.add(valueBorder);

            var valueDisplay = new Kinetic.Text({
               fill:     '#000',
               fontSize: this.$static.VAL_DISPLAY_FONT_SIZE,
               text:     this._value
            });
            $textWidth = valueDisplay.getTextWidth();
            $textHeight = valueDisplay.getTextHeight();

            valueDisplay.setX(this._knobX - $textWidth / 2)
            valueDisplay.setY(valueBorder.getY() + (this.$static.VAL_DISPLAY_HEIGHT / 2) - ($textHeight / 2))

            this._kineticGroup.add(valueDisplay);

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
            

            /*
            

            //this._valueDspMult = valueDspMult;

            

            this._radius = radius;
            this._pointerRadian = this.$self.calcRadFromValue(value, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);
            this._color = '#AAAAAA';

            //this._snapStep = snapStep;
            //this._snapDistance = snapDistance;

            //this._doubleClickSnapValue = doubleClickSnapValue;
            this._tmpPointerRad = this._pointerRadian;

            this._knobX= 0;
            this._knobY= 0;

            // register eventlisteners
            var myKnob = this;
            canvasState.addListener("mousemove", function(mousePos) { myKnob.update(mousePos); })
            canvasState.addListener("mousedown", function(mousePos) { myKnob.checkSelect(mousePos); });
            canvasState.addListener("mouseup", function() { myKnob.setSelected(false); myKnob.getCanvasState().unlockPointer(); });

            */
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

        getKnobX: function() {
            return (this._x + this._radius);

        },

        getKnobY: function() {
           return (this._y + this._radius + (this.$self.BORDER_WIDTH / 2) + ((this._label !== null) ? this.$static.LABEL_OFFSET : 0));
        },

        calcPointerPos: function() {
            var pointerLength = (this._radius / 1.23);
            return {x:  Math.cos(this._pointerRadian) * pointerLength + this._knobX, y: Math.sin(this._pointerRadian) * pointerLength + this._knobY};
        },

        checkSelect: function(mousePos) {
            if( this.contains(mousePos.getX(),mousePos.getY()) ) {
                if( this._doubleClickSnapValue !== null ) {
                    this._clickCounter += 1;

                    if( this._clickCounter == 1)
                        this._clickEventTStamp = new Date().getTime();
                    else if( this._clickCounter == 2 ) {
                        this._clickCounter = 0;
                        if( new Date().getTime() - this._clickEventTStamp < 500 ) {
                            this._value = this._doubleClickSnapValue;
                            this._pointerRadian = this.$self.calcRadFromValue(this._doubleClickSnapValue, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);
                            this._tmpPointerRad = this._pointerRadian;
                            this._canvasState.fire("valuechanged", this, { value: this._value, id:  this._id});
                        }
                    }
                }

                this._canvasState.setLastValue(this._value);
                this._selected = true;

                this._canvasState.lockPointer();
            }
            else {
                this._selected = false;
                this._clickCounter = 0;
            }
        },

        contains: function(mx, my) {
            // All we have to do is make sure the Mouse X,Y fall in the area between
            // the knobs x,y
            var knobX = this.getKnobX();
            var knobY = this.getKnobY();
            return this.$self.pointInCircle(mx, my, knobX, knobY, this._radius);
        },

        update: function(mousePos) {
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

                value = this.$self.calcValueFromRad(this._tmpPointerRad, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);

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
                            var step = this._snapStep; // + speedup;
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
                            this._pointer.setPoints([this._knobX, this._knobY, newPointerPos.x, newPointerPos.y])
                            //this._canvasState.fire("valuechanged", this, { value: this._value, id:  this._id});
                        }
                    } else {
                        this._pointerRadian = this.$self.calcRadFromValue(value, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);
                        this._value = value;
                        var newPointerPos = this.calcPointerPos();
                        this._pointer.setPoints([this._knobX, this._knobY, newPointerPos.x, newPointerPos.y])
                        //this._canvasState.fire("valuechanged", this, { value: this._value, id:  this._id});
                    }

                }
            }
        }

    });
    
    return Knob;
});
