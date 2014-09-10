define(['dejavu','kinetic', 'app/controls/Control', 'app/controls/ui/envelope/Graph', 'app/utils/GlobalConstants', 'app/event/Event'], function(dejavu, Kinetic, Control, Graph, GlobalConstants, Event){
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

            var myPoint            = this;
            var graphY             = this._graph.getY();
            var graphX             = this._graph.getX();
            var graphBorderBottomY = graphY + this._graph.getMaxPixelGain();

            this._kineticGroup.setDragBoundFunc(function(pos) {
                var leftBound  = 0;
                var rightBound = 0;

                switch(myPoint.getId()) {
                    case GlobalConstants.CTRL_ATTACK_POINT:
                        var decayPoint      = graph.getPointById(GlobalConstants.CTRL_DECAYTIME_SUSTAINGAIN_POINT);

                        leftBound           = graphX;
                        rightBound          = graphX + decayPoint.getX();
                        break;
                    case GlobalConstants.CTRL_DECAYTIME_SUSTAINGAIN_POINT:
                        var attackPoint     = graph.getPointById(GlobalConstants.CTRL_ATTACK_POINT);
                        var releasePoint    = graph.getPointById(GlobalConstants.CTRL_RELEASE_POINT);

                        leftBound           = graphX + attackPoint.getX();
                        rightBound          = graphX + releasePoint.getX();
                        break;
                    case GlobalConstants.CTRL_RELEASE_POINT:
                        var decayPointPoint    = graph.getPointById(GlobalConstants.CTRL_DECAYTIME_SUSTAINGAIN_POINT);

                        leftBound           = graphX + decayPointPoint.getX();
                        rightBound          = graphX + graph.getMaxPixelTime();
                        break;
                    default:
                        return pos;
                }

                if (pos.y >= graphBorderBottomY) {
                    pos.y = graphBorderBottomY;
                }

                if (pos.y <= graphY) {
                    pos.y = graphY;
                }

                if (pos.x <= leftBound) {
                    pos.x = leftBound;
                }

                if (pos.x >= rightBound) {
                    pos.x = rightBound;
                }

                return pos;
            });

            this._kineticGroup.on('dragmove',function() {
                myPoint.getGraph().connectPoints();

                myPoint.setValuesFromPosition();

                var eventReturn = {'gain' : myPoint.getGain(), 'time' : myPoint.getTime()};

                myPoint.getCanvasState().getBaseLayer().setAttr(
                    'event',
                    new Event(myPoint.getId(), eventReturn, Event.TYPE_VALUE_CHANGED));
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

        setValuesFromPosition: function() {
            this._time = this.getX() / Graph.PIXEL_PER_TIME;
            this._gain = Graph.MAX_GAIN - (this.getY() / Graph.PIXEL_PER_GAIN);
        },

        updatePosition: function(newPosition) {
            this._kineticGroup.setX(newPosition.x);
            this._kineticGroup.setY(newPosition.y);
        }
    });

    return Point;
});
