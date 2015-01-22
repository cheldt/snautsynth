define(['dejavu', 'app/controls/ui/RangeControl', 'app/event/Event',  'kinetic', 'app/datatypes/NumberRange'],
    function(dejavu, RangeControl, Event, Kinetic, NumberRange){
    var Knob = dejavu.Class.declare({
        $name: 'Knob',

        $extends: RangeControl,

        _borderColor:      null,
        _color:            null,
        _knobX:            null,
        _knobY:            null,
        _knobCircle:       null,
        _pointerRadRange:  null,
        _pointerColor:     null,
        _pointer:          null,
        _pointerRadian:    null,
        _radius:           null,
        _valueDisplayArea: null,
        _valueDisplayText: null,
        _tmpPointerRad:    null,

        getPointerRadRange: function() {
            return this._pointerRadRange;
        },

        getKnobCircle: function() {
            return this._knobCircle;
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

            POINTER_MAX_DEG:           393,
            POINTER_MIN_DEG:           147,
            POINTER_WIDTH:             7,

            VAL_DISPLAY_CORNER_RADIUS: 3,
            VAL_DISPLAY_BORDER_WIDTH:  5,
            VAL_DISPLAY_FONT_SIZE:     18,
            VAL_DISPLAY_HEIGHT:        24,
            VAL_DISPLAY_WIDTH:         73,
            VAL_DISPLAY_Y:             32
        },

        /**
         * Constructor for knob
         *
         * @param {Number} id
         * @param {Number} x
         * @param {Number} y
         * @param {Number} value
         * @param {Object} canvasState
         * @param {Number} valueDspMult
         * @param {Object} valueRange
         * @param {Number} radius
         * @param {String} color
         * @param {Number} snapStep
         * @param {Number} snapDistance
         * @param {Number} doubleClickSnapValue
         * @param {Object} formatter
         */
        initialize: function (id, x, y,
                              value, canvasState,
                              valueDspMult,
                              valueRange,
                              radius, color,
                              snapStep, snapDistance,
                              doubleClickSnapValue, formatter) {
            this.$super(id, x, y,
                        value, canvasState,
                        valueDspMult,
                        valueRange,
                        snapStep, snapDistance,
                        doubleClickSnapValue, formatter);

            var pointerDeg        = Knob.POINTER_MAX_DEG - Knob.POINTER_MIN_DEG;
            this._pointerRadRange = new NumberRange(
                Knob.calcDegToRad(Knob.POINTER_MIN_DEG),
                Knob.calcDegToRad(Knob.POINTER_MAX_DEG)
            );

            this._radius        = radius;
            // init pointer radian from value
            this._pointerRadian = Knob.calcRadFromValue(value, this._pointerRadRange, this._valueRange);
            this._tmpPointerRad = this._pointerRadian;

            // create components of control
            this._knobX         = radius + this.getX() + Knob.BORDER_WIDTH;
            this._knobY         = radius + this.getY() + Knob.BORDER_WIDTH;

            // create knob circle
            this._knobCircle = new Kinetic.Circle({
                x:      this._knobX,
                y:      this._knobY,
                radius: radius,
                fill:   color,
                id:     id
             });

            this._kineticGroup.add(this._knobCircle);

            var radiusScaleMultiplier = (radius * 0.02);

            // create knob border
            var arc = new Kinetic.Arc({
                x:           this._knobX,
                y:           this._knobY,
                innerRadius: radius - (Knob.BORDER_WIDTH * radiusScaleMultiplier),
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
                strokeWidth: Knob.POINTER_WIDTH * radiusScaleMultiplier
            });

            this._kineticGroup.add(this._pointer);
            
            var displayMultiplier = radius * 0.018;

            // create knob value-display
            this._valueDisplayArea = new Kinetic.Rect({
               x:            this._knobX - (Knob.VAL_DISPLAY_WIDTH * displayMultiplier) / 2,
               y:            this._knobY + (Knob.VAL_DISPLAY_Y * radiusScaleMultiplier),

               cornerRadius: Knob.VAL_DISPLAY_CORNER_RADIUS * displayMultiplier,
               height:       Knob.VAL_DISPLAY_HEIGHT * displayMultiplier,
               width:        Knob.VAL_DISPLAY_WIDTH * displayMultiplier,
               strokeWidth:  Knob.VAL_DISPLAY_BORDER_WIDTH * radiusScaleMultiplier,

               fill:          color,
               stroke:       '#000'
            });

            this._kineticGroup.add(this._valueDisplayArea);

            this._valueDisplayText = new Kinetic.Text({
               fill:     '#000',
               fontSize: Knob.VAL_DISPLAY_FONT_SIZE * radiusScaleMultiplier
            });

            this.updateValueDisplayText();

            this._kineticGroup.add(this._valueDisplayText);

            var myKnob = this;
            
            var container = this.getCanvasState().getContainer();

            // add eventlistener for mousedown => lock mouse
            this._kineticGroup.on('mousedown', function(evt) {
                myKnob.getCanvasState().lockPointer();
                myKnob.getCanvasState().setLastValue(myKnob.getValue());
                myKnob.setSelected(true);
            });

            container.addEventListener('mousemove', function(evt) {
                if (myKnob.getSelected()) {
                    var mousePos  = myKnob.getCanvasState().getMousePosition(evt);
                    var baseLayer = myKnob.getCanvasState().getBaseLayer();

                    myKnob.update(mousePos);
                    baseLayer.setAttr('event', new Event(myKnob.getId(), myKnob.getValue(), Event.TYPE_VALUE_CHANGED));
                }
            });

            container.addEventListener('mouseup', function(evt) {
                if (myKnob.getSelected()) {
                    myKnob.getCanvasState().unlockPointer();
                    myKnob.setSelected(false);
                }
            });

            container.addEventListener('dblclick', function(evt) {
                var stage      = myKnob.getCanvasState().getStage();
                var pointerPos = stage.getPointerPosition();
                var shape      = stage.getIntersection(pointerPos);

                if (!shape) {
                    return;
                }

                if (myKnob.getId() == shape.getId()) {
                    myKnob.setValue(myKnob.getDoubleClickSnapValue());
                    myKnob.setPointerRadian(
                        Knob.calcRadFromValue(
                            myKnob.getDoubleClickSnapValue(), myKnob.getMinPointerRad(), myKnob.getMaxPointerRad(), myKnob.getMinValue(), myKnob.getMaxValue()
                        )
                    );
                    var newPointerPos = myKnob.calcPointerPos();
                    myKnob.updatePointerPosition(newPointerPos);
                    myKnob.setTmpPointerRad(myKnob.getPointerRadian());
                    myKnob.updateValueDisplayText();
    
                    myKnob.getCanvasState().getBaseLayer().setAttr('event', new Event(myKnob.getId(), myKnob.getValue(), Event.TYPE_VALUE_CHANGED));
                }
            });
        },

        $statics: {
            /**
             * Calculates radian from degree
             *
             * @param {Number} degree The degree-value
             *
             * @return {Number} The calculated radian-value
             */
            calcDegToRad: function(degree) {
                return (degree * Math.PI) / 180;
            },

            /**
             * Calculates radian from controller-value
             * depending on the min/max values of radian and controller-value
             *
             * @param {Number} value       The controller-value
             * @param {Object} radianRange The minimum and maximum radian
             * @param {Object} valueRange  The minimum and maximum controller-value
             *
             * @returns {Number}  The calculated radian
             */
            calcRadFromValue: function(value, radianRange, valueRange) {
                var totalRad   = radianRange.calcRange();
                var totalValue = valueRange.calcRange();

                // totalRadian                       -> totalValue
                // calculated radian + radian-offset -> (value - value-offset)
                return ((totalRad * (value - valueRange.getMin())) / totalValue) + radianRange.getMin();
            },

            /**
             * Calculates degree from radian
             *
             * @param {Number} radian
             *
             * @return {Number}  The calculated degree-value
             */
            calcRadToDeg: function(radian) {
                return (radian * 180) / Math.PI;
            },

            /**
             * Calculates controller-value from radian
             * depending on the min/max values of radian and controller-value
             *
             * @param {Number} radian      The radian
             * @param {Object} radianRange The minimum and maximum radian
             * @param {Object} valueRange  The minimum and maximum controller-value
             *
             * @returns {Number} The calculated controller-value
             */
            calcValueFromRad: function(radian, radianRange, valueRange) {
                var totalRad   = radianRange.calcRange();
                var totalValue = valueRange.calcRange();

                // totalValue                       -> totalRadian
                // calculated value + value-offset  -> (radian - radian-offset)
                return ((totalValue * (radian - radianRange.getMin())) / totalRad) + valueRange.getMin();
            },

            /**
             * Checks if point lies inside circle
             *
             * @param {Number} pointX         The x-coordinate of point
             * @param {Number} pointY         The y-coordinate of point
             * @param {Number} circleCenterX  The x-coordinate of circle center-point
             * @param {Number} circleCenterY  The y-coordinate of circle center-point
             * @param {Number} radius         The radius of circle
             *
             * @returns {Boolean}  True when point is part of circle, false if not
             */
            pointInCircle: function(pointX, pointY, circleCenterX, circleCenterY, radius) {
                var distanceSquared =
                    (pointX - circleCenterX) * (pointX - circleCenterX) +
                    (pointY - circleCenterY) * (pointY - circleCenterY);

                return distanceSquared <= radius * radius;
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
            return (this.getX() + this._radius);
        },

        getKnobY: function() {
           return (this.getY() + this._radius + (Knob.BORDER_WIDTH / 2) + ((this._label !== null) ? Knob.LABEL_OFFSET : 0));
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

                if (this._snapStep == 0) {
                   speed = speed * speedup;
                }

                if (mouseY < 0) {

                    //check if knob was turned to far clockwise
                    if ((this._tmpPointerRad + speed) <= this._pointerRadRange.getMax()) {
                        this._tmpPointerRad += speed;
                    }
                    else {
                        this._tmpPointerRad = this._pointerRadRange.getMax();
                    }

                    forward = true;
                } else if ( mouseY > 0 ) {

                    //check if knob was turned to far counter clockwise
                    if ((this._tmpPointerRad - speed) >= this._pointerRadRange.getMin()) {
                        this._tmpPointerRad -= speed;
                    }
                    else {
                        this._tmpPointerRad = this._pointerRadRange.getMin();
                    }
                } else {
                    mouseMoves = false;
                }

                value = Knob.calcValueFromRad(this._tmpPointerRad, this._pointerRadRange, this._valueRange);

                if(mouseMoves) {
                    if(this._snapStep != 0) {
                        var snap = false;
                        if ( forward ) {
                            if ( value - lastValue >= this._snapStep - this._snapDistance ) {
                                snap = true;
                            }
                        } else {
                            if ( Math.abs(value - lastValue) >=  this._snapStep - this._snapDistance ) {
                                snap = true;
                            }
                        }

                        if (snap) {
                            var step = this._snapStep;
                            if (forward) {
                                if (this._value + step <= this._valueRange.getMax()) {
                                    this._value = this._value + step;
                                }
                                else {
                                    this._value = this._valueRange.getMax();
                                }
                            }
                            else {
                                if (this._value - step >= this._valueRange.getMin()) {
                                    this._value = this._value - step;
                                }
                                else {
                                    this._value = this._valueRange.getMin();
                                }
                            }

                            this._canvasState.setLastValue(this._value);

                            this._pointerRadian = Knob.calcRadFromValue(
                                this._value,
                                this._pointerRadRange,
                                this._valueRange
                            );
                            var newPointerPos = this.calcPointerPos();

                            this.updatePointerPosition(newPointerPos);
                            this.updateValueDisplayText();
                        }
                    } else {
                        this._pointerRadian = this._tmpPointerRad;
                        this._value         = value;
                        var newPointerPos   = this.calcPointerPos();
                        this.updatePointerPosition(newPointerPos);
                        this.updateValueDisplayText();
                    }
                }
            }
        },
        
        updateValueDisplayText: function() {
            var text = this._formatter.format(this._value);
            this._valueDisplayText.setText(text);
            $textWidth  = this._valueDisplayText.getTextWidth();
            $textHeight = this._valueDisplayText.getTextHeight();

            this._valueDisplayText.setX(this._knobX - $textWidth / 2)
            this._valueDisplayText.setY(this._valueDisplayArea.getY() + (this._valueDisplayArea.getHeight() / 2) - ($textHeight / 2))
        },
        
        updatePointerPosition: function(newPointerPos) {
            this._pointer.setPoints([this._knobX, this._knobY, newPointerPos.x, newPointerPos.y])
        }
    });
    
    return Knob;
});
