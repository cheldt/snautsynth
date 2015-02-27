/**
 * @namespace Snautsynth.Control.UI
 */
define(['dejavu'], function(dejavu){

    var SnapOptions = dejavu.Class.declare({
        $name: 'SnapOptions',

        /**
         * @memberof Snautsynth.Control.UI.SnapOptions
         * @instance
         * @protected
         *
         * @type {null|number}
         */
        _doubleClickSnapValue: null,

        /**
         * @memberof Snautsynth.Control.UI.SnapOptions
         * @instance
         * @protected
         *
         * @type {number}
         */
        _snapDistance:         0,

        /**
         * @memberof Snautsynth.Control.UI.SnapOptions
         * @instance
         * @protected
         *
         * @type {number}
         */
        _snapStep:             0,

        /**
         * @memberof Snautsynth.Control.UI.SnapOptions
         * @instance
         * @protected
         *
         * @return {null|number}
         */
        getDoubleClickSnapValue: function() {
            return this._doubleClickSnapValue;
        },

        /**
         * @memberof Snautsynth.Control.UI.SnapOptions
         * @instance
         *
         * @return {number}
         */
        getSnapDistance: function() {
            return this._snapDistance;
        },

        /**
         * @memberof Snautsynth.Control.UI.SnapOptions
         * @instance
         *
         * @return {number}
         */
        getSnapStep: function() {
            return this._snapStep;
        },

        /**
         * @constructor
         * @class Snautsynth.Control.UI.SnapOptions
         *
         * @param {number} doubleClickSnapValue The value to which the controller jumps on double-click
         * @param {number} snapDistance         The distance to next/prev step, which triggers snap to step-value
         * @param {number} snapStep             The step-value the controller jumps
         */
        initialize: function(doubleClickSnapValue, snapDistance, snapStep) {
            this._doubleClickSnapValue = doubleClickSnapValue;
            this._snapDistance         = snapDistance;
            this._snapStep             = snapStep;
        }
    });

    return SnapOptions;
});