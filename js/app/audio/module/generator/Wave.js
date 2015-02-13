/**
 * @namespace Snautsynth.Audio.Module.Generator
 */
define(
    [
        'dejavu',
        'app/audio/module/Module',
        'app/audio/module/IConnecting',
        'app/audio/module/IControllable',
        'app/util/GlobalConstants'
    ],
    function(
        dejavu,
        Module,
        IConnecting,
        IControllable,
        GlobalConstants
    ) {
        'use strict';

        var Wave = dejavu.Class.declare({
            $name: 'Wave',

            $extends: Module,

            $implements: [IConnecting, IControllable],

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {Object}
             */
            _keyCodeNoteMapping:    null,

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
             * @implements Snautsynth.Audio.Module.IConnecting
             * @implements Snautsynth.Audio.Module.IControlable
             *
             * @param {number}                                            id
             * @param {AudioContext}                                      audioContext
             * @param {number}                                            tuning
             * @param {string}                                            waveType
             * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>}  moduleConnectionList
             */
            initialize: function(id, audioContext, tuning, waveType, moduleConnectionList) {
                this.$super(id, audioContext, moduleConnectionList);
                this._tuning   = tuning;
                this._waveType = waveType;

                this._keyCodeNoteMapping = {};

                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_A] = GlobalConstants.NOTE_C_5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_W] = GlobalConstants.NOTE_Cis5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_S] = GlobalConstants.NOTE_D_5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_E] = GlobalConstants.NOTE_Dis5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_D] = GlobalConstants.NOTE_E_5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_F] = GlobalConstants.NOTE_F_5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_T] = GlobalConstants.NOTE_Fis5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_G] = GlobalConstants.NOTE_G_5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_Z] = GlobalConstants.NOTE_Gis5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_H] = GlobalConstants.NOTE_A_5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_U] = GlobalConstants.NOTE_Ais5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_J] = GlobalConstants.NOTE_B_5;
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_K] = GlobalConstants.NOTE_C_6;
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

                if (null === this._runningOscillatorList) {
                    return;
                }

                for (var noteKey in this._runningOscillatorList) {
                    if (undefined === this._runningOscillatorList[noteKey]) {
                        return;
                    }

                    var oscillator = this._runningOscillatorList[noteKey];
                    oscillator.detune.setValueAtTime(this._tuning, time);
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
             * @param {number} note
             */
            createOscillator: function(note) {
                var frequency = AudioContext.calcFreqByKey(note);

                var oscillator             = this._audioContext.createOscillator();
                oscillator.type            = this._waveType;
                oscillator.detune.value    = this._tuning;
                oscillator.frequency.value = frequency;

                this._moduleConnectionList.forEach(function(moduleConnection) {
                    var nodeConnectionList = moduleConnection.getNodeConnectionList();

                    nodeConnectionList.forEach(function(nodeConnection) {
                        if (nodeConnection.getIsConnected()) {
                            return;
                        }

                        nodeConnection.setId(note);
                        nodeConnection.setSourceNode(oscillator);
                        nodeConnection.connectNodes();
                    });
                });

                oscillator.start(0);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param note
             */
            destroyOscillator: function(note) {
                this._moduleConnectionList.forEach(function(moduleConnection) {
                    var nodeConnection = moduleConnection.getNodeConnectionById(note);

                    if (nodeConnection.getIsConnected()) {
                        nodeConnection.disconnect();
                        nodeConnection.getSourceNode().stop(0);
                        nodeConnection.setSourceNode(undefined);
                    }
                });
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} keyCode
             */
            noteOff: function(keyCode) {
                var note = this.retrieveNoteByKeyCode(keyCode);

                if (null === note) {
                    return;
                }

                this.destroyOscillator(note);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} keyCode
             */
            noteOn: function(keyCode) {
                var note = this.retrieveNoteByKeyCode(keyCode);

                if (null === note) {
                    return;
                }

                this.createOscillator(note);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number|null} keyCode
             */
            retrieveNoteByKeyCode: function(keyCode) {
                if (this._keyCodeNoteMapping.hasOwnProperty(keyCode)) {
                    return this._keyCodeNoteMapping[keyCode];
                }

                return null;
            }
        });

        return Wave;
    }
);