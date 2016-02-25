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
             * @private
             *
             * @type {Snautsynth.Audio.Module.Mixing.Gain.ControlTargetOptions}
             */
            __controlTargetOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             * @private
             *
             * @type {Snautsynth.Audio.Module.EnvelopeValues}
             */
            __envelopeValues: null,

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             * @private
             *
             * @type {AudioGainNode}
             */
            __gainNode: null,

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             * @private
             *
             * @type {number}
             */
            __startEnvelopeTime: null,

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

                this.__startEnvelopeTime = currentTime;

                // ADSR - envelope
                // reset all schedulers
                gainNode.gain.value = 0;
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
                var gainNode = this.__gainNode,
                    currentGain;

                currentGain = this.__calcReleaseGain(currentTime);

                gainNode.gain.cancelScheduledValues(0);
                gainNode.gain.setValueAtTime(currentGain, currentTime);

                // ramp to release
                gainNode.gain.linearRampToValueAtTime(
                    0,
                    currentTime + (this.__envelopeValues.getReleaseTime() - this.__envelopeValues.getSustainTime())
                );
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             * @private
             *
             * @param  {number} currentTime
             *
             * @return {{x0: number, y0: number, x1: number, y1: number}}
             */
            __fetchEnvelopePointsByTime: function(currentTime) {
                var attackEnduranceTime = this.__startEnvelopeTime + this.__envelopeValues.getAttackTime(),
                    decayEnduranceTime = this.__startEnvelopeTime + this.__envelopeValues.getDecayTime(),
                    sustainEnduranceTime = this.__startEnvelopeTime + this.__envelopeValues.getSustainTime(),
                    releaseEnduranceTime = this.__startEnvelopeTime + this.__envelopeValues.getReleaseTime();

                if (currentTime >= this.__startEnvelopeTime && currentTime <= attackEnduranceTime) {
                    return {
                        x0: 0,
                        y0: 0,
                        x1: this.__envelopeValues.getAttackTime(),
                        y1: this.__envelopeValues.getAttackGain()
                    };
                } else if (currentTime > attackEnduranceTime && currentTime <= decayEnduranceTime) {
                    return {
                        x0: this.__envelopeValues.getAttackTime(),
                        y0: this.__envelopeValues.getAttackGain(),
                        x1: this.__envelopeValues.getDecayTime(),
                        y1: this.__envelopeValues.getDecayGain()
                    };
                } else if (currentTime > decayEnduranceTime && currentTime <= sustainEnduranceTime) {
                    return {
                        x0: this.__envelopeValues.getDecayTime(),
                        y0: this.__envelopeValues.getDecayGain(),
                        x1: this.__envelopeValues.getSustainTime(),
                        y1: this.__envelopeValues.getDecayGain()
                    };
                } else if (currentTime > sustainEnduranceTime && currentTime <= releaseEnduranceTime) {
                    return {
                        x0: this.__envelopeValues.getSustainTime(),
                        y0: this.__envelopeValues.getDecayGain(),
                        x1: this.__envelopeValues.getReleaseTime(),
                        y1: 0
                    };
                }

                return {
                    x0: 0,
                    y0: 0,
                    x1: 0,
                    y1: 0
                };
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain
             * @instance
             * @private
             *
             * @param  {number} currentTime
             *
             * @return {number}
             */
            __calcReleaseGain: function(currentTime) {
                var currentStartEndPoints = this.__fetchEnvelopePointsByTime(currentTime),
                    slope,
                    yIntercept,
                    deltaY,
                    deltaX ,
                    elapsedTime = currentTime - this.__startEnvelopeTime;

                deltaY = currentStartEndPoints.y1 - currentStartEndPoints.y0;
                deltaX = currentStartEndPoints.x1 - currentStartEndPoints.x0;

                if (0 === deltaY) {
                    return currentStartEndPoints.y0;
                } else if (0 === deltaX) {
                    return 0;
                }

                slope = deltaY / deltaX;

                // y = mx + t
                // t = y - mx
                if (currentStartEndPoints.x0 === 0) {
                    yIntercept = currentStartEndPoints.y0;
                } else {
                    yIntercept = currentStartEndPoints.y0 - (slope * currentStartEndPoints.x0)
                }

                return slope * elapsedTime + yIntercept;
            }
        });

        return Gain;
    }
);