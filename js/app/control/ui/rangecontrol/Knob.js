/**
 * @namespace Snautsynth.Control.UI.RangeControl
 */
define(
    [
        'dejavu',
        'app/control/ui/rangecontrol/RangeControl',
        'app/event/Event',
        'konva',
        'app/datatype/NumberRange',
        'app/util/Position'
    ],
    function(
        dejavu,
        RangeControl,
        Event,
        Konva,
        NumberRange,
        Position
    ) {
        'use strict';

        var Knob = dejavu.Class.declare({
            $name: 'Knob',

            $extends: RangeControl,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {string}
             */
            _borderColor: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {string}
             */
            _color: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {Snautsynth.Util.Position}
             */
            _knobPosition: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {Konva.Arc}
             */
            _knobBorder: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {Konva.Circle}
             */
            _knobCircle: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.NumberRange}
             */
            _pointerRadRange: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {string}
             */
            _pointerColor: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {Konva.Line}
             */
            _pointer: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {number}
             */
            _pointerRadian: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {number}
             */
            radius: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {Konva.Rect}
             */
            _valueDisplayArea: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {Konva.Text}
             */
            _valueDisplayText: null,

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             * @protected
             *
             * @type {number}
             */
            _tmpPointerRad: null,


            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             *
             * @returns {Snautsynth.DataType.NumberRange}
             */
            getPointerRadRange: function() {
                return this._pointerRadRange;
            },


            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             *
             * @returns {Konva.Circle}
             */
            getKnobCircle: function() {
                return this._knobCircle;
            },

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             *
             * @return {number}
             */
            getPointerRadian: function() {
                return this._pointerRadian;
            },

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             *
             * @param {number} pointerRadian
             */
            setPointerRadian: function(pointerRadian) {
                this._pointerRadian = pointerRadian;
                return this;
            },

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             *
             * @param {number} tmpPointerRad
             */
            setTmpPointerRad: function(tmpPointerRad) {
                this._tmpPointerRad = tmpPointerRad;
                return this;
            },

            $constants: {
                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                BORDER_WIDTH:              5,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                POINTER_MAX_DEG:           393,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                POINTER_MIN_DEG:           147,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                POINTER_WIDTH:             7,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                VAL_DISPLAY_CORNER_RADIUS: 3,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                VAL_DISPLAY_BORDER_WIDTH:  5,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                VAL_DISPLAY_FONT_SIZE:     18,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                VAL_DISPLAY_HEIGHT:        24,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                VAL_DISPLAY_WIDTH:         73,

                /**
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                VAL_DISPLAY_Y:             32
            },

            /**
             * @constructor
             * @class Snautsynth.Control.UI.RangeControl.Knob
             * @extends Snautsynth.Control.UI.RangeControl.RangeControl
             *
             * @param {number}                                id
             * @param {Snautsynth.Util.Position}              position
             * @param {number}                                value
             * @param {Snautsynth.Canvas.CanvasState}         canvasState
             * @param {Snautsynth.DataType.RangeValueOptions} rangeValueOptions
             * @param {number}                                radius
             * @param {string}                                color
             */
            initialize: function (
                id,
                position,
                value,
                canvasState,
                rangeValueOptions,
                radius,
                color
            ) {
                this.$super(
                    id,
                    position,
                    value,
                    canvasState,
                    rangeValueOptions
                );

                this.radius        = radius;
                this._tmpPointerRad = this._pointerRadian;

                // create knob circle
                this._knobCircle = new Konva.Circle({
                    fill: color,
                    id:   id
                 });

                this._kineticGroup.add(this._knobCircle);

                // create knob border
                this._knobBorder = new Konva.Arc({
                    fill:   '#000',
                    stroke: '#000'
                });

                this._kineticGroup.add(this._knobBorder);

                this._pointer = new Konva.Line({
                    stroke:   '#000',
                    lineJoin: 'round'
                });

                this._kineticGroup.add(this._pointer);

                // create knob value-display
                this._valueDisplayArea = new Konva.Rect({
                   fill:   color,
                   stroke: '#000'
                });

                this._kineticGroup.add(this._valueDisplayArea);

                this._valueDisplayText = new Konva.Text({
                   fill: '#000'
                });

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
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @static
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
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @static
                 *
                 * @param {number} value       The controller-value
                 * @param {Snautsynth.DataType.NumberRange} radianRange The minimum and maximum radian
                 * @param {Snautsynth.DataType.NumberRange} valueRange  The minimum and maximum controller-value
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
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @static
                 *
                 * @param {number} radian
                 *
                 * @return {number} The calculated degree-value
                 */
                calcRadToDeg: function(radian) {
                    return (radian * 180) / Math.PI;
                },

                /**
                 * Calculates controller-value from radian
                 * depending on the min/max values of radian and controller-value
                 *
                 * @memberof Snautsynth.Control.UI.RangeControl.Knob
                 * @static
                 *
                 * @param {number} radian      The radian
                 * @param {Snautsynth.DataType.NumberRange} radianRange The minimum and maximum radian
                 * @param {Snautsynth.DataType.NumberRange} valueRange  The minimum and maximum controller-value
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


            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             *
             * @return {Snautsynth.Util.Position}
             */
            calcPointerPos: function() {
                var pointerLength = (this.radius / 1.23);

                return new Position(
                    Math.cos(this._pointerRadian) * pointerLength + this._knobPosition.getX(),
                    Math.sin(this._pointerRadian) * pointerLength + this._knobPosition.getY()
                );
            },

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             */
            setUp: function() {
                this._pointerRadRange = new NumberRange(
                    Knob.calcDegToRad(Knob.POINTER_MIN_DEG),
                    Knob.calcDegToRad(Knob.POINTER_MAX_DEG)
                );

                // init pointer radian from value
                this._pointerRadian = Knob.calcRadFromValue(
                    this._value,
                    this._pointerRadRange,
                    this._rangeValueOptions.getNumberRange()
                );

                this._tmpPointerRad = this._pointerRadian;
                var pointerDeg      = Knob.POINTER_MAX_DEG - Knob.POINTER_MIN_DEG;

                // create components of control
                this._knobPosition  = new Position(
                    this.radius + this.getX() + Knob.BORDER_WIDTH,
                    this.radius + this.getY() + Knob.BORDER_WIDTH
                );

                var knobX = this._knobPosition.getX();
                var knobY = this._knobPosition.getY();

                // create knob circle
                this._knobCircle.x(knobX);
                this._knobCircle.y(knobY);
                this._knobCircle.radius(this.radius);

                var radiusScaleMultiplier = (this.radius * 0.02);

                this._knobBorder.x(knobX);
                this._knobBorder.y(knobY);
                this._knobBorder.innerRadius(this.radius - (Knob.BORDER_WIDTH * radiusScaleMultiplier));
                this._knobBorder.outerRadius(this.radius);
                this._knobBorder.angle(pointerDeg);
                this._knobBorder.rotation(Knob.POINTER_MIN_DEG);

                // create pointer and set initial position
                var initialPointerPos = this.calcPointerPos();

                this._pointer.points([knobX, knobY, initialPointerPos.getX(), initialPointerPos.getY()]);
                this._pointer.strokeWidth(Knob.POINTER_WIDTH * radiusScaleMultiplier);

                var displayMultiplier = this.radius * 0.018;

                this._valueDisplayArea.x(knobX - (Knob.VAL_DISPLAY_WIDTH * displayMultiplier) / 2);
                this._valueDisplayArea.y(knobY + (Knob.VAL_DISPLAY_Y * radiusScaleMultiplier));
                this._valueDisplayArea.width(Knob.VAL_DISPLAY_WIDTH * displayMultiplier);
                this._valueDisplayArea.height(Knob.VAL_DISPLAY_HEIGHT * displayMultiplier);
                this._valueDisplayArea.cornerRadius(Knob.VAL_DISPLAY_CORNER_RADIUS * displayMultiplier);
                this._valueDisplayArea.strokeWidth(Knob.VAL_DISPLAY_BORDER_WIDTH * radiusScaleMultiplier);

                this._valueDisplayText.fontSize(Knob.VAL_DISPLAY_FONT_SIZE * radiusScaleMultiplier);

                this.updateValueDisplayText();
            },

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             */
            update: function(mousePos) {
                if(this._selected) {
                    var snapOptions    = this.getSnapOptions();
                    var maxMouseDelta  = 200;
                    var mouseY         = mousePos.getY();
                    var speedup        = Math.abs((10 * mouseY) / maxMouseDelta);
                    var value;
                    var forward        = false;
                    var mouseMoves     = true;
                    var lastValue      = this._canvasState.getLastValue();
                    var speed          = 0.05;

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

                    var valueRange = this._rangeValueOptions.getNumberRange();

                    value = Knob.calcValueFromRad(this._tmpPointerRad, this._pointerRadRange, valueRange);

                    if (mouseMoves) {
                        if (null !== snapOptions && 0 !== snapOptions.getSnapStep()) {
                            var step = 0;

                            if (
                                Math.abs(value - lastValue) >= snapOptions.getSnapStep() - snapOptions.getSnapDistance()
                            ) {
                                step = snapOptions.getSnapStep();
                            }

                            if (0 !== step) {
                                if (forward) {
                                    if (this._value + step <= valueRange.getMax()) {
                                        this._value = this._value + step;
                                    } else {
                                        this._value = valueRange.getMax();
                                    }
                                }
                                else {
                                    if (this._value - step >= valueRange.getMin()) {
                                        this._value = this._value - step;
                                    } else {
                                        this._value = valueRange.getMin();
                                    }
                                }

                                this._canvasState.setLastValue(this._value);

                                this._pointerRadian = Knob.calcRadFromValue(
                                    this._value,
                                    this._pointerRadRange,
                                    valueRange
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

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             */
            updateValueDisplayText: function() {
                var text = this._formatter.format(this._value * this._rangeValueOptions.getValueDisplayMultiplier());

                this._valueDisplayText.setText(text);

                var textWidth  = this._valueDisplayText.getTextWidth();
                var textHeight = this._valueDisplayText.getTextHeight();

                this._valueDisplayText.setX(this._knobPosition.getX() - textWidth / 2);
                this._valueDisplayText.setY(
                    this._valueDisplayArea.getY() + (this._valueDisplayArea.getHeight() / 2) - (textHeight / 2)
                );
            },

            /**
             * @memberof Snautsynth.Control.UI.RangeControl.Knob
             * @instance
             */
            updatePointerPosition: function(newPointerPos) {
                this._pointer.setPoints(
                    [this._knobPosition.getX(), this._knobPosition.getY(), newPointerPos.getX(), newPointerPos.getY()]
                );
            }
        });

        return Knob;
    }
);
