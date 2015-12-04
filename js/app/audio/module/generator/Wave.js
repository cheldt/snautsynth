/**
 * @namespace Snautsynth.Audio.Module.Generator
 */
define(
    [
        'dejavu',
        'app/audio/module/Module',
        'app/audio/module/mixing/Gain',
        'app/audio/module/IConnecting',
        'app/audio/module/IControllable',
        'app/audio/util/Audio',
        'app/datatype/DiscreteValue',
        'app/datatype/NumberRange',
        'app/datatype/RangeValueOptions',
        'app/control/ui/SnapOptions',
        'app/control/ui/discretecontrol/KeyValue'
    ],
    function(
        dejavu,
        Module,
        Gain,
        IConnecting,
        IControllable,
        AudioUtil,
        DiscreteValue,
        NumberRange,
        RangeValueOptions,
        SnapOptions,
        KeyValue
    ) {
        'use strict';

        var Wave = dejavu.Class.declare({
            $name: 'Wave',

            $extends: Module,

            $implements: [IConnecting, IControllable],

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @private
             *
             * @type {number}
             */
            __cents: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @private
             *
             * @type {Object}
             */
            __envelopeGainNodeList: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @private
             *
             * @type {Snautsynth.Audio.Module.EnvelopeValues}
             */
            __envelopeValues: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @private
             *
             * @type {number}
             */
            __gain: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @private
             *
             * @type {GainNode}
             */
            __gainNode: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @private
             *
             * @type {number}
             */
            __halftones: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @private
             *
             * @type {Object}
             */
            __runningOscillatorList: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @private
             *
             * @type {number}
             */
            __octaves: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             * @private
             *
             * @type {string}
             */
            __waveType: null,

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
                CTRL_TARGET_TRIGGER_NOTE:         8,


                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_ATTACK:            9,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_DECAY:             10,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_SUSTAIN:           11,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_RELEASE:           12,

                /**
                 * @memberof Snautsynth.Audio.Module.Generator.Wave
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENVELOPE:              13
            },

            /**
             * @constructor
             * @class      Snautsynth.Audio.Module.Generator.Wave
             * @extends    Snautsynth.Audio.Module.Module
             * @implements Snautsynth.Audio.Module.IConnecting
             * @implements Snautsynth.Audio.Module.IControllable
             *
             * @param {number}                                                  id
             * @param {AudioContext}                                            audioContext
             * @param {number}                                                  tuning
             * @param {string}                                                  waveType
             * @param {number}                                                  gain
             * @param {Snautsynth.Audio.Module.EnvelopeValues}                  envelopeValues
             * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>}        moduleConnectionList
             * @param {Snautsynth.Audio.Module.IControlTargetOptionsAccessable} controlTargetOptions
             */
            initialize: function(
                id,
                audioContext,
                tuning,
                waveType,
                gain,
                envelopeValues,
                moduleConnectionList,
                controlTargetOptions
            ) {
                this.$super(id, audioContext, moduleConnectionList, controlTargetOptions);

                this.__envelopeValues = envelopeValues;
                this.__octaves        = 0;
                this.__halftones      = 0;

                if (Math.abs(tuning / Wave.CENTS_OCTAVE) >= 1) {
                    this.__octaves = parseInt(tuning / Wave.CENTS_OCTAVE);
                    tuning = tuning - this.__octaves * Wave.CENTS_OCTAVE;
                }

                if (Math.abs(tuning / Wave.CENTS_HALFTONE) >= 1) {
                    this.__halftones = parseInt(tuning / Wave.CENTS_HALFTONE);
                    tuning = tuning - this.__halftones * Wave.CENTS_HALFTONE;
                }

                this.__cents = tuning;

                this.__waveType = waveType;

                this.__gainNode = audioContext.createGain();
                this.__gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
                this.__gain = gain;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} cents
             * @param {number} currentTime
             */
            changeCents: function(cents, currentTime) {
                this.__cents = cents;
                cents       = cents + this.__halftones * Wave.CENTS_HALFTONE + this.__octaves * Wave.CENTS_OCTAVE;

                this.changeTune(cents, currentTime);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} value
             * @param {number} currentTime
             */
            changeGain: function(value, currentTime) {
                this.__gainNode.gain.setValueAtTime(value, currentTime);
                this.__gain = value;
            },

            /**
             * Changes tunes in halftone-steps
             *
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} halftones
             * @param {number} currentTime
             */
            changeHalftones: function(halftones, currentTime) {
                this.__halftones = halftones;
                var cents       = this.__cents + halftones * Wave.CENTS_HALFTONE + this.__octaves * Wave.CENTS_OCTAVE;

                this.changeTune(cents, currentTime);
            },

            /**
             * Changes tune in octave-steps
             *
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} octaves
             * @param {number} currentTime
             */
            changeOctaves: function(octaves, currentTime) {
                this.__octaves = octaves;
                var cents     = this.__cents + this.__halftones * Wave.CENTS_HALFTONE + octaves * Wave.CENTS_OCTAVE;

                this.changeTune(cents, currentTime);
            },

            /**
             * Changes tune in cent-steps
             *
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             *
             * @param {number} cents
             * @param {number} currentTime
             */
            changeTune: function(cents, currentTime) {
                if (null === this.__runningOscillatorList) {
                    return;
                }

                for (var noteKey in this.__runningOscillatorList) {
                    if (!this.__runningOscillatorList.hasOwnProperty(noteKey)) {
                        continue;
                    }

                    if (undefined === this.__runningOscillatorList[noteKey]) {
                        continue;
                    }

                    var oscillator = this.__runningOscillatorList[noteKey];
                    oscillator.detune.setValueAtTime(cents, currentTime);
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} currentTime
             * @param {string} waveType
             */
            changeWaveType: function (waveType, currentTime) {
                this.__waveType = waveType;

                if (null === this.__runningOscillatorList) {
                    return;
                }

                for (var noteKey in this.__runningOscillatorList) {
                    if (!this.__runningOscillatorList.hasOwnProperty(noteKey)) {
                        continue;
                    }

                    if (null === this.__runningOscillatorList[noteKey]) {
                        continue;
                    }

                    var oscillator  = this.__runningOscillatorList[noteKey];
                    oscillator.type = this.__waveType;
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
                    var groupedControlConnections = controlConnectionList[keys[i]];

                    groupedControlConnections.forEach(function(controlConnection) {
                        if (module.getId() !== controlConnection.getModuleId()) {
                            return;
                        }

                        switch(controlConnection.getControlTarget()) {
                            case Wave.CTRL_TARGET_VALUE_TUNE_CENTS:
                                controlConnection.setCallback(
                                    module.bindCallback(module, 'changeCents')
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                                controlConnection.setCallback(
                                    module.bindCallback(module, 'changeHalftones')
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                                controlConnection.setCallback(
                                    module.bindCallback(module, 'changeOctaves')
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                                controlConnection.setCallback(
                                    module.bindCallback(module, 'changeWaveType')
                                );
                                break;
                            case Wave.CTRL_TARGET_TRIGGER_NOTE:
                                controlConnection.setCallback(
                                    module.bindCallback(module, 'triggerNote')
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_GAIN:
                                controlConnection.setCallback(
                                    module.bindCallback(module, 'changeGain')
                                );
                                break;
                            case Wave.CTRL_TARGET_ENV_ATTACK:
                                controlConnection.setCallback(
                                    module.bindCallback(module, 'changeAttack')
                                );
                                break;
                            case Wave.CTRL_TARGET_ENV_DECAY:
                                controlConnection.setCallback(
                                    module.bindCallback(module, 'changeDecay')
                                );
                                break;
                            case Wave.CTRL_TARGET_ENV_SUSTAIN:
                                controlConnection.setCallback(
                                    module.bindCallback(module, 'changeSustain')
                                );
                                break;
                            case Wave.CTRL_TARGET_ENV_RELEASE:
                                controlConnection.setCallback(
                                    module.bindCallback(module, 'changeRelease')
                                );
                                break;
                        }
                    });
                }
            },

            /**
             * @param {Snautsynth.Control.UI.Envelope.PointValue} pointValue
             * @param {number}                                    currentTime
             */
            changeAttack: function(pointValue, currentTime) {
                this.__envelopeValues.setAttack(pointValue);
            },

            /**
             * @param {Snautsynth.Control.UI.Envelope.PointValue} pointValue
             * @param {number}                                    currentTime
             */
            changeDecay: function(pointValue, currentTime) {
                this.__envelopeValues.setDecay(pointValue);
            },

            /**
             * @param {Snautsynth.Control.UI.Envelope.PointValue} pointValue
             * @param {number}                                    currentTime
             */
            changeSustain: function(pointValue, currentTime) {
                this.__envelopeValues.setSustain(pointValue);
            },

            /**
             * @param {Snautsynth.Control.UI.Envelope.PointValue} pointValue
             * @param {number}                                    currentTime
             */
            changeRelease: function(pointValue, currentTime) {
                this.__envelopeValues.setRelease(pointValue);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} note
             * @param {number} currentTime
             */
            createOscillator: function(note, currentTime) {
                if (null === this.__runningOscillatorList) {
                    this.__runningOscillatorList = {};
                }

                if (null === this.__envelopeGainNodeList) {
                    this.__envelopeGainNodeList = {};
                }

                var runningOscillatorCounter = Object.keys(this.__runningOscillatorList);

                if (Wave.MAX_RUNNING_OSCILLATORS === runningOscillatorCounter) {
                    return;
                }

                var frequency = AudioUtil.calcFreqByKey(note);

                var oscillator             = this._audioContext.createOscillator();
                oscillator.type            = this.__waveType;
                oscillator.detune.value    = this.__octaves * Wave.CENTS_OCTAVE + this.__halftones * Wave.CENTS_HALFTONE;
                oscillator.frequency.value = frequency;

                if (null === this.__envelopeValues) {
                    oscillator.connect(this.__gainNode);
                }

                this.__runningOscillatorList[note] = oscillator;

                var envelopeGainNode;

                if (null !== this.__envelopeValues) {
                    envelopeGainNode = new Gain(0, this._audioContext, 0, this.__envelopeValues, null, null);

                    this.__envelopeGainNodeList[note] = envelopeGainNode;

                    oscillator.connect(envelopeGainNode.getTargetNode());

                    envelopeGainNode.getTargetNode().connect(this.__gainNode);
                }

                oscillator.start(0);

                if (null !== this.__envelopeValues) {
                    envelopeGainNode.startEnvelope(currentTime);
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} note
             * @param {number} currentTime
             */
            destroyOscillator: function(note, currentTime) {
                if (null === this.__runningOscillatorList) {
                    return;
                }

                var oscillatorList = this.__runningOscillatorList;
                var oscillator     = oscillatorList[note];

                if (null !== this.__envelopeValues) {
                    var envelopeGainNodeList = this.__envelopeGainNodeList;

                    if (null === envelopeGainNodeList) {
                        return;
                    }

                    /** @type Gain */
                    var envelopeGainNode = envelopeGainNodeList[note];

                    if (typeof envelopeGainNode === 'undefined') {
                        return;
                    }

                    envelopeGainNode.stopEnvelope(currentTime);

                    oscillator.stop(currentTime + this.__envelopeValues.getReleaseTime());

                    oscillator.onended = function() {
                        oscillator.disconnect();
                        delete oscillatorList[note];
                        delete envelopeGainNodeList[note];
                    };
                } else {
                    oscillator.stop();
                    oscillator.onended = function() {
                        oscillator.disconnect();
                        delete oscillatorList[note];
                    };
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @return {AudioNode}
             */
            getSourceNode: function() {
                return this.__gainNode;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} ctrlTargetId
             *
             * @return {null|*}
             */
            getValueByCtrlTarget: function(ctrlTargetId) {
                switch (ctrlTargetId) {
                    case Wave.CTRL_TARGET_VALUE_GAIN:
                        return this.__gainNode.gain.value;
                    case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                        return this.__waveType;
                    case Wave.CTRL_TARGET_VALUE_TUNE_CENTS:
                        return this.__cents;
                    case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                        return this.__halftones;
                    case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                        return this.__octaves;
                    case Wave.CTRL_TARGET_ENV_ATTACK:
                        return this.__envelopeValues.getAttack();
                    case Wave.CTRL_TARGET_ENV_DECAY:
                        return this.__envelopeValues.getDecay();
                    case Wave.CTRL_TARGET_ENV_SUSTAIN:
                        return this.__envelopeValues.getSustain();
                    case Wave.CTRL_TARGET_ENV_RELEASE:
                        return this.__envelopeValues.getRelease();
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
                return this._controlTargetOptions.getOptionsById(ctrlTargetId);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} note
             * @param {number} currentTime
             */
            noteOff: function(note, currentTime) {
                this.destroyOscillator(note, currentTime);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} note
             * @param {number} currentTime
             */
            noteOn: function(note, currentTime) {
                this.createOscillator(note, currentTime);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {Snautsynth.Control.UI.DiscreteControl.KeyValue} value
             * @param {number} currentTime
             */
            triggerNote: function(value, currentTime) {
                var keyState = value.getKeyState();
                var note     = value.getNote();

                if (KeyValue.KEY_STATE_DOWN === keyState) {
                    this.noteOn(note, currentTime);
                } else {
                    this.noteOff(note, currentTime);
                }
            }
        });

        return Wave;
    }
);