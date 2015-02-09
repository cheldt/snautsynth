/**
 * @namespace Snautsynth.Audio.Module.Generator
 */
define(
    [
        'dejavu',
        'app/audio/module/Module',
        'app/audio/module/IConnectable',
        'app/audio/module/IControlable'
    ],
    function(
        dejavu,
        Module,
        IConnectable,
        IConrolable
    ) {
        'use strict';

        var Wave = dejavu.Class.declare({
            $name: 'Wave',

            $extends: Module,

            $implements: [IConnectable, IConrolable],

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {number}
             */
            _tuning:      null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {number}
             */
            _frequency: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {Oscillator}
             */
            _oscillator: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {string}
             */
            _waveType:   null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} tuning
             */
            setTuning: function(tuning) {
                this._tuning = tuning;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} frequency
             */
            setFrequency: function(frequency) {
              this._frequency = frequency;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {string} type
             */
            setWaveType: function(type) {
                this._waveType = type;
            },

            $constants: {
                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CENTS_HALFTONE:  100,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CENTS_OCTAVE:   1200,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                WAVEFORM_SINE :    'sine',

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                WAVEFORM_SQUARE:   'square',

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                WAVEFORM_SAWTOOTH: 'sawtooth',

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                WAVEFORM_TRIANGLE: 'triangle',

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                WAVEFORM_CUSTOM:   'custom',


                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_VALUE_FREQUENCY:      1,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_VALUE_WAVETYPE:       2,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_VALUE_TUNE_CENTS:     3,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_VALUE_TUNE_HALFTONES: 4,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_VALUE_TUNE_OCTAVES:   5,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_NOTE_ON:              6,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_NOTE_OFF:             7
            },

            /**
             * @constructor
             * @class      Snautsynth.Audio.Module.Generator.Wave
             * @extends    Snautsynth.Audio.Module.Module
             * @implements Snautsynth.Audio.Module.IConnectable
             * @implements Snautsynth.Audio.Module.IControlable
             *
             * @param {number}       id
             * @param {AudioContext} audioContext
             * @param {number}       tuning
             * @param {number}       frequency
             * @param {string}       waveType
             */
            initialize: function(id, audioContext, tuning, frequency, waveType) {
                this.$super(id, audioContext);
                this._tuning    = tuning;
                this._frequency = frequency;
                this._waveType  = waveType;
            },

            /**
             * Changes tunes in halftone-steps
             *
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} halftones
             * @param {number} time
             */
            changeHalftone: function(halftones, time) {
                var cents = halftones * Wave.CENTS_HALFTONE;

                this.changeTune(cents, time);
            },

            /**
             * Changes tune in octave-steps
             *
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} octaves
             * @param {number} time
             */
            changeOctave: function(octaves, time) {
                var cents = octaves * Wave.CENTS_OCTAVE;

                this.changeTune(cents, time);
            },

            /**
             * Changes tune in cent-steps
             *
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} cents
             * @param {number} time
             */
            changeTune: function(cents, time) {
                this._tuning = this._tuning + cents;

                if (null !== this._oscillator) {
                    this._oscillator.detune.setValueAtTime(this._tuning, time);
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {Array.<Snautsynth.Event.ControlConnection>} controlConnectionList
             */
            connectToControls: function(controlConnectionList) {
                var module = this;

                controlConnectionList.forEach(
                    function(controlConnection) {
                        switch(controlConnection.getControlTarget()) {
                            case Wave.CTRL_TARGET_VALUE_FREQUENCY:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.setFrequency(value);
                                    }
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_TUNE_CENTS:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.changeTune(value, time);
                                    }
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.changeHalftone(value, time);
                                    }
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.changeOctave(value, time);
                                    }
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.setWaveType(value);
                                    }
                                );
                                break;
                            case Wave.CTRL_TARGET_NOTE_ON:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.noteOn(time);
                                    }
                                );
                                break;
                            case Wave.CTRL_TARGET_NOTE_OFF:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.noteOff(time);
                                    }
                                );
                                break;
                        }
                    }
                );
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {Array.<AudioNode>} nodeList
             */
            connectToNodes: function(nodeList) {
                var oscillator = this._oscillator;
                nodeList.forEach(
                    function(node) {
                        oscillator.connect(node);
                    }
                );
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             */
            noteOff: function(value, time) {

            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             */
            noteOn: function(value, time) {

                //this._oscillator

            }
        });

        return Wave;
    }
);