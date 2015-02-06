define(
    [
        'dejavu',
        'app/control/ui/rangecontrol/RangeControl',
        '../../../event/Event',
        'kinetic',
        'app/datatype/NumberRange',
        'app/util/Position'
    ],
    function(
        dejavu,
        RangeControl,
        Event,
        Kinetic,
        NumberRange,
        Position
    ){
    var Knob = dejavu.Class.declare({
        $name: 'Knob',

        $extends: RangeControl,

        _borderColor:      null,

        _color:            null,

        /** @type {Object} */
        _knobPosition:     null,

        /** @type {Object} */
        _knobCircle:       null,

        /** @type {Object} */
        _pointerRadRange:  null,

        _pointerColor:     null,

        /** @type {Object} */
        _pointer:          null,

        /** @type {number} */
        _pointerRadian:    null,

        /** @type {number} */
        _radius:           null,

        /** @type {Object} */
        _valueDisplayArea: null,

        /** @type {Object} */
        _valueDisplayText: null,

        /** @type {number} */
        _tmpPointerRad:    null,

        /**
         * @return {Object}
         */
        getPointerRadRange: function() {
            return this._pointerRadRange;
        },

        /**
         * @return {Object}
         */
        getKnobCircle: function() {
            return this._knobCircle;
        },

        /**
         * @return {number}
         */
        getPointerRadian: function() {
            return this._pointerRadian;
        },

        /**
         * @param {number} pointerRadian
         */
        setPointerRadian: function(pointerRadian) {
            this._pointerRadian = pointerRadian;
            return this;
        },

        /**
         * @param {number} tmpPointerRad
         */
        setTmpPointerRad: function(tmpPointerRad) {
            this._tmpPointerRad = tmpPointerRad;
            return this;
        },
        
        $constants: {
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
         * @param {number} id
         * @param {Object} position
         * @param {number} value
         * @param {Object} canvasState
         * @param {number} valueDspMult
         * @param {Object} valueRange
         * @param {number} radius
         * @param {string} color
         * @param {Object} snapOptions
         * @param {Object} formatter
         */
        initialize: function (
            id,
            position,
            value,
            canvasState,
            valueDspMult,
            valueRange,
            radius,
            color,
            snapOptions,
            formatter
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
            this._knobPosition  = new Position(
                radius + this.getX() + Knob.BORDER_WIDTH,
                radius + this.getY() + Knob.BORDER_WIDTH
            );

            var knobX = this._knobPosition.getX();
            var knobY = this._knobPosition.getY();

            // create knob circle
            this._knobCircle    = new Kinetic.Circle({
                x:      knobX,
                y:      knobY,
                radius: radius,
                fill:   color,
                id:     id
             });

            this._kineticGroup.add(this._knobCircle);

            var radiusScaleMultiplier = (radius * 0.02);

            // create knob border
            var arc = new Kinetic.Arc({
                x:           knobX,
                y:           knobY,
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
                points:     [knobX, knobY, initialPointerPos.getX(), initialPointerPos.getY()],
                stroke:     '#000',
                lineJoin:   'round',
                strokeWidth: Knob.POINTER_WIDTH * radiusScaleMultiplier
            });

            this._kineticGroup.add(this._pointer);
            
            var displayMultiplier = radius * 0.018;

            // create knob value-display
            this._valueDisplayArea = new Kinetic.Rect({
               x:            knobX - (Knob.VAL_DISPLAY_WIDTH * displayMultiplier) / 2,
               y:            knobY + (Knob.VAL_DISPLAY_Y * radiusScaleMultiplier),

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

            if (null !== snapOptions && null !== snapOptions.getDoubleClickSnapValue()) {
                container.addEventListener('dblclick', function() {
                    var stage      = myKnob.getCanvasState().getStage();
                    var pointerPos = stage.getPointerPosition();
                    var shape      = stage.getIntersection(pointerPos);

                    if (!shape) {
                        return;
                    }

                    if (myKnob.getId() == shape.getId()) {
                        myKnob.setValue(snapOptions.getDoubleClickSnapValue());

                        myKnob.setPointerRadian(
                            Knob.calcRadFromValue(
                                snapOptions.getDoubleClickSnapValue(),
                                myKnob.getPointerRadRange(),
                                myKnob.getValueRange()
                            )
                        );

                        var newPointerPos = myKnob.calcPointerPos();

                        myKnob.updatePointerPosition(newPointerPos);
                        myKnob.setTmpPointerRad(myKnob.getPointerRadian());
                        myKnob.updateValueDisplayText();

                        myKnob.getCanvasState().getBaseLayer().setAttr(
                            'event',
                            new Event(myKnob.getId(), myKnob.getValue(), Event.TYPE_VALUE_CHANGED)
                        );
                    }
                });
            }
        },

        $statics: {
            /**
             * Calculates radian from degree
             *
             * @param {number} degree The degree-value
             *
             * @return {number} The calculated radian-value
             */
            calcDegToRad: function(degree) {
                return (degree * Math.PI) / 180;
            },

            /**
             * Calculates radian from controller-value
             * depending on the min/max values of radian and controller-value
             *
             * @param {number} value       The controller-value
             * @param {Object} radianRange The minimum and maximum radian
             * @param {Object} valueRange  The minimum and maximum controller-value
             *
             * @return {number}  The calculated radian
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
             * @param {number} radian
             *
             * @return {number}  The calculated degree-value
             */
            calcRadToDeg: function(radian) {
                return (radian * 180) / Math.PI;
            },

            /**
             * Calculates controller-value from radian
             * depending on the min/max values of radian and controller-value
             *
             * @param {number} radian      The radian
             * @param {Object} radianRange The minimum and maximum radian
             * @param {Object} valueRange  The minimum and maximum controller-value
             *
             * @return {number} The calculated controller-value
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
             * @param {number} pointX         The x-coordinate of point
             * @param {number} pointY         The y-coordinate of point
             * @param {number} circleCenterX  The x-coordinate of circle center-point
             * @param {number} circleCenterY  The y-coordinate of circle center-point
             * @param {number} radius         The radius of circle
             *
             * @return {Boolean}  True when point is part of circle, false if not
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

            return new Position(
                Math.cos(this._pointerRadian) * pointerLength + this._knobPosition.getX(),
                Math.sin(this._pointerRadian) * pointerLength + this._knobPosition.getY()
            );
        },

        update: function(mousePos) {
            if(this._selected) {
                this._clickCounter = 0;
                var snapOptions    = this.getSnapOptions();

                var maxMouseDelta  = 200;
                var mouseY         = mousePos.getY();
                
                //1 - 200
                //x - 45
                var speedup        = Math.abs((10 * mouseY) / maxMouseDelta);

                var value;
                var forward        = false;
                var mouseMoves     = true;

                var lastValue      = this._canvasState.getLastValue();
                var speed          = 0.05

                if (null === snapOptions || (null !== snapOptions && snapOptions.getSnapStep() == 0)) {
                   speed = speed * speedup;
                }

                if (mouseY < 0) {
                    //check if knob was turned to far clockwise
                    if ((this._tmpPointerRad + speed) <= this._pointerRadRange.getMax()) {
                        this._tmpPointerRad += speed;
                    } else {
                        this._tmpPointerRad = this._pointerRadRange.getMax();
                    }

                    forward = true;
                } else if (mouseY > 0) {

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

                if (mouseMoves) {
                    if (null !== snapOptions && 0 != snapOptions.getSnapStep()) {
                        var step = 0;

                        if (
                            Math.abs(value - lastValue) >= snapOptions.getSnapStep() - snapOptions.getSnapDistance()
                        ) {
                            step = snapOptions.getSnapStep();
                        }

                        if (0 != step) {
                            if (forward) {
                                if (this._value + step <= this._valueRange.getMax()) {
                                    this._value = this._value + step;
                                } else {
                                    this._value = this._valueRange.getMax();
                                }
                            }
                            else {
                                if (this._value - step >= this._valueRange.getMin()) {
                                    this._value = this._value - step;
                                } else {
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

            var textWidth  = this._valueDisplayText.getTextWidth();
            var textHeight = this._valueDisplayText.getTextHeight();

            this._valueDisplayText.setX(this._knobPosition.getX() - textWidth / 2);
            this._valueDisplayText.setY(
                this._valueDisplayArea.getY() + (this._valueDisplayArea.getHeight() / 2) - (textHeight / 2)
            );
        },
        
        updatePointerPosition: function(newPointerPos) {
            this._pointer.setPoints(
                [this._knobPosition.getX(), this._knobPosition.getY(), newPointerPos.getX(), newPointerPos.getY()]
            );
        }
    });
    
    return Knob;
});
