/**
 * @namespace Snautsynth.Event
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    return dejavu.Class.declare({
        $name: 'ControlConnection',

        /**
         * @memberof Snautsynth.Event.ControlConnection
         * @instance
         * @protected
         *
         * @type {function}
         */
        _callback: null,

        /**
         * @memberof Snautsynth.Event.ControlConnection
         * @instance
         * @protected
         *
         * @type {number}
         */
        _controlId: null,

        /**
         * @memberof Snautsynth.Event.ControlConnection
         * @instance
         * @protected
         *
         * @type {number}
         */
        _controlTarget: null,

        /**
         * @memberof Snautsynth.Event.ControlConnection
         * @instance
         * @protected
         *
         * @type {number}
         */
        _moduleId: null,

        /**
         * @memberof Snautsynth.Event.ControlConnection
         * @instance
         *
         * @returns {function}
         */
        getCallback: function() {
            return this._callback;
        },

        /**
         * @memberof Snautsynth.Event.ControlConnection
         * @instance
         *
         * @param {function} callback
         */
        setCallback: function(callback) {
            this._callback = callback;
        },

        /**
         * @memberof Snautsynth.Event.ControlConnection
         * @instance
         *
         * @returns {number}
         */
        getControlId: function() {
            return this._controlId;
        },

        /**
         * @memberof Snautsynth.Event.ControlConnection
         * @instance
         *
         * @returns {number}
         */
        getControlTarget: function() {
            return this._controlTarget;
        },

        /**
         * @memberof Snautsynth.Event.ControlConnection
         * @instance
         *
         * @returns {number}
         */
        getModuleId: function() {
            return this._moduleId;
        },

        /**
         * @constructor
         * @class Snautsynth.Event.ControlConnection
         *
         * @param {number} controlId
         * @param {number} moduleId
         * @param {number} controlTarget
         */
        initialize: function(controlId, moduleId, controlTarget) {
            this._controlId     = controlId;
            this._moduleId      = moduleId;
            this._controlTarget = controlTarget;
        }
    });
});