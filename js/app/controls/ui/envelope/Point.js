define(['dejavu','kinetic', 'app/controls/Control', 'app/controls/ui/envelope/Graph'], function(dejavu, Kinetic, Control, Graph){
    var Point = dejavu.Class.declare({
        $name: 'Point',

        $extends: Control,

        _gain: null,
        _graph: null,
        _point: null,
        _time: null,

        getGraph: function() {
            return this._graph;
        },
        setGraph: function(graph) {
            this._graph = graph;
            return this;
        },

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

        $constants: {
            RADIUS: 8
        },

        initialize: function(id, canvasState, gain, time, color) {
            this.$super(id, 0, 0, canvasState);

            this._gain  = gain;
            this._time  = time;

            this._point = new Kinetic.Circle({
                fill:      color,
                id:        id,
                radius:    Point.RADIUS
            });

            this._kineticGroup.setDraggable(true);

            var myPoint = this;

            this._kineticGroup.setDragBoundFunc(function(pos) {
                   return pos;
            });

            this._kineticGroup.on('dragmove',function() {
                myPoint.getGraph().connectPoints();
            });

            this._kineticGroup.add(this._point);
        },

        calcPositionByValues: function() {
            var halfRadius = Point.RADIUS / 2;
            return {
                x: this._time * Graph.PIXEL_PER_TIME,
                y: Graph.PIXEL_PER_GAIN - this._gain * Graph.PIXEL_PER_GAIN
            };
        },

        updatePosition: function(newPosition) {
            this._kineticGroup.setX(newPosition.x);
            this._kineticGroup.setY(newPosition.y);
        },

        setValuesFromPosition: function() {
            this._time = this.getX() / Gain.PIXEL_PER_TIME;
            this._gain = this.getY() / Gain.PIXEL_PER_GAIN;
        }
    });

    return Point;
});
