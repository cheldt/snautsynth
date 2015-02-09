/**
 * @namespace Snautsynth.Event
 */
define(['dejavu'], function(dejavu){
    'use strict';

    return dejavu.Class.declare({
        $name: 'Event',

        /**
         * @memberof Snautsynth.Event.Event
         * @instance
         *
         * @type {number}
         */
        _controlId: null,

        /**
         * @memberof Snautsynth.Event.Event
         * @instance
         *
         * @type {*}
         */
        _value: null,

        /**
         * @memberof Snautsynth.Event.Event
         * @instance
         *
         * @type {number}
         */
        _type: null,

        $constants: {
            /**
             * @memberof Snautsynth.Event.Event
             * @constant
             * @default
             *
             * @type {number}
             */
            TYPE_VALUE_CHANGED:   1,

            /**
             * @memberof Snautsynth.Event.Event
             * @constant
             * @default
             *
             * @type {number}
             */
            TYPE_CHECKED_CHANGED: 2
        },

        /**
         * @memberof Snautsynth.Event.Event
         * @instance
         *
         * @returns {number}
         */
        getControlId: function() {
            return this._controlId;
        },

        /**
         * @memberof Snautsynth.Event.Event
         * @instance
         *
         * @returns {*}
         */
        getValue: function() {
            return this._value;
        },

        /**
         * @memberof Snautsynth.Event.Event
         * @instance
         *
         * @return {number}
         */
        getType: function() {
            return this._type;
        },

        /**
         * @constructor
         * @class Snautsynth.Event.Event
         *
         * @param {number} controlId
         * @param {*}      value
         * @param {number} type
         */
        initialize: function(controlId, value, type) {
            this._controlId = controlId;
            this._value     = value;
            this._type      = type;
        }
    });
});