/**
 * @namespace Snautsynth.Control.UI.DiscreteControl
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    return dejavu.Class.declare({
        $name: 'KeyValue',

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
         * @instance
         * @protected
         *
         * @type {number}
         */
        _keyCode: null,

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
         * @instance
         * @protected
         *
         * @type {number}
         */
        _keyState: null,

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
         * @instance
         *
         * @return {number}
         */
        getKeyCode: function() {
            return this._keyCode;
        },

        /**
         * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
         * @instance
         *
         * @return {number}
         */
        getKeyState: function() {
            return this._keyState;
        },

        $constants: {
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_STATE_DOWN: 0,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_STATE_UP:   1,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_A: 65,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_W: 87,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_S: 83,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_E: 69,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_D: 68,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_F: 70,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_T: 84,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_G: 71,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_Z: 90,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_H: 72,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_U: 85,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_J: 74,
            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.KeyValue
             * @constant
             * @default
             *
             * @type {number}
             */
            KEY_CODE_K: 75
        },

        /**
         * @constructor
         * @class Snautsynth.Control.UI.DiscreteControl.KeyValue
         *
         * @param {number} keyCode
         * @param {number} keyState
         */
        initialize: function(keyCode, keyState) {
            this._keyCode  = keyCode;
            this._keyState = keyState;
        }
    });
});