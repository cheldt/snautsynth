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
             * @type {Snautsynth.Audio.Module.Mixing.Gain.ControlTargetOptions}
             */
            __controlTargetOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @type {Snautsynth.Audio.Module.EnvelopeValues}
             */
            __envelopeValues: null,

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
                CTRL_TARGET_VALUE_GAIN:     1,

                /**
                 * @memberof Snautsynth.Audio.Mixing.Gain
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_START_ENVELOPE: 2,

                /**
                 * @memberof Snautsynth.Audio.Mixing.Gain
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_STOP_ENVELOPE:  3,

                /**
                 * @memberof Snautsynth.Audio.Mixing.Gain
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_ATTACK_GAIN: 4,

                /**
                 * @memberof Snautsynth.Audio.Mixing.Gain
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_ATTACK_TIME: 5,

                /**
                 * @memberof Snautsynth.Audio.Mixing.Gain
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_DECAY_GAIN: 6,

                /**
                 * @memberof Snautsynth.Audio.Mixing.Gain
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_DECAY_TIME: 7,

                /**
                 * @memberof Snautsynth.Audio.Mixing.Gain
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_SUSTAIN_TIME: 8,

                /**
                 * @memberof Snautsynth.Audio.Mixing.Gain
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_RELEASE_TIME: 9
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
             * @param {Snautsynth.Audio.Module.EnvelopeValues}                   envelopeValues
             * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>}         moduleConnectionList
             * @param {Snautsynth.Audio.Module.Mixing.Gain.ControlTargetOptions} controlTargetOptions
             */
            initialize: function(id, audioContext, gain, envelopeValues, moduleConnectionList, controlTargetOptions) {
                this.$super(id, audioContext, moduleConnectionList, controlTargetOptions);
                this.__gainNode = audioContext.createGain();
                this.__gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
                this.__gainNode.gain.value = gain;

                this.__envelopeValues = envelopeValues;
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
                            case Gain.CTRL_TARGET_START_ENVELOPE:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.startEnvelope(time);
                                    }
                                );
                                break;
                            case Gain.CTRL_TARGET_STOP_ENVELOPE:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.stopEnvelope(time);
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
                switch (ctrlTargetId) {
                    case Gain.CTRL_TARGET_VALUE_GAIN:
                        return this.__gainNode.gain.value;
                    case Gain.CTRL_TARGET_ENV_ATTACK_GAIN:
                        return this.__envelopeValues.getAttackGain();
                    case Gain.CTRL_TARGET_ENV_ATTACK_TIME:
                        return this.__envelopeValues.getAttackTime();
                    case Gain.CTRL_TARGET_ENV_DECAY_GAIN:
                        return this.__envelopeValues.getDecayGain();
                    case Gain.CTRL_TARGET_ENV_DECAY_TIME:
                        return this.__envelopeValues.getDecayTime();
                    case Gain.CTRL_TARGET_ENV_SUSTAIN_TIME:
                        return this.__envelopeValues.getSustainTime();
                    case Gain.CTRL_TARGET_ENV_RELEASE_TIME:
                        return this.__envelopeValues.getReleaseTime();
                }
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
                if (null === this._controlTargetOptions) {
                    return null;
                }

                return this._controlTargetOptions.getOptionsById(ctrlTargetId);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @param {number} currentTime
             */
            startEnvelope: function(currentTime) {
                var gainNode = this.__gainNode;

                // ADSR - envelope
                // reset all schedulers
                gainNode.gain.cancelScheduledValues(0.0);
                gainNode.gain.setValueAtTime(0, currentTime);

                // Ramp to attack-values
                gainNode.gain.linearRampToValueAtTime(
                    this.__envelopeValues.getAttackGain(),
                    currentTime + this.__envelopeValues.getAttackTime()
                );

                // Ramp to decay time and gain
                gainNode.gain.linearRampToValueAtTime(
                    this.__envelopeValues.getDecayGain(),
                    currentTime + this.__envelopeValues.getDecayTime()
                );

                // Hold sustain
                gainNode.gain.linearRampToValueAtTime(
                    this.__envelopeValues.getDecayGain(),
                    currentTime + this.__envelopeValues.getSustainTime()
                );

                // Ramp to 0 in release-time
                gainNode.gain.linearRampToValueAtTime(
                    0,
                    currentTime + this.__envelopeValues.getReleaseTime()
                );
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             *
             * @param {number} currentTime
             */
            stopEnvelope: function(currentTime) {
                var gainNode = this.__gainNode;

                gainNode.gain.cancelScheduledValues(0.0);
                gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);

                // ramp to release
                gainNode.gain.linearRampToValueAtTime(
                    0,
                    currentTime + this.__envelopeValues.getReleaseTime()
                );
            }
        });

        return Gain;
    }
);