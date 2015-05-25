/**
 * @namespace Snautsynth.Audio.Module.Generator
 */
define(
    [
        'dejavu',
        'app/audio/module/Module',
        'app/audio/module/IConnecting',
        'app/audio/module/IControllable',
        'app/audio/util/Audio',
        'app/datatype/DiscreteValue',
        'app/datatype/NumberRange',
        'app/datatype/RangeValueOptions',
        'app/control/ui/SnapOptions',
        'app/control/ui/discretecontrol/KeyValue',
        'app/datatype/DiscreteValueOptions',
        'app/util/formatter/NumberFormatter'
    ],
    function(
        dejavu,
        Module,
        IConnecting,
        IControllable,
        AudioUtil,
        DiscreteValue,
        NumberRange,
        RangeValueOptions,
        SnapOptions,
        KeyValue,
        DiscreteValueOptions,
        NumberFormatter
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
             * @type {number}
             */
            _cents: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {GainNode}
             */
            _gainNode: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @protected
             *
             * @type {number}
             */
            _halftones: null,

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
            _octaves: null,

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
             * @implements Snautsynth.Audio.Module.IControllable
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

                this._octaves   = 0;
                this._halftones = 0;

                if (tuning / Wave.CENTS_OCTAVE >= 1) {
                    this._octaves = parseInt(tuning / Wave.CENTS_OCTAVE);
                    tuning = tuning - this._octaves * Wave.CENTS_OCTAVE;
                }

                if (tuning / Wave.CENTS_HALFTONE >= 1) {
                    this._halftones = parseInt(tuning / Wave.CENTS_HALFTONE);
                    tuning = tuning - this._halftones * Wave.CENTS_HALFTONE;
                }

                this._cents = tuning;

                this._waveType = waveType;

                this._gainNode = audioContext.createGain();
                this._gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} cents
             * @param {number} time
             */
            changeCents: function(cents, time) {
                this._cents = cents;
                cents       = cents + this._halftones * Wave.CENTS_HALFTONE + this._octaves * Wave.CENTS_OCTAVE;

                this.changeTune(cents, time);
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
            changeHalftones: function(halftones, time) {
                this._halftones = halftones;
                var cents       = this._cents + halftones * Wave.CENTS_HALFTONE + this._octaves * Wave.CENTS_OCTAVE;

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
            changeOctaves: function(octaves, time) {
                this._octaves = octaves;
                var cents     = this._cents + this._halftones * Wave.CENTS_HALFTONE + octaves * Wave.CENTS_OCTAVE;

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
                    oscillator.detune.setValueAtTime(cents, time);
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {string} waveType
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
                                this.bindCallback(module,'changeCents')
                            );
                            break;
                        case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                            controlConnection.setCallback(
                                this.bindCallback(module,'changeHalftones')
                            );
                            break;
                        case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                            controlConnection.setCallback(
                                this.bindCallback(module,'changeOctaves')
                            );
                            break;
                        case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                            controlConnection.setCallback(
                                this.bindCallback(module,'changeWaveType')
                            );
                            break;
                        case Wave.CTRL_TARGET_TRIGGER_NOTE:
                            controlConnection.setCallback(
                                this.bindCallback(module,'triggerNote')
                            );
                            break;
                        case Wave.CTRL_TARGET_VALUE_GAIN:
                            controlConnection.setCallback(
                                this.bindCallback(module,'changeGain')
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
                }

                var runningOscillatorCounter = Object.keys(this._runningOscillatorList);

                if (Wave.MAX_RUNNING_OSCILLATORS === runningOscillatorCounter) {
                    return;
                }

                if (typeof this._runningOscillatorList[note] !== 'undefined') {
                    return;
                }

                var frequency = AudioUtil.calcFreqByKey(note);

                var oscillator             = this._audioContext.createOscillator();
                oscillator.type            = this._waveType;
                oscillator.detune.value    = this._octaves * Wave.CENTS_OCTAVE + this._halftones * Wave.CENTS_HALFTONE;
                oscillator.frequency.value = frequency;

                oscillator.connect(this._gainNode);

                this._runningOscillatorList[note] = oscillator;

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

                delete this._runningOscillatorList[note];
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
            getDefaultValueByCtrlTarget: function(ctrlTargetId) {
                switch(ctrlTargetId) {
                    case Wave.CTRL_TARGET_VALUE_GAIN:
                        return 1;
                    case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                        return Wave.WAVEFORM_SINE;
                    case Wave.CTRL_TARGET_VALUE_TUNE_CENTS:
                        return this._cents;
                    case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                        return this._halftones;
                    case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                        return this._octaves;
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
                    case Wave.CTRL_TARGET_VALUE_TUNE_CENTS:
                        return new RangeValueOptions(
                            new NumberRange(Wave.CENTS_HALFTONE * -1, Wave.CENTS_HALFTONE),
                            new SnapOptions(0, 0, 0),
                            1,
                            new NumberFormatter('#0')
                        );
                    case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                        return new RangeValueOptions(
                            new NumberRange(-12, 12),
                            new SnapOptions(0, 0.5, 1),
                            1,
                            new NumberFormatter('#0')
                        );
                    case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                        return new RangeValueOptions(
                            new NumberRange(-4, 4),
                            new SnapOptions(0, 0.5, 1),
                            1,
                            new NumberFormatter('#0')
                        );
                    default:
                        return null;
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} note
             */
            noteOff: function(note) {
                this.destroyOscillator(note);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} note
             */
            noteOn: function(note) {
                this.createOscillator(note);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {Snautsynth.Control.UI.DiscreteControl.KeyValue} value
             */
            triggerNote: function(value) {
                var keyState = value.getKeyState();
                var note     = value.getNote();

                if (KeyValue.KEY_STATE_DOWN === keyState) {
                    this.noteOn(note);
                } else {
                    this.noteOff(note);
                }
            }

        });

        return Wave;
    }
);