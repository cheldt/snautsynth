define(['dejavu','kinetic', 'app/controls/Control'], function(dejavu, Kinetic, Control){
    var Graph = dejavu.Class.declare({
        $name: 'Graph',

        $extends: Control,

        _maxGain: null,
        _maxTime: null,
        _pixelPerGain: null,
        _pixelPerTime: null,
        _points: null,

        initialize: function(id, x, y, canvasState, maxGain, maxTime, pixelPerGain, pixelPerTime) {
            this.$super(id, x, y, canvasState);

            this._maxGain = maxGain;
            this._maxTime = maxTime;
            this._points  = [];

            this._kineticGroup.on('click', function(evt) {

            });
        },

        addPoint: function(point) {
            this._points.add(point);
            this._kineticGroup.add(point.getKineticGroup());
        },

        calcPointPositionByValues: function(pointId, gain, time) {
            switch(pointId) {

            }
        }
    });

    return Graph;
});