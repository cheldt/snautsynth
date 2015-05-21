/**
 * @namespace Snautsynth.Audio.Module.Filter
 */
require(
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

        var Biquad = dejavu.Class.declare({

            $name: 'Gain',

            $extends: Module,

            $implements: [IConnectable, IConnecting, IConrollable],



            _filterNode: null,

            $constants: {
                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                FILTER_LOWPASS:      'lowpass',

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                FILTER_BANDPASS:     'bandpass',

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                FILTER_HIGHPASS:     'highpass',

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                FILTER_OFF:          'off',

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                FILTER_DEFAULT_FREQ: 22050,

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                FILTER_DEFAULT_RES:  0.0001,

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_FREQUENCY: 1,

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_RESONANCE: 2,

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_TYPE:      3
            },

            /**
             * @constructor
             * @class      Snautsynth.Audio.Module.Filter.Biquad
             * @extends    Snautsynth.Audio.Module.Module
             * @implements Snautsynth.Audio.Module.IConnectable
             * @implements Snautsynth.Audio.Module.IConnecting
             * @implements Snautsynth.Audio.Module.IControllable
             *
             * @param {number}                                           id
             * @param {AudioContext}                                     audioContext
             * @param {string}                                           type
             * @param {number}                                           frequency
             * @param {number}                                           resonance
             * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>} moduleConnectionList
             */
            initialize: function(id, audioContext, type, frequency, resonance, moduleConnectionList) {
                this.$super(id, audioContext, moduleConnectionList);

                this._filterNode                  = audioContext.createBiquadFilter();
                this._filterNode.type             = type;
                this._filterNode.frequency.value  = frequency;
                this._filterNode.Q.value          = resonance;
            },


            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @param {string} value
             * @param {number} time
             */
            changeFrequency: function(value, time) {
                this._filterNode.frequency.setValueAtTime(value, time);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @param {string} value
             * @param {number} time
             */
            changeResonance: function(value, time) {
                this._filterNode.Q.setValueAtTime(value, time);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @param {string} value
             */
            changeType: function(value) {
                this._filterNode.type = value;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
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
                        case Biquad.CTRL_TARGET_FREQUENCY:
                            controlConnection.setCallback(
                                function(value, time) {
                                    module.changeFrequency(value, time);
                                }
                            );
                            break;
                        case Biquad.CTRL_TARGET_RESONANCE:
                            controlConnection.setCallback(
                                function(value, time) {
                                    module.changeResonance(value, time);
                                }
                            );
                            break;
                        case Biquad.CTRL_TARGET_TYPE:
                            controlConnection.setCallback(
                                function(value, time) {
                                    module.changeType(value);
                                }
                            );
                            break;
                    }
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @return {BiquadFilterNode}
             */
            getTargetNode: function() {
                return this._filterNode;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @return {BiquadFilterNode}
             */
            getSourceNode: function() {
                return this._filterNode;
            }
        });

        return Biquad;
    }
);