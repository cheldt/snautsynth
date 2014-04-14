define(['dejavu', 'app/controls/ui/RangeControl'], function(dejavu, RangeControl){
    var Fader = dejavu.Class.declare({
        $name: 'Fader',

        $extends: RangeControl,

        _orientation: null,
        _length: null,
        _color: null,

        _faderPosX: null,
        _faderPosY: null,

        $constants: {
            ORIENTATION_HORIZONTAL : 0,
            ORIENTATION_VERTICAL: 1,
            LABEL_OFFSET: 20,
            FADER_KNOB_HEIGHT: 20,
            FADER_KNOB_WIDTH: 10,
            FADER_TRACK_WIDTH: 5
        },

        initialize: function (id, x, y, value, canvasState, label, valueDspMult, minValue, maxValue, length, color, snapStep, snapDistance, doubleClickSnapValue, orientation) {
            this.$super(id, x, y, value, canvasState, label, valueDspMult, minValue, maxValue, snapStep, snapDistance, doubleClickSnapValue);

            this._length = length;
            this._color = color;
            this._orientation = orientation;

            this._faderPosX = 0;
            this._faderPosY = 0;

            // register eventlisteners
            var myKnob = this;
            canvasState.addListener("mousemove", function(mousePos) { myKnob.update(mousePos); })
            canvasState.addListener("mousedown", function(mousePos) { myKnob.checkSelect(mousePos); });
            canvasState.addListener("mouseup", function() { myKnob.setSelected(false); myKnob.getCanvasState().unlockPointer(); });
        },

        setFaderPosFromValue: function(value) {

            //calculate fader-knob movement from value (rule of three)
            //fader-tracklength(px)      -> maxValue
            //newPos(px)            -> value
            var newPos = (this._length * value) / maxValue;

            switch(this._orientation) {
                case this.$self.ORIENTATION_HORIZONTAL:
                    this._faderPosX = this._x + newPos;
                break;
                case this.$self.ORIENTATION_VERTICAL:
                    this._faderPosY = this._y + newPos;
                break;
            }
        },

        checkSelect: function() {

        },

        contains: function(mx, my) {
            //checks if mouse is over fader button

        },

        draw: function() {
            //draw line of fader
            var ctx = this._canvasState.getCanvasContext();

            var trackStartX, trackStartY;
            var trackEndX,  trackEndY;

            var halfKnobWidth = this.$self.FADER_KNOB_WIDTH / 2;

            //calculate various position values depending on orientation
            switch(this._orientation) {
                case this.$self.ORIENTATION_HORIZONTAL:
                        trackStartX = this._x;
                        trackStartY = this._y + halfKnobWidth;

                        trackEndX = this._x + this._length;
                        trackEndY = trackStartY;
                    break;
                case this.$self.ORIENTATION_VERTICAL:
                        trackStartX = this._x ;
                        trackStartY = this._y + halfKnobWidth;

                        trackEndX = trackStartX;
                        trackEndY = this._y + this._length;
                    break;
            }

            //draw track
            ctx.beginPath();
            ctx.moveTo(trackStartX, trackStartY);
            ctx.lineTo(trackEndX, trackEndY);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = this.$self.FADER_TRACK_WIDTH;
            ctx.stroke();

            //draw fader handler
        },

        formatValue: function() {
            return 0;
        },

        update: function(mousePos) {

        }

    });
    return Fader;
});
