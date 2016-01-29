/**
 * @namespace Snautsynth.Control.UI.Envelope
 */
define(
    [
        'dejavu',
        'konva',
        'app/control/ui/UIControl',
        'app/util/GlobalConstants',
        'app/event/Event',
        'app/util/Position',
        'app/control/ui/envelope/PointValue'

    ],
    function(
        dejavu,
        Konva,
        UIControl,
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
             * @type {Konva.Circle}
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
                RADIUS:                 8,

                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Point
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                PIXEL_PER_GAIN:         100,

                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Point
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                PIXEL_PER_TIME:         60,

                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Point
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                MAX_GAIN:               1,

                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Point
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_POINT_ATTACK:      1,

                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Point
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_POINT_DECAY:       2,

                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Point
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_POINT_SUSTAIN:     3,

                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Point
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_POINT_RELEASE:     4
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

                this._point = new Konva.Circle({
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
                        case Point.CTRL_POINT_ATTACK:
                            var decayPoint = graph.getPointById(Point.CTRL_POINT_DECAY);

                            leftBound  = graphX;
                            rightBound = graphX + decayPoint.getX() * scale.x;
                            break;
                        case Point.CTRL_POINT_DECAY:
                            var attackPoint  = graph.getPointById(Point.CTRL_POINT_ATTACK);
                            var sustainPoint = graph.getPointById(Point.CTRL_POINT_SUSTAIN);

                            leftBound  = graphX + attackPoint.getX() * scale.x;
                            rightBound = graphX + sustainPoint.getX() * scale.x;
                            break;

                        case Point.CTRL_POINT_SUSTAIN:
                            var decayPoint   = graph.getPointById(Point.CTRL_POINT_DECAY);
                            var releasePoint = graph.getPointById(Point.CTRL_POINT_RELEASE);

                            leftBound  = graphX + decayPoint.getX() * scale.x;
                            rightBound = graphX + releasePoint.getX() * scale.x;
                            break;
                        case Point.CTRL_POINT_RELEASE:
                            var sustainPoint = graph.getPointById(Point.CTRL_POINT_SUSTAIN);

                            leftBound  = graphX + sustainPoint.getX() * scale.x;
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

                this._kineticGroup.add(this._point);

                this.addEventListener();
            },

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Point
             * @instance
             */
            addEventListener: function() {
                var myPoint = this;

                this._kineticGroup.on('dragmove', function() {
                    myPoint.setValueFromPosition();

                    var eventReturn = myPoint.getValue();
                    var graph       = myPoint.getGraph();

                    if (Point.CTRL_POINT_DECAY === myPoint.getId()) {
                        var sustainPoint = graph.getPointById(Point.CTRL_POINT_SUSTAIN);
                        myPoint.moveCorrespondentPoint(sustainPoint);

                    }

                    if (Point.CTRL_POINT_SUSTAIN === myPoint.getId()) {
                        var decayPoint = graph.getPointById(Point.CTRL_POINT_DECAY);
                        myPoint.moveCorrespondentPoint(decayPoint);
                    }

                    myPoint.getGraph().connectPoints();

                    myPoint.getCanvasState().getBaseLayer().setAttr(
                        'event',
                        new Event(graph.getId(), eventReturn, Event.TYPE_VALUE_CHANGED)
                    );
                });
            },

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Point
             * @instance
             *
             * @returns {Snautsynth.Util.Position}
             */
            calcPositionByValues: function() {
                return new Position(
                    this._value.getTime() * Point.PIXEL_PER_TIME,
                    Point.PIXEL_PER_GAIN - (this._value.getGain() * Point.PIXEL_PER_GAIN)
                );
            },

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Point
             * @instance
             */
            setValueFromPosition: function() {
                this._value = new PointValue(
                    this.getId(),
                    Point.MAX_GAIN - (this.getY() / Point.PIXEL_PER_GAIN),
                    this.getX() / Point.PIXEL_PER_TIME
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
            },

            /**
             * @param {Snautsynth.Control.UI.Envelope.Point} point
             * @private
             */
            moveCorrespondentPoint: function(point) {
                point.setValue(
                    new PointValue(
                        point.getId(),
                        this.getValue().getGain(),
                        point.getValue().getTime()
                    )
                );

                point.updatePosition(point.calcPositionByValues());

                this.getCanvasState().getBaseLayer().setAttr(
                    'event',
                    new Event(this.getGraph().getId(), point.getValue(), Event.TYPE_VALUE_CHANGED)
                );
            }
        });

        return Point;
    }
);
