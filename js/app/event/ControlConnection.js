/**
 * @namespace Snautsynth.Event
 */
define(['dejavu', 'app/audio/module/IControllable'], function(dejavu, IControllable) {
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
        },

        /**
         * @memberof Snautsynth.Event.ControlConnection
         * @instance
         *
         * @param {Array.<Snautsynth.Audio.Module.Module>} moduleList
         * @param {Array.<Snautsynth.Control.Control>}     controlList
         */
        setupControl: function(moduleList, controlList) {
            var connectionModule,
                connectionControl;

            var controlConnection = this;

            moduleList.some(function(module) {
                if (module.getId() === controlConnection.getModuleId()) {
                    connectionModule = module;
                    return true;
                }
            });

            controlList.some(function(control) {
               if (control.getId() === controlConnection.getControlId()) {
                   connectionControl = control;
                   return true;
               }
            });

            var controlTargetId = this.getControlTarget();

            if (dejavu.instanceOf(connectionModule, IControllable)) {
                var valueOptions = connectionModule.getValueOptionsByCtrlTarget(controlTargetId);
                var value        = connectionModule.getValueByCtrlTarget(controlTargetId);

                if (null === valueOptions) {
                    return;
                }

                if (null !== value) {
                    connectionControl.setValue(value);
                }

                if (null !== valueOptions) {
                    connectionControl.setValueOptions(valueOptions);
                }
            }

            connectionControl.setUp();
        }
    });
});