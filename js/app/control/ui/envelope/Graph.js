define(['dejavu','kinetic', 'app/control/Control'], function(dejavu, Kinetic, Control){
    var Graph = dejavu.Class.declare({
        $name: 'Graph',

        $extends: Control,

        _maxGain:         null,
        _maxTime:         null,
        _maxPixelGain:    null,
        _maxPixelTime:    null,
        _pointConnection: null,

        getMaxPixelGain: function() {
            return this._maxPixelGain;
        },

        getMaxPixelTime: function() {
            return this._maxPixelTime;
        },

        $constants: {
            PIXEL_PER_GAIN:       100,
            PIXEL_PER_TIME:       40,
            MAX_GAIN:             1,

            X_Y_AXIS_WIDTH:       3,
            POINTCONNECTOR_WIDTH: 1.5
        },

        initialize: function(id, position, canvasState, maxTime) {
            this.$super(id, position, canvasState);

            this._controls     = [];
            this._maxTime      = maxTime;

            this._maxPixelGain = Graph.MAX_GAIN * Graph.PIXEL_PER_GAIN;
            this._maxPixelTime = maxTime * Graph.PIXEL_PER_TIME;

            var xAxis = new Kinetic.Line({
                points:      [0, this._maxPixelGain , this._maxPixelTime, this._maxPixelGain ],
                strokeWidth: Graph.X_Y_AXIS_WIDTH,
                stroke:      '#000',
                lineCap:     'round',
                lineJoin:    'round'
            });

            this._kineticGroup.add(xAxis);

            var yAxis = new Kinetic.Line({
                points:      [0, 0, 0, this._maxPixelGain],
                strokeWidth: Graph.X_Y_AXIS_WIDTH,
                stroke:      '#000',
                lineCap:     'round',
                lineJoin:    'round'
            });

            this._kineticGroup.add(yAxis);

            this._pointConnection = new Kinetic.Line({
                strokeWidth: Graph.POINTCONNECTOR_WIDTH,
                stroke:      '#000',
                lineCap:     'round',
                lineJoin:    'round'
            });

            this._kineticGroup.add(this._pointConnection);
        },

        /**
         * Adds point to internal array and adds kinectgroup of point to kinectgroup of Graph.
         *
         * @param point
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

        getPointById: function(id) {
            var point = null;

            for (var pointIndex = 0; pointIndex < this._controls.length; pointIndex++) {
                point = this._controls[pointIndex];

                if (point.getId() == id) {
                    return point;
                }
            }
        }
    });

    return Graph;
});