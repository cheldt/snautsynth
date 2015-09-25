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
        'app/control/ui/discretecontrol/KeyValue'
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
             * @type {Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues}
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
                CTRL_TARGET_TRIGGER_NOTE:         8
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
             * @param {Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues}   envelopeValues
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
             * @param {number} time
             */
            changeCents: function(cents, time) {
                this.__cents = cents;
                cents       = cents + this.__halftones * Wave.CENTS_HALFTONE + this.__octaves * Wave.CENTS_OCTAVE;

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
                this.__gainNode.gain.setValueAtTime(value, time);
                this.__gain = value;
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
                this.__halftones = halftones;
                var cents       = this.__cents + halftones * Wave.CENTS_HALFTONE + this.__octaves * Wave.CENTS_OCTAVE;

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
                this.__octaves = octaves;
                var cents     = this.__cents + this.__halftones * Wave.CENTS_HALFTONE + octaves * Wave.CENTS_OCTAVE;

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
                                    module.bindCallback(module,'changeCents')
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                                controlConnection.setCallback(
                                    module.bindCallback(module,'changeHalftones')
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                                controlConnection.setCallback(
                                    module.bindCallback(module,'changeOctaves')
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                                controlConnection.setCallback(
                                    module.bindCallback(module,'changeWaveType')
                                );
                                break;
                            case Wave.CTRL_TARGET_TRIGGER_NOTE:
                                controlConnection.setCallback(
                                    module.bindCallback(module,'triggerNote')
                                );
                                break;
                            case Wave.CTRL_TARGET_VALUE_GAIN:
                                controlConnection.setCallback(
                                    module.bindCallback(module,'changeGain')
                                );
                                break;
                        }
                    });
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} currentTime
             * @param {number} note
             */
            createOscillator: function(currentTime, note) {
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

                if (typeof this.__runningOscillatorList[note] !== 'undefined') {
                    return;
                }

                var frequency = AudioUtil.calcFreqByKey(note);

                var oscillator             = this._audioContext.createOscillator();
                oscillator.type            = this.__waveType;
                oscillator.detune.value    = this.__octaves * Wave.CENTS_OCTAVE + this.__halftones * Wave.CENTS_HALFTONE;
                oscillator.frequency.value = frequency;

                if (null == this.__envelopeOptions) {
                    oscillator.connect(this.__gainNode);
                }

                this.__runningOscillatorList[note] = oscillator;

                var envelopeGainNode;

                if (null != this.__envelopeOptions) {
                    envelopeGainNode = this._audioContext.createGain();
                    envelopeGainNode.gain.value = 0;

                    this.__envelopeGainNodeList[note] = envelopeGainNode;

                    oscillator.connect(envelopeGainNode);

                    envelopeGainNode.connect(this.__gainNode);
                }

                oscillator.start(0);

                if (null != this.__envelopeOptions) {
                    // ADSR - envelope
                    // reset all schedulers
                    envelopeGainNode.gain.cancelScheduledValues(0.0);
                    envelopeGainNode.gain.setValueAtTime(0, currentTime);

                    // Ramp to attack-values
                    envelopeGainNode.gain.linearRampToValueAtTime(
                        this.__envelopeValues.getAttackGain(),
                        currentTime + this.__envelopeValues.getAttackTime()
                    );

                    // Ramp to decay time and gain
                    envelopeGainNode.gain.linearRampToValueAtTime(
                        this.__envelopeValues.getDecayGain(),
                        currentTime + this.__envelopeValues.getDecayTime()
                    );

                    // Hold sustain
                    envelopeGainNode.gain.linearRampToValueAtTime(
                        this.__envelopeValues.getDecayGain(),
                        currentTime + this.__envelopeValues.getSustainTime()
                    );

                    // Ramp to 0 in release-time
                    envelopeGainNode.gain.linearRampToValueAtTime(
                        0,
                        currentTime + this.__envelopeValues.getReleaseTime()
                    );
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} currentTime
             * @param {number} note
             */
            destroyOscillator: function(currentTime, note) {
                if (null === this.__runningOscillatorList) {
                    return;
                }

                var oscillator = this.__runningOscillatorList[note];

                if (null != this.__envelopeOptions) {
                    /** @type GainNode */
                    var envelopeGainNode = this.__envelopeGainNodeList[note];


                    envelopeGainNode.gain.cancelScheduledValues(0.0);
                    envelopeGainNode.gain.setValueAtTime(envelopeGainNode.gain.value, currentTime);

                    // ramp to release
                    envelopeGainNode.gain.linearRampToValueAtTime(
                        0,
                        currentTime + this.__envelopeValues.getReleaseTime()
                    );

                    while (0 != envelopeGainNode.gain.value) {

                    }
                } else {

                    oscillator.disconnect();
                    oscillator.stop();

                    delete this.__runningOscillatorList[note];
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
             * @param {number} currentTime
             * @param {number} note
             */
            noteOff: function(currentTime, note) {
                this.destroyOscillator(note);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} currentTime
             * @param {number} note
             */
            noteOn: function(currentTime, note) {
                this.createOscillator(note);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} currentTime
             * @param {Snautsynth.Control.UI.DiscreteControl.KeyValue} value
             */
            triggerNote: function(currentTime, value) {
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