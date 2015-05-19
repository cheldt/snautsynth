/**
 * @namespace Snautsynth.Audio.Module.Mixing
 */
define(
    [
        'dejavu',
        'app/audio/module/Module',
        'app/audio/module/IConnectable',
        'app/audio/module/IConnecting',
        'app/audio/module/IControllable'
    ],
    function(
        dejavu,
        Module,
        IConnectable,
        IConnecting,
        IConrollable
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
             * @type {AudioGainNode}
             */
            _gainNode: null,

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
             * @param {number}                                           id
             * @param {AudioContext}                                     audioContext
             * @param {number}                                           gain
             * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>} moduleConnectionList
             */
            initialize: function(id, audioContext, gain, moduleConnectionList) {
                this.$super(id, audioContext, moduleConnectionList);

                this._gainNode = audioContext.createGain();
                this._gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
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

                    var controlConnection = controlConnectionList[controlId];

                    if (module.getId() !== controlConnection.getModuleId()) {
                        continue;
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
                this._gainNode.setValueAtTime(value, time);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @return {AudioGainNode}
             */
            getTargetNode: function() {
                return this._gainNode;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @return {AudioGainNode}
             */
            getSourceNode: function() {
                return this._gainNode;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @param {number} ctrlTargetId
             *
             * @return {number}
             */
            getDefaultValueByCtrlTarget: function(ctrlTargetId) {
              return 1;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @param {number} ctrlTargetId
             *
             * @return {null|Snautsynth.DataType.ValueOption}
             */
            getValueOptionsByCtrlTarget: function(ctrlTargetId) {
                switch(ctrlTargetId) {
                    case Wave.CTRL_TARGET_VALUE_GAIN:
                        return new ValueOption(
                            new SnapOptions(1, 0, 0),
                            new NumberRange(0, 1)
                        );
                        break;
                    default:
                        return null;
                }
            }
        });

        return Gain;
    }
);