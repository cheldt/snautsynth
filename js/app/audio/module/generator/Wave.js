/**
 * @namespace Snautsynth.Audio.Module.Generator
 */
define(
    [
        'dejavu',
        'app/audio/module/Module',
        'app/audio/module/IConnecting',
        'app/audio/module/IControllable',
        'app/util/GlobalConstants',
        'app/audio/util/Audio',
        'app/datatype/DiscreteValue',
        'app/datatype/NumberRange',
        'app/datatype/ValueOptions',
        'app/control/ui/SnapOptions',
        'app/control/ui/discretecontrol/KeyValue',
        'app/datatype/DiscreteValueOptions'
    ],
    function(
        dejavu,
        Module,
        IConnecting,
        IControllable,
        GlobalConstants,
        AudioUtil,
        DiscreteValue,
        NumberRange,
        ValueOption,
        SnapOptions,
        KeyValue,
        DiscreteValueOptions
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
             * @type {AudioGainNode}
             */
            _gainNode: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {Object}
             */
            _keyCodeNoteMapping: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {Object}
             */
            _runningOscillatorList: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {number}
             */
            _runningOscillatorCounter: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {number}
             */
            _tuning: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {string}
             */
            _waveType: null,

            $constants: {
                MAX_RUNNING_OSCILLATORS: 4,

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
                CTRL_TARGET_VALUE_WAVETYPE:       1,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_VALUE_TUNE_CENTS:     2,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_VALUE_TUNE_HALFTONES: 3,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_VALUE_TUNE_OCTAVES:   4,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_NOTE_ON:              5,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_NOTE_OFF:             6,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_VALUE_GAIN:           7,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_TRIGGER_NOTE:           8
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
             * @param {number}                                            gain
             * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>}  moduleConnectionList
             */
            initialize: function(id, audioContext, tuning, waveType, gain, moduleConnectionList) {
                this.$super(id, audioContext, moduleConnectionList);
                this._tuning   = tuning;
                this._waveType = waveType;

                this._gainNode = audioContext.createGain();
                this._gainNode.gain.setValueAtTime(gain, audioContext.currentTime);

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
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} value
             * @param {number} time
             */
            changeGain: function(value, time) {
                this._gainNode.gain.setValueAtTime(value, time);
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
                    if (!this._runningOscillatorList.hasOwnProperty(noteKey)) {
                        continue;
                    }

                    if (undefined === this._runningOscillatorList[noteKey]) {
                        continue;
                    }

                    var oscillator = this._runningOscillatorList[noteKey];
                    oscillator.detune.setValueAtTime(this._tuning, time);
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {string} wavetype
             */
            changeWaveType: function (waveType) {
                this._waveType = waveType;

                if (null === this._runningOscillatorList) {
                    return;
                }

                for (var noteKey in this._runningOscillatorList) {
                    if (!this._runningOscillatorList.hasOwnProperty(noteKey)) {
                        continue;
                    }

                    if (null === this._runningOscillatorList[noteKey]) {
                        continue;
                    }

                    var oscillator  = this._runningOscillatorList[noteKey];
                    oscillator.type = this._waveType;
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {Object} controlConnectionList
             */
            connectToControls: function(controlConnectionList) {
                var module = this;

                var keys   = Object.keys(controlConnectionList);
                var length = keys.length;

                for (var i = 0; i < length; i++) {
                    var controlConnection = controlConnectionList[keys[i]];

                    if (this.getId() !== controlConnection.getModuleId()) {
                        continue;
                    }

                    switch(controlConnection.getControlTarget()) {
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
                                    module.changeWaveType(value);
                                }
                            );
                            break;
                        case Wave.CTRL_TARGET_TRIGGER_NOTE:
                            controlConnection.setCallback(
                                function(value, time) {
                                    var keyState = value.getKeyState();
                                    var keyCode  = value.getKeyCode();

                                    if (KeyValue.KEY_STATE_DOWN === keyState) {
                                        module.noteOn(keyCode);
                                    } else {
                                        module.noteOff(keyCode);
                                    }
                                }
                            );
                            break;
                        case Wave.CTRL_TARGET_NOTE_ON:
                            controlConnection.setCallback(
                                function(value, time) {
                                    module.noteOn(value);
                                }
                            );
                            break;
                        case Wave.CTRL_TARGET_NOTE_OFF:
                            controlConnection.setCallback(
                                function(value, time) {
                                    module.noteOff(value);
                                }
                            );
                            break;
                        case Wave.CTRL_TARGET_VALUE_GAIN:
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
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} note
             */
            createOscillator: function(note) {
                if (null === this._runningOscillatorList) {
                    this._runningOscillatorList    = {};
                    this._runningOscillatorCounter = 0;
                }

                if (Wave.MAX_RUNNING_OSCILLATORS === this._runningOscillatorCounter) {
                    return;
                }

                var frequency = AudioUtil.calcFreqByKey(note);

                var oscillator             = this._audioContext.createOscillator();
                oscillator.type            = this._waveType;
                oscillator.detune.value    = this._tuning;
                oscillator.frequency.value = frequency;

                oscillator.connect(this._gainNode);

                this._runningOscillatorList[note] = oscillator;
                this._runningOscillatorCounter ++;

                oscillator.start(0);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param note
             */
            destroyOscillator: function(note) {
                if (null === this._runningOscillatorList) {
                    return;
                }

                var oscillator = this._runningOscillatorList[note];

                oscillator.disconnect();
                oscillator.stop();

                this._runningOscillatorList[note] = null;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @return {AudioNode}
             */
            getSourceNode: function() {
                return this._gainNode;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} ctrlTargetId
             *
             * @return {null|*}
             */
            getDefaultValueByCtrlTarget: function(ctrTargetId) {
                switch(ctrTargetId) {
                    case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                        return Wave.WAVEFORM_SINE;
                    break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_CENTS:
                        return 0;
                        break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                        return 0;
                        break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                        return 0;
                        break;
                    default:
                        return null;
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} ctrlTargetId
             *
             * @return {null|Snautsynth.DataType.ValueOptions|Snautsynth.DataType.DiscreteValueOptions}
             */
            getValueOptionsByCtrlTarget: function(ctrlTargetId) {
                switch(ctrlTargetId) {
                    case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                        var discreteValueList = [];

                        discreteValueList.push(new DiscreteValue('Saw', Wave.WAVEFORM_SAWTOOTH));
                        discreteValueList.push(new DiscreteValue('Sine', Wave.WAVEFORM_SINE));
                        discreteValueList.push(new DiscreteValue('Square', Wave.WAVEFORM_SQUARE));
                        discreteValueList.push(new DiscreteValue('Triangle', Wave.WAVEFORM_TRIANGLE));

                        return new DiscreteValueOptions(discreteValueList, null, null);
                        break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_CENTS:
                        return new ValueOption(
                            new SnapOptions(0, 0, 0),
                            new NumberRange(-12, 12)
                        );
                        break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                        return new ValueOption(
                            new SnapOptions(0, 0, 0),
                            new NumberRange(-12, 12)
                        );
                        break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                        return new ValueOption(
                            new SnapOptions(0, 0, 0),
                            new NumberRange(-4, 4)
                        );
                        break;
                    case Wave.CTRL_TARGET_NOTE_ON:
                        break;
                    default:
                        return null;
                }
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