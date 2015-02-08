/**
 * @namespace Snautsynth.Control.UI.Envelope
 */
define(
    [
        'dejavu',
        'kinetic',
        'app/control/ui/UIControl',
        'app/control/ui/envelope/Graph',
        'app/util/GlobalConstants',
        'app/event/Event',
        'app/util/Position',
        'app/control/ui/envelope/PointValue'
    ],
    function(
        dejavu,
        Kinetic,
        UIControl,
        Graph,
        GlobalConstants,
        Event,
        Position,
        PointValue
    ) {
        'use strict';

        var Point = dejavu.Class.declare({
            $name: 'Point',

            $extends: UIControl,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Point
             * @instance
             * @protected
             *
             * @type {Snautsynth.Control.UI.Envelope.Graph}
             */
            _graph: null,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Point
             * @instance
             * @protected
             *
             * @type {Kinetic.Circle}
             */
            _point: null,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Point
             * @instance
             *
             * @returns {Snautsynth.Control.UI.Envelope.Graph}
             */
            getGraph: function() {
                return this._graph;
            },

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Point
             * @instance
             *
             * @param {Snautsynth.Control.UI.Envelope.Graph} graph
             */
            setGraph: function(graph) {
                this._graph = graph;
            },

            $constants: {
                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Point
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                RADIUS: 8
            },

            /**
             * @constructor
             * @class Snautsynth.Control.UI.Envelope.Point
             * @extends Snautsynth.Control.UI.UIControl
             *
             * @param {number}                               id
             * @param {*}                                    value
             * @param {Snautsynth.Canvas.CanvasState}        canvasState
             * @param {string}                               color
             * @param {Snautsynth.Control.UI.Envelope.Graph} graph
             */
            initialize: function(id, value, canvasState, color, graph) {
                this.$super(id, new Position(0, 0), value, canvasState);

                this._graph = graph;

                this._point = new Kinetic.Circle({
                    fill:   color,
                    id:     id,
                    radius: Point.RADIUS
                });

                this._kineticGroup.setDraggable(true);

                var myPoint = this;

                this._kineticGroup.setDragBoundFunc(function(pos) {
                    var scale              = graph.getCanvasState().getScale();
                    var graphY             = graph.getY() * scale.y;
                    var graphX             = graph.getX() * scale.x;
                    var graphBorderBottomY = graphY + graph.getMaxPixelGain() * scale.y;

                    var leftBound  = 0;
                    var rightBound = 0;

                    switch(myPoint.getId()) {
                        case GlobalConstants.CTRL_ATTACK_POINT:
                            var decayPoint = graph.getPointById(GlobalConstants.CTRL_DECAYTIME_SUSTAINGAIN_POINT);

                            leftBound  = graphX;
                            rightBound = graphX + decayPoint.getX() * scale.x;
                            break;
                        case GlobalConstants.CTRL_DECAYTIME_SUSTAINGAIN_POINT:
                            var attackPoint  = graph.getPointById(GlobalConstants.CTRL_ATTACK_POINT);
                            var releasePoint = graph.getPointById(GlobalConstants.CTRL_RELEASE_POINT);

                            leftBound  = graphX + attackPoint.getX() * scale.x;
                            rightBound = graphX + releasePoint.getX() * scale.x;
                            break;
                        case GlobalConstants.CTRL_RELEASE_POINT:
                            var decayPointPoint = graph.getPointById(GlobalConstants.CTRL_DECAYTIME_SUSTAINGAIN_POINT);

                            leftBound  = graphX + decayPointPoint.getX() * scale.x;
                            rightBound = graphX + graph.getMaxPixelTime() * scale.x;
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

                    myPoint.setValueFromPosition();

                    var eventReturn = myPoint.getValue();

                    myPoint.getCanvasState().getBaseLayer().setAttr(
                        'event',
                        new Event(myPoint.getId(), eventReturn, Event.TYPE_VALUE_CHANGED)
                    );
                });

                this._kineticGroup.add(this._point);
            },

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Point
             * @instance
             *
             * @returns {Snautsynth.Util.Position}
             */
            calcPositionByValues: function() {
                return new Position(
                    this._value.getTime() * Graph.PIXEL_PER_TIME,
                    Graph.PIXEL_PER_GAIN - this._value.getGain() * Graph.PIXEL_PER_GAIN
                );
            },

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Point
             * @instance
             */
            setValueFromPosition: function() {
                this._value = new PointValue(
                    Graph.MAX_GAIN - (this.getY() / Graph.PIXEL_PER_GAIN),
                    this.getX() / Graph.PIXEL_PER_TIME
                );
            },

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Point
             * @instance
             *
             * @param {Snautsynth.Util.Position} newPosition
             */
            updatePosition: function(newPosition) {
                this._kineticGroup.setX(newPosition.getX());
                this._kineticGroup.setY(newPosition.getY());
            }
        });

        return Point;
    }
);
