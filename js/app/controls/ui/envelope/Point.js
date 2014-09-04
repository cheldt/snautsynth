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

        initialize: function(id, canvasState, gain, time, color, graph) {
            this.$super(id, 0, 0, canvasState);

            this._graph = graph;
            this._gain  = gain;
            this._time  = time;

            this._point = new Kinetic.Circle({
                fill:      color,
                id:        id,
                radius:    Point.RADIUS
            });

            this._kineticGroup.setDraggable(true);

            var myPoint = this;

            var graphY = this._graph.getY();

            var graphBorderBottomY = graphY + this._graph.getMaxPixelGain();

            this._kineticGroup.setDragBoundFunc(function(pos) {
                    switch(myPoint.getId()) {
                        case Graph.ATTACK_POINT:
                            if (0 >= pos.x) {
                                pos.x = 0;
                            }

                            if (graphBorderBottomY <= pos.y) {
                                pos.y = graphBorderBottomY;
                            }

                            if (graphY >= pos.y) {
                                pos.y = graphY;
                            }

                            return pos;

                            break;
                        case Graph.DECAY_POINT:

                            break;
                        case Graph.RELEASE_POINT:

                            break;
                        case Graph.SUSTAIN_POINT:

                            break;
                        default:
                            return pos;
                    }
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
