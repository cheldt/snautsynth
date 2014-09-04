define(['dejavu','kinetic', 'app/controls/Control'], function(dejavu, Kinetic, Control){
    var Graph = dejavu.Class.declare({
        $name: 'Graph',

        $extends: Control,

        _maxGain:         null,
        _maxTime:         null,
        _maxPixelGain:    null,
        _maxPixelTime:    null,
        _points:          null,
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

            ATTACK_POINT:         0,
            DECAY_POINT:          1,
            RELEASE_POINT:        2,
            SUSTAIN_POINT:        3,

            X_Y_AXIS_WIDTH:       3,
            POINTCONNECTOR_WIDTH: 1.5
        },

        initialize: function(id, x, y, canvasState, maxTime) {
            this.$super(id, x, y, canvasState);

            this._maxTime    = maxTime;
            this._points     = [];

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


            //this._kineticGroup.on('click', function(evt) {

            //});
        },

        /**
         * Adds point to internal array and adds kinectgroup of point to kinectgroup of Graph.
         *
         * @param point
         */
        addPoint: function(point) {
            this._points.push(point);
            this._kineticGroup.add(point.getKineticGroup());

            var newPosition = null;
            newPosition     = point.calcPositionByValues();

            point.updatePosition(newPosition);

            this.connectPoints();
        },

        /**
         * Renders connections between points
         *
         */
        connectPoints: function() {
            var pointConnectorCoordsList = [0, Graph.PIXEL_PER_GAIN];

            for (var pointIndex = 0; pointIndex < this._points.length; pointIndex++) {
                var point = this._points[pointIndex];
                pointConnectorCoordsList.push(point.getX());
                pointConnectorCoordsList.push(point.getY());
            }

            var lastPoint = this._points[this._points.length - 1];

            pointConnectorCoordsList.push(this._maxPixelTime, lastPoint.getY())

            this._pointConnection.setPoints(pointConnectorCoordsList);
        }

        /*
        calcPointPositionsByValues: function(pointId) {
            var xOffset     = 0;
            var yOffset     = 0;
            var pointCount  = this._points.length;
            var point       = null;


            for (var pointIndex = 0; pointIndex < pointCount; pointIndex++) {
                point       = this._points[pointIndex];
                newPosition = point.calcPositionFromValues();

                point.updatePosition(newPosition);
            }
        }
        */
    });

    return Graph;
});