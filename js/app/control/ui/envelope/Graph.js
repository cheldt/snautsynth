/**
 * @namespace Snautsynth.Control.UI.Envelope
 */
define(
    [
        'dejavu',
        'konva',
        'app/audio/module/EnvelopeTargetOptions',
        'app/control/ui/envelope/Point',
        'app/control/ui/UIControl'
    ],
    function (
        dejavu,
        Konva,
        EnvelopeTargetOptions,
        Point,
        UIControl
    ) {
        'use strict';

        var Graph = dejavu.Class.declare({
            $name: 'Graph',

            $extends: UIControl,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Graph
             * @instance
             * @private
             *
             * @type {Snautsynth.Control.UI.Envelope.GraphOptions}
             */
            __graphOptions: null,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Graph
             * @instance
             * @private
             *
             * @type {number}
             */
            __maxPixelGain: null,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Graph
             * @instance
             * @private
             *
             * @type {number}
             */
            __maxPixelTime: null,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Graph
             * @instance
             * @private
             *
             * @type {Konva.Line}
             */
            __pointConnection: null,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Graph
             * @instance
             * @private
             *
             * @type {Konva.Line}
             */
            __xAxis: null,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Graph
             * @instance
             * @private
             *
             * @type {Konva.Line}
             */
            __yAxis: null,

            __isSetUp: false,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Graph
             * @instance
             *
             * @returns {number}
             */
            getMaxPixelGain: function() {
                return this.__maxPixelGain;
            },

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Graph
             * @instance
             *
             * @returns {number}
             */
            getMaxPixelTime: function() {
                return this.__maxPixelTime;
            },

            $constants: {


                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Graph
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                X_Y_AXIS_WIDTH:       3,

                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Graph
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                POINTCONNECTOR_WIDTH: 1.5
            },

            /**
             * @constructor
             * @class Snautsynth.Control.UI.Envelope.Graph
             * @extends Snautsynth.Control.UI.UIControl
             *
             * @param {number}                                      id
             * @param {*}                                           value
             * @param {Snautsynth.Util.Position}                    position
             * @param {Snautsynth.Canvas.CanvasState}               canvasState
             * @param {Snautsynth.Control.UI.Envelope.GraphOptions} graphOptions
             */
            initialize: function(id, value, position, canvasState, graphOptions) {
                this.$super(id, position, value, canvasState);

                this.__graphOptions = graphOptions;

                this._controls = [];
                var color = graphOptions.getColor();

                this.__xAxis = new Konva.Line({
                    strokeWidth:      Graph.X_Y_AXIS_WIDTH,
                    stroke:           color,
                    lineCap:          'round',
                    lineJoin:         'round',
                    listening:        false,
                    strokeHitEnabled: false
                });

                this._kineticGroup.add(this.__xAxis);

                this.__yAxis = new Konva.Line({
                    strokeWidth:      Graph.X_Y_AXIS_WIDTH,
                    stroke:           color,
                    lineCap:          'round',
                    lineJoin:         'round',
                    listening:        false,
                    strokeHitEnabled: false
                });

                this._kineticGroup.add(this.__yAxis);

                this.__pointConnection = new Konva.Line({
                    strokeWidth:      Graph.POINTCONNECTOR_WIDTH,
                    stroke:           color,
                    lineCap:          'round',
                    lineJoin:         'round',
                    listening:        false,
                    strokeHitEnabled: false
                });

                this._kineticGroup.add(this.__pointConnection);
            },

            /**
             * Adds point to internal array and adds konvagroup of point to konvagroup of Graph.
             *
             * @param {Snautsynth.Control.UI.Envelope.Point} point
             */
            addControl: function(point) {
                this.$super(point);
            },

            /**
             * Renders connections between points
             *
             * @memberof Snautsynth.Control.UI.Envelope.Graph
             * @instance
             */
            connectPoints: function() {
                var pointConnectorCoordsList = [0, Point.PIXEL_PER_GAIN];

                for (var pointIndex = 0; pointIndex < this._controls.length; pointIndex++) {
                    var point = this._controls[pointIndex];
                    pointConnectorCoordsList.push(point.getX());
                    pointConnectorCoordsList.push(point.getY());
                }

                var lastPoint = this._controls[this._controls.length - 1];

                pointConnectorCoordsList.push(this.__maxPixelTime, lastPoint.getY());

                this.__pointConnection.setPoints(pointConnectorCoordsList);
            },

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Graph
             * @instance
             *
             * @param   {number} id
             *
             * @returns {Snautsynth.Control.UI.Envelope.Point}
             */
            getPointById: function(id) {
                var point = null;

                for (var pointIndex = 0; pointIndex < this._controls.length; pointIndex++) {
                    point = this._controls[pointIndex];

                    if (point.getId() === id) {
                        return point;
                    }
                }
            },

            /**
             * @memberof Snautsynth.Control.UI.Envelope.Graph
             * @instance
             *
             * @param {Snautsynth.Audio.Module.EnvelopeTargetOptions} valueOptions
             */
            setUp: function(valueOptions) {
                if (this.__isSetUp) {
                    return;
                }

                this.__isSetUp = true;

                var minTime    = 0;
                var value      = this._value;
                var pointColor = this.__graphOptions.getPointColor();
                var maxTime    = this.__graphOptions.getMaxTime();

                this.__addPoint(Point.CTRL_POINT_ATTACK, value.getAttack(), pointColor);
                this.__addPoint(Point.CTRL_POINT_DECAY, value.getDecay(), pointColor);
                this.__addPoint(Point.CTRL_POINT_SUSTAIN, value.getSustain(), pointColor);
                this.__addPoint(Point.CTRL_POINT_RELEASE, value.getRelease(), pointColor);

                for (var pointIndex = 0; pointIndex < this._controls.length; pointIndex++) {
                    var point = this._controls[pointIndex];

                    var pointValue = point.getValue();
                    minTime = pointValue.getTime();
                    point.updatePosition(point.calcPositionByValues());
                }

                if (minTime > maxTime) {
                    maxTime = minTime;
                }

                this.__maxPixelGain = Point.MAX_GAIN * Point.PIXEL_PER_GAIN;
                this.__maxPixelTime = maxTime * Point.PIXEL_PER_TIME;

                this.__xAxis.points([0, this.__maxPixelGain, this.__maxPixelTime, this.__maxPixelGain]);
                this.__yAxis.points([0, 0, 0, this.__maxPixelGain]);

                this.connectPoints();
            },

            /**
             * @param {Snautsynth.Control.UI.Envelope.PointValue} pointValue
             * @param {string}                                    color
             * @instance
             * @private
             */
            __addPoint: function(id, pointValue, color) {
                this.addControl(new Point(id, pointValue, this._canvasState, color, this));
            }
        });

        return Graph;
});
