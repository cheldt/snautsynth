define(['dejavu'], function(dejavu){

    var SnapOptions = dejavu.Class.declare({
        $name: 'SnapOptions',

        /** @type {Number} */
        _doubleClickSnapValue: null,

        /** @type {Number} */
        _snapDistance:         0,

        /** @type {Number} */
        _snapStep:             0,

        /**
         * @return {Number}
         */
        getDoubleClickSnapValue: function() {
            return this._doubleClickSnapValue;
        },

        /**
         * @return {Number}
         */
        getSnapDistance: function() {
            return this._snapDistance;
        },

        /**
         * @return {Number}
         */
        getSnapStep: function() {
            return this._snapStep;
        },

        /**
         * @param {Number} doubleClickSnapValue The value to which the controller jumps on double-click
         * @param {Number} snapDistance         The distance to next/prev step, which triggers snap to step
         * @param {Number} snapStep             The step-value the controller jumps
         */
        initialize: function(doubleClickSnapValue, snapDistance, snapStep) {
            this._doubleClickSnapValue = doubleClickSnapValue;
            this._snapDistance         = snapDistance;
            this._snapStep             = snapStep;
        }
    });

    return SnapOptions;
});