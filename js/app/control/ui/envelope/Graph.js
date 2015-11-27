/**
 * @namespace Snautsynth.Control.UI.Envelope
 */
define(
    [
        'dejavu',
        'konva',
        'app/control/Control'
    ],
    function (
        dejavu,
        Konva,
        Control
    ) {
        'use strict';

        var Graph = dejavu.Class.declare({
            $name: 'Graph',

            $extends: Control,


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
             * @type {number}
             */
            __maxTime: null,

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
                PIXEL_PER_GAIN:       100,

                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Graph
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                PIXEL_PER_TIME:       80,

                /**
                 * @memberof Snautsynth.Control.UI.Envelope.Graph
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                MAX_GAIN:             1,

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
             * @param {number}                        id
             * @param {Snautsynth.Util.Position}      position
             * @param {Snautsynth.Canvas.CanvasState} canvasState
             * @param {string}                        color
             * @param {number}                        maxTime
             */
            initialize: function(id, position, canvasState, color, maxTime) {
                this.$super(id, position, canvasState);

                this._controls = [];
                this.__maxTime = maxTime;

                this.__xAxis = new Konva.Line({
                    strokeWidth: Graph.X_Y_AXIS_WIDTH,
                    stroke:      color,
                    lineCap:     'round',
                    lineJoin:    'round'
                });

                this._kineticGroup.add(this.__xAxis);

                this.__yAxis = new Konva.Line({
                    strokeWidth: Graph.X_Y_AXIS_WIDTH,
                    stroke:      color,
                    lineCap:     'round',
                    lineJoin:    'round'
                });

                this._kineticGroup.add(this.__yAxis);

                this.__pointConnection = new Konva.Line({
                    strokeWidth: Graph.POINTCONNECTOR_WIDTH,
                    stroke:      color,
                    lineCap:     'round',
                    lineJoin:    'round'
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
                var pointConnectorCoordsList = [0, Graph.PIXEL_PER_GAIN];

                for (var pointIndex = 0; pointIndex < this._controls.length; pointIndex++) {
                    var point = this._controls[pointIndex];
                    pointConnectorCoordsList.push(point.getX());
                    pointConnectorCoordsList.push(point.getY());
                }

                var lastPoint = this._controls[this._controls.length - 1];

                pointConnectorCoordsList.push(this.__maxPixelTime, lastPoint.getY())

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
             */
            setUp: function() {
                var minTime = 0;


                for (var pointIndex = 0; pointIndex < this._controls.length; pointIndex++) {
                    var point      = this._controls[pointIndex];
                    var pointValue = point.getValue();
                    minTime = minTime + pointValue.getTime();
                    point.updatePosition(point.calcPositionByValues());
                }

                if (minTime > this.__maxTime) {
                    this.__maxTime = minTime;
                }

                this.__maxPixelGain = Graph.MAX_GAIN * Graph.PIXEL_PER_GAIN;
                this.__maxPixelTime = this.__maxTime * Graph.PIXEL_PER_TIME;

                this.__xAxis.points([0, this.__maxPixelGain , this.__maxPixelTime, this.__maxPixelGain ]);
                this.__yAxis.points([0, 0, 0, this.__maxPixelGain]);

                this.connectPoints();
            }
        });

        return Graph;
});