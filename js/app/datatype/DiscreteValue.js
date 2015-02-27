/**
 * @namespace Snautsynth.DataType
 */
define(['dejavu'], function(dejavu) {
    return dejavu.Class.declare({
        $name: 'DiscreteValue',

        /**
         * @memberof Snautsynth.DataType.DiscreteValue
         * @protected
         *
         * @type {string}
         */
        _name: null,

        /**
         * @memberof Snautsynth.DataType.DiscreteValue
         * @protected
         *
         * @type {*}
         */
        _value: null,

        /**
         * @memberof Snautsynth.DataType.DiscreteValue
         * @instance
         *
         * @return {string}
         */
        getName: function() {
            return this._name;
        },

        /**
         * @memberof Snautsynth.DataType.DiscreteValue
         * @instance
         *
         * @return {*}
         */
        getValue: function() {
            return this._value;
        },

        /**
         * @class Snautsynth.DataType.DiscreteValue
         * @constructor
         *
         * @param {string} name
         * @param {*}      value
         */
        initialize: function(name, value) {
            this._name  = name;
            this._value = value;
        }
    });
});
