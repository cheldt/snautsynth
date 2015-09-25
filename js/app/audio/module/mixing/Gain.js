/**
 * @namespace Snautsynth.Audio.Module.Mixing
 */
define(
    [
        'dejavu',
        'app/audio/module/Module',
        'app/audio/module/IConnectable',
        'app/audio/module/IConnecting',
        'app/audio/module/IControllable',
        'app/control/ui/SnapOptions',
        'app/datatype/NumberRange',
        'app/datatype/RangeValueOptions',
        'app/util/formatter/NumberFormatter'
    ],
    function(
        dejavu,
        Module,
        IConnectable,
        IConnecting,
        IConrollable,
        SnapOptions,
        NumberRange,
        RangeValueOptions,
        NumberFormatter
    ) {
        'use strict';

        var Gain = dejavu.Class.declare({
            $name: 'Gain',

            $extends: Module,

            $implements: [IConnectable, IConnecting, IConrollable],

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @type {Snautsynth.Audio.Module.Mixing.Gain.ControlTargetOptions}
             */
            _controlTargetOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @type {AudioGainNode}
             */
            __gainNode: null,

            $constants: {
                /**
                 * @memberof Snautsynth.Audio.Mixing.Gain
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_VALUE_GAIN: 1
            },

            /**
             * @constructor
             * @class      Snautsynth.Audio.Module.Mixing.Gain
             * @extends    Snautsynth.Audio.Module.Module
             * @implements Snautsynth.Audio.Module.IConnectable
             * @implements Snautsynth.Audio.Module.IConnecting
             * @implements Snautsynth.Audio.Module.IControllable
             *
             * @param {number}                                                   id
             * @param {AudioContext}                                             audioContext
             * @param {number}                                                   gain
             * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>}         moduleConnectionList
             * @param {Snautsynth.Audio.Module.Mixing.Gain.ControlTargetOptions} controlTargetOptions
             */
            initialize: function(id, audioContext, gain, moduleConnectionList, controlTargetOptions) {
                this.$super(id, audioContext, moduleConnectionList, controlTargetOptions);
                this.__gainNode = audioContext.createGain();
                this.__gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
                this.__gainNode.gain.value = gain;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @param {Array.<Snautsynth.Event.ControlConnection>} controlConnectionList
             */
            connectToControls: function(controlConnectionList) {
                var module = this;
                for (var controlId in controlConnectionList) {
                    if (!controlConnectionList.hasOwnProperty(controlId)) {
                        continue;
                    }

                    var groupedControlConnections =  controlConnectionList[controlId];

                    groupedControlConnections.forEach(function(controlConnection) {
                        if (module.getId() !== controlConnection.getModuleId()) {
                            return;
                        }

                        switch(controlConnection.getControlTarget()) {
                            case Gain.CTRL_TARGET_VALUE_GAIN:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.changeGain(value, time);
                                    }
                                );
                                break;
                        }
                    });
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @param {Object} value
             * @param {number} time
             */
            changeGain: function (value, time) {
                this.__gainNode.gain.setValueAtTime(value, time);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @return {AudioGainNode}
             */
            getTargetNode: function() {
                return this.__gainNode;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @return {AudioGainNode}
             */
            getSourceNode: function() {
                return this.__gainNode;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @param {number} ctrlTargetId
             *
             * @return {number}
             */
            getValueByCtrlTarget: function(ctrlTargetId) {
                return this.__gainNode.gain.value;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @param {number} ctrlTargetId
             *
             * @return {null|Snautsynth.DataType.ValueOptions}
             */
            getValueOptionsByCtrlTarget: function(ctrlTargetId) {
                return this._controlTargetOptions.getOptionsById(ctrlTargetId);
            }
        });

        return Gain;
    }
);