define(['dejavu', 'app/controls/ui/UiControl',  'app/utils/String'], function(dejavu, UiControl, StringUtils){
    var Knob = dejavu.Class.declare({
        $name: 'Knob',

        $extends: UiControl,

        _minPointerDeg: null,
        _maxPointerDeg: null,

        _minPointerRad: null,
        _maxPointerRad: null,

        _valueDspMult: null,

        _minValue: null,
        _maxValue: null,

        _radius: null,
        _pointerRadian: null,
        _color: null,
        _pointerColor: null,
        _borderColor: null,

        _snapStep: null,
        _snapDistance: null,

        _doubleClickSnapValue: null,
        _tmpPointerRad: null,

        _knobX: null,
        _knobY: null,

        initialize: function (id, x, y, value, canvasState, label, valueDspMult,  minValue, maxValue, radius, color, snapStep, snapDistance, doubleClickSnapValue) {
            this.$super(id, x, y, value, canvasState, label);

            this._minPointerDeg = 135;
            this._maxPointerDeg = 405;

            this._minPointerRad = this.$self.calcDegToRad(this._minPointerDeg);
            this._maxPointerRad = this.$self.calcDegToRad(this._maxPointerDeg);

            this._valueDspMult = valueDspMult;

            this._minValue = minValue;
            this._maxValue = maxValue;

            this._radius = radius;
            this._pointerRadian = this.$self.calcRadFromValue(value, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);
            this._color = '#AAAAAA';

            this._snapStep = snapStep;
            this._snapDistance = snapDistance;

            this._doubleClickSnapValue = doubleClickSnapValue;
            this._tmpPointerRad = this._pointerRadian;

            this._knobX= 0;
            this._knobY= 0;

            // register eventlisteners
            var myKnob = this;
            canvasState.addListener("mousemove", function(mousePos) { myKnob.update(mousePos); })
            canvasState.addListener("mousedown", function(mousePos) { myKnob.checkSelect(mousePos); });
            canvasState.addListener("mouseup", function() { myKnob.setSelected(false); myKnob.getCanvasState().unlockPointer(); });
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
           return (this._y + this._radius + 20);
        },

        draw: function() {
            var knobFrameLineWidth = 7 * ( this._radius * 0.02 );
            var knobSelectionLineWidth = 2 * ( this._radius * 0.02 );
            var fontSize = 18 * ( this._radius * 0.02 );
            var fontFormatStr = StringUtils.multiReplace("normal %FONTSIZE%px droid sans",{ "%FONTSIZE%" : fontSize });

            var knobRadius = this._radius;
            var knobX = this.getKnobX();
            var knobY = this.getKnobY();

            var ctx = this._canvasState.getCanvasContext();

            // draw label
            ctx.beginPath();
            ctx.font = fontFormatStr;
            ctx.fillStyle = "#000";
            var metrics = ctx.measureText(this._label);
            var txtWidth = metrics.width;
            ctx.fillText(this._label,knobX - (txtWidth / 2), this._y + fontSize * 0.7); //

            // draw button area (filled circle)
            ctx.beginPath();
            ctx.arc(knobX, knobY, knobRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = this._color;
            ctx.fill();

            // draw button edges
            ctx.beginPath();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = knobFrameLineWidth;
            ctx.arc(knobX, knobY, knobRadius, this._minPointerRad,  this._maxPointerRad, false);
            ctx.stroke();

            // draw pointer line
            ctx.beginPath();
            ctx.moveTo(knobX,knobY);
            var pointerLength = (knobRadius / 1.2);
            var xPointer = Math.cos(this._pointerRadian) * pointerLength + knobX;
            var yPointer = Math.sin(this._pointerRadian) * pointerLength + knobY;
            ctx.lineTo(xPointer,yPointer);
            ctx.lineWidth = knobFrameLineWidth;
            ctx.stroke();

            var rectY = (knobY + this._radius * 0.75);
            var rectW = (knobRadius * 1.5);
            var rectX = (knobX - (rectW / 2));
            var rectH = (knobRadius * 0.4);
            this.roundRect(ctx,rectX, rectY, rectW, rectH, 7, knobFrameLineWidth * 1.5, true, true);

            // draw value text
            ctx.beginPath();
            ctx.font = fontFormatStr;
            ctx.fillStyle = "#000";

            var str = (this._value * this._valueDspMult).toFixed(0);
            var txtWidth = ctx.measureText(str).width;
            ctx.fillText(str, knobX - (txtWidth / 2), knobY + this._radius * 1.1);

            if(this._selected) {
                // draw selection
                // right now this is just a stroke along the edge of the selected Shape
                ctx.beginPath();
                ctx.strokeStyle = '#FFF';
                ctx.lineWidth = knobSelectionLineWidth;
                ctx.arc(knobX, knobY, knobRadius, this._minPointerRad,  this._maxPointerRad , false);
                ctx.stroke();

                var rectW = (knobRadius * 1.6);
                var rectX = (knobX - (rectW / 2));
                var rectH = (knobRadius * 0.51);
                var rectY = (knobY + this._radius * 0.7);
                this.roundRect(ctx,rectX, rectY, rectW, rectH, 10, knobSelectionLineWidth, false, true);
            }
        },

        /**
         * Draws a rounded rectangle using the current state of the canvas.
         * If you omit the last three params, it will draw a rectangle
         * outline with a 5 pixel border radius
         * @param {CanvasRenderingContext2D} ctx
         * @param {Number} x The top left x coordinate
         * @param {Number} y The top left y coordinate
         * @param {Number} width The width of the rectangle
         * @param {Number} height The height of the rectangle
         * @param {Number} radius The corner radius. Defaults to 5;
         * @param {Number} radius The corner radius. Defaults to 7;
         * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
         * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
         */
         roundRect: function(ctx, x, y, width, height, radius, lineWidth, fill, stroke) {
            if (typeof stroke == "undefined" ) {
                stroke = true;
            }
            if (typeof radius === "undefined") {
                radius = 5;
            }
            if (typeof lineWidth === "undefined") {
                lineWidth = 7;
            }
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.lineWidth = lineWidth;
            if (stroke) {
                ctx.stroke();
            }
            if (fill) {
                ctx.fill();
            }
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

                var maxMouseDelta = 200;
                var mouseY = mousePos.getY();
                //1 - 200
                //x   - 45
                var speedup = Math.abs((10 * mouseY) / maxMouseDelta);

                var value;
                var forward = false;
                var mouseMoves = true;

                var lastValue = this._canvasState.getLastValue();

                var speed = 0.05

                if(this._snapStep == 0)
                   speed = speed * speedup;

                if( mouseY < 0 ) {

                    //check if knob was turned to far clockwise
                    if ( ( this._tmpPointerRad + speed) <= this._maxPointerRad )
                        this._tmpPointerRad += speed;
                    else
                        this._tmpPointerRad = this._maxPointerRad;

                    forward = true;
                } else if ( mouseY > 0 ) {

                    //check if knob was turned to far counter clockwise
                    if ( ( this._tmpPointerRad - speed) >= this._minPointerRad )
                        this._tmpPointerRad -= speed;
                    else
                        this._tmpPointerRad = this._minPointerRad;
                } else {
                    mouseMoves = false;
                }

                value = this.$self.calcValueFromRad(this._tmpPointerRad, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);

                if(mouseMoves) {
                    if(this._snapStep != 0) {
                        var snap = false;
                        if( forward ) {
                            if ( value - lastValue >= this._snapStep - this._snapDistance )
                                snap = true;
                        } else {
                            if ( Math.abs(value - lastValue) >=  this._snapStep - this._snapDistance )
                                snap = true;
                        }

                        if(snap) {
                            //speedup = Math.round(Math.round(speedup) / this._snapStep) * this._snapStep;

                            var step = this._snapStep; // + speedup;
                            if ( forward ) {
                                if(this._value + step <= this._maxValue)
                                    this._value = this._value + step;
                                else
                                    this._value = this._maxValue;
                            }
                            else {
                                if(this._value - step >= this._minValue)
                                    this._value = this._value - step;
                                else
                                    this._value = this._minValue;
                            }
                            this._canvasState.setLastValue(this._value);
                            this._pointerRadian = this.$self.calcRadFromValue(this._value, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);
                            this._canvasState.fire("valuechanged", this, { value: this._value, id:  this._id});
                        }
                    } else {
                        this._pointerRadian = this.$self.calcRadFromValue(value, this._minPointerRad, this._maxPointerRad, this._minValue, this._maxValue);
                        this._value = value;
                        this._canvasState.fire("valuechanged", this, { value: this._value, id:  this._id});
                    }

                }
            }
        }

    });
    return Knob;
});