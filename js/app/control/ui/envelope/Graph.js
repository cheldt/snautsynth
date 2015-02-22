/**
 * @namespace Snautsynth.Control.UI.Envelope
 */
define(['dejavu','konva', 'app/control/Control'], function(dejavu, Konva, Control){
    'use strict';

    var Graph = dejavu.Class.declare({
        $name: 'Graph',

        $extends: Control,

        /**
         * @memberof Snautsynth.Control.UI.Envelope.Graph
         * @instance
         * @protected
         *
         * @type {number}
         */
        _maxGain: null,

        /**
         * @memberof Snautsynth.Control.UI.Envelope.Graph
         * @instance
         * @protected
         *
         * @type {number}
         */
        _maxTime: null,

        /**
         * @memberof Snautsynth.Control.UI.Envelope.Graph
         * @instance
         * @protected
         *
         * @type {number}
         */
        _maxPixelGain: null,

        /**
         * @memberof Snautsynth.Control.UI.Envelope.Graph
         * @instance
         * @protected
         *
         * @type {number}
         */
        _maxPixelTime: null,

        /**
         * @memberof Snautsynth.Control.UI.Envelope.Graph
         * @instance
         * @protected
         *
         * @type {Konva.Line}
         */
        _pointConnection: null,

        /**
         * @memberof Snautsynth.Control.UI.Envelope.Graph
         * @instance
         *
         * @returns {number}
         */
        getMaxPixelGain: function() {
            return this._maxPixelGain;
        },

        /**
         * @memberof Snautsynth.Control.UI.Envelope.Graph
         * @instance
         *
         * @returns {number}
         */
        getMaxPixelTime: function() {
            return this._maxPixelTime;
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

            this._controls     = [];
            this._maxTime      = maxTime;

            this._maxPixelGain = Graph.MAX_GAIN * Graph.PIXEL_PER_GAIN;
            this._maxPixelTime = maxTime * Graph.PIXEL_PER_TIME;

            var xAxis = new Konva.Line({
                points:      [0, this._maxPixelGain , this._maxPixelTime, this._maxPixelGain ],
                strokeWidth: Graph.X_Y_AXIS_WIDTH,
                stroke:      color,
                lineCap:     'round',
                lineJoin:    'round'
            });

            this._kineticGroup.add(xAxis);

            var yAxis = new Konva.Line({
                points:      [0, 0, 0, this._maxPixelGain],
                strokeWidth: Graph.X_Y_AXIS_WIDTH,
                stroke:      color,
                lineCap:     'round',
                lineJoin:    'round'
            });

            this._kineticGroup.add(yAxis);

            this._pointConnection = new Konva.Line({
                strokeWidth: Graph.POINTCONNECTOR_WIDTH,
                stroke:      color,
                lineCap:     'round',
                lineJoin:    'round'
            });

            this._kineticGroup.add(this._pointConnection);
        },

        /**
         * Adds point to internal array and adds kinectgroup of point to kinectgroup of Graph.
         *
         * @param {Snautsynth.Control.UI.Envelope.Point} point
         */
        addControl: function(point) {
            this.$super(point);

            var newPosition = point.calcPositionByValues();

            point.updatePosition(newPosition);

            this.connectPoints();
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

            pointConnectorCoordsList.push(this._maxPixelTime, lastPoint.getY())

            this._pointConnection.setPoints(pointConnectorCoordsList);
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
        }
    });

    return Graph;
});