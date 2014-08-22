define(['dejavu','kinetic', 'app/controls/Control'], function(dejavu, Kinetic, Control){
    var Point = dejavu.Class.declare({
        $name: 'Point',

        $extends: Control,

        _gain: null,
        _time: null,

        getGain: function() {
            return this._gain;
        },
        setGain: function(gain) {
            this._gain = gain;
            return this;
        },

        getTime: function() {
            return this._time;
        },
        setTime: function(time) {
            this._time = time;
            return this;
        },

        initialize: function(id, x, y, canvasState, gain, time) {
            this.$super(id, x, y, canvasState);

            this._gain = gain;
            this._time = time;
        },

        calcPositionFromValues: function() {


        }
    });

    return Point;
});
