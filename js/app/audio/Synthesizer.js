define(['dejavu', 'app/audio/util/Audio', 'app/util/GlobalConstants',  'app/event/Event'], function(dejavu, AudioUtils, GlobalConstants, Event){
    var Synthesizer = dejavu.Class.declare({
        $name: 'Synthesizer',

        _audioContext: null,
        _canvasState: null,

        _osc1Gain: null,

        _osc2Gain: null,

        _envelopeGain: null,

        _masterGain: null,

        _envelopeAttackGain: null,
        _envelopeAttackTime: null,

        _envelopeSustainGain: null,
        _envelopeDecayTime: null,

        _envelopeReleaseGain: null,
        _envelopeReleaseTime: null,

        _filter: null,

        _noteStartTime: null,

        _keycode_note_mapping: null,

        _runningOscillators: null,

        getOsc1Gain: function() {
            return this._osc1Gain;
        },

        getOsc2Gain: function() {
            return this._osc2Gain;
        },

        getMasterGain: function() {
            return this._masterGain;
        },

        setEnvelopeAttackGain: function(attackGain) {
            this._envelopeAttackGain = attackGain;
        },

        setEnvelopeAttackTime: function(attackTime) {
            this._envelopeAttackTime = attackTime;
        },

        setEnvelopeDecayTime: function(decayTime) {
            this._envelopeDecayTime = decayTime;
        },

        setEnvelopeSustainGain: function(sustainGain) {
            this._envelopeSustainGain = sustainGain;
        },

        setEnvelopeReleaseGain: function(releaseGain) {
            this._envelopeReleaseGain = releaseGain;
        },

        setEnvelopeReleaseTime: function(releaseTime) {
            this._envelopeReleaseTime = releaseTime;
        },

        getFilter: function() {
            return this._filter;
        },

        $constants: {
            OSC1_ID:             1,
            OSC2_ID:             2,
            WAVEFORM_SINE :      'sine',
            WAVEFORM_SQUARE:     'square',
            WAVEFORM_SAWTOOTH:   'sawtooth',
            WAVEFORM_TRIANGLE:   'triangle',
            WAVEFORM_CUSTOM:     'custom',
            FILTER_LOWPASS:      'lowpass',
            FILTER_BANDPASS:     'bandpass',
            FILTER_HIGHPASS:     'highpass',
            FILTER_OFF:          'off',
            FILTER_DEFAULT_FREQ: 22050,
            FILTER_DEFAULT_RES:  0.0001
        },

        initialize: function(audioContext, canvasState) {
            this._audioContext = audioContext;
            this._canvasState  = canvasState;

            this._keycode_note_mapping = {};

            this._keycode_note_mapping[GlobalConstants.KEY_CODE_A] = GlobalConstants.NOTE_C_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_W] = GlobalConstants.NOTE_Cis5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_S] = GlobalConstants.NOTE_D_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_E] = GlobalConstants.NOTE_Dis5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_D] = GlobalConstants.NOTE_E_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_F] = GlobalConstants.NOTE_F_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_T] = GlobalConstants.NOTE_Fis5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_G] = GlobalConstants.NOTE_G_5
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_Z] = GlobalConstants.NOTE_Gis5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_H] = GlobalConstants.NOTE_A_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_U] = GlobalConstants.NOTE_Ais5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_J] = GlobalConstants.NOTE_B_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_K] = GlobalConstants.NOTE_C_6;
        },

        /**
         * Creates oscillators per triggered note and starts them
         *
         * @param {number} note
         */
        createOscillators: function(note) {
            if (this._runningOscillators === null) {
                this._runningOscillators = {};
            }

            if (this._runningOscillators[note] !== undefined) {
                return;
            }

            var frequency = AudioUtils.calcFreqByKey(note);

            //create new oscillators
            var osc1             = this._audioContext.createOscillator();
            osc1.type            = this._canvasState.getValueByControlId(GlobalConstants.CTRL_OSC1_WAVE);
            osc1.frequency.value = frequency;

            osc1.connect(this._osc1Gain);

            var osc2             = this._audioContext.createOscillator();
            osc2.type            = this._canvasState.getValueByControlId(GlobalConstants.CTRL_OSC2_WAVE);
            osc2.frequency.value = frequency;

            osc2.connect(this._osc2Gain);

            this._runningOscillators[note] = {};

            this._runningOscillators[note][Synthesizer.OSC1_ID] = osc1;
            this._runningOscillators[note][Synthesizer.OSC2_ID] = osc2;

            var now = this._audioContext.currentTime;

            var value = this._canvasState.getValueByControlId(GlobalConstants.CTRL_OSC1_TUNE);
            this.changeOscillatorTune(value, osc1, GlobalConstants.CTRL_OSC1_OCT, now);

            value = this._canvasState.getValueByControlId(GlobalConstants.CTRL_OSC1_OCT);
            this.changeOscillatorOctave(value, osc1, GlobalConstants.CTRL_OSC1_TUNE, now);

            value = this._canvasState.getValueByControlId(GlobalConstants.CTRL_OSC2_TUNE);
            this.changeOscillatorTune(value, osc2, GlobalConstants.CTRL_OSC2_OCT, now);

            value = this._canvasState.getValueByControlId(GlobalConstants.CTRL_OSC2_OCT);
            this.changeOscillatorOctave(value, osc2, GlobalConstants.CTRL_OSC2_TUNE, now);

            osc1.start(0);
            osc2.start(0);
        },

        /**
         * @param {number} note
         */
        destroyOscillators: function(note) {
            if (this._runningOscillators === null) {
                return;
            }

            for (var oscillatorKey in this._runningOscillators) {
                if (oscillatorKey == note && undefined !== this._runningOscillators[oscillatorKey]) {
                    var oscillators = this._runningOscillators[oscillatorKey];

                    for (var key in oscillators) {
                        var oscillator = oscillators[key];
                        oscillator.disconnect();
                        oscillator.stop();
                    }

                    this._runningOscillators[oscillatorKey] = undefined;
                }
            }
        },

        init: function() {
            this._osc1Gain                = this._audioContext.createGain();
            this._osc1Gain.gain.value     = 1;

            this._osc2Gain                = this._audioContext.createGain();
            this._osc2Gain.gain.value     = 1;

            // Create envelope gainNode
            this._envelopeGain            = this._audioContext.createGain();
            this._envelopeGain.gain.value = 1;

            // Create master-gainNode
            this._masterGain               = this._audioContext.createGain(); // Create gain node
            this._masterGain.gain.value    = 0.1; // Set gain to full volume

            // Create filterNode
            this._filter                   = this._audioContext.createBiquadFilter();
            this._filter.type              = Synthesizer.FILTER_LOWPASS;
            this._filter.frequency.value   = Synthesizer.FILTER_DEFAULT_FREQ;
            this._filter.Q.value           = Synthesizer.FILTER_DEFAULT_RES;

            this._envelopeAttackGain   = 1;
            this._envelopeAttackTime   = 1;

            this._envelopeSustainGain  = 1;
            this._envelopeDecayTime    = 3;

            this._envelopeReleaseGain  = 0.2;
            this._envelopeReleaseTime  = 7;

            this._osc1Gain.connect(this._envelopeGain);
            this._osc2Gain.connect(this._envelopeGain);

            this._envelopeGain.connect(this._filter);

            this._filter.connect(this._masterGain);

            this._masterGain.connect(this._audioContext.destination); // Connect gain to output
        },

        /**
         * @param {String|Number} eventValue
         * @param {number} oscillatorId
         */
        changeRunningOscillatorsWaveType: function(eventValue, oscillatorId) {
            if (null === this._runningOscillators) {
                return;
            }

            for (var noteKey in this._runningOscillators) {
                if (undefined === this._runningOscillators[noteKey]) {
                    return;
                }

                var oscillators = this._runningOscillators[noteKey];

                for (var oscillatorKey in oscillators) {
                    if (oscillatorKey != oscillatorId) {
                        continue;
                    }

                    var oscillator = oscillators[oscillatorKey];
                    oscillator.type = eventValue;
                }
            }
        },


        /**
         * @param {number} value
         * @param {Object} oscillator
         * @param {number} octaveControllerId
         * @param {number} currentTime
         */
        changeOscillatorTune: function(value, oscillator, octaveControllerId, currentTime) {
            var octaveValue = this._canvasState.getValueByControlId(octaveControllerId);
            oscillator.detune.setValueAtTime(value * 100 + octaveValue * 1200, currentTime);
        },

        /**
         * @param {String|Number} value
         * @param {number} oscillatorId
         * @param {number} octaveControllerId
         */
        changeRunningOscillatorsTune: function(value, oscillatorId, octaveControllerId) {
            if (null === this._runningOscillators) {
                return;
            }

            var now = this._audioContext.currentTime;

            for (var noteKey in this._runningOscillators) {
                if (undefined === this._runningOscillators[noteKey]) {
                    return
                }

                var oscillators = this._runningOscillators[noteKey];

                for (var oscillatorKey in oscillators) {
                    if (oscillatorId != oscillatorKey) {
                        continue;
                    }

                    var oscillator = oscillators[oscillatorKey];
                    this.changeOscillatorTune(value, oscillator, octaveControllerId, now)
                }
            }
        },

        /**
         * @param {number} value
         * @param {Object} oscillator
         * @param {number} tuneControllerId
         * @param {number} currentTime
         */
        changeOscillatorOctave: function(value, oscillator, tuneControllerId, currentTime) {
            var tuneValue = this._canvasState.getValueByControlId(tuneControllerId);
            oscillator.detune.setValueAtTime(value * 1200 + tuneValue * 100, currentTime);
        },

        /**
         * @param {String|Number} value
         * @param {number} oscillatorId
         * @param {number} tuneControllerId
         */
        changeRunningOscillatorsOctave: function(value, oscillatorId, tuneControllerId) {
            if (null === this._runningOscillators) {
                return;
            }

            var now = this._audioContext.currentTime;

            for (var noteKey in this._runningOscillators) {
                if (undefined === this._runningOscillators[noteKey]) {
                    return;
                }

                var oscillators = this._runningOscillators[noteKey];

                for (var oscillatorKey in oscillators) {
                    if (oscillatorKey != oscillatorId) {
                        continue;
                    }

                    var oscillator = oscillators[oscillatorKey];
                    this.changeOscillatorOctave(value, oscillator, tuneControllerId, now);
                }
            }
        },

        processEventObject: function(eventObject, canvasState) {
            var now = this._audioContext.currentTime;

            if (typeof eventObject !== 'undefined') {
                if (eventObject.getType() == Event.TYPE_VALUE_CHANGED) {
                    var eventValue = eventObject.getValue();

                    switch (eventObject.getControlId()) {
                        case GlobalConstants.CTRL_OSC1_WAVE:
                            this.changeRunningOscillatorsWaveType(eventValue, Synthesizer.OSC1_ID);
                            break;
                        case GlobalConstants.CTRL_OSC1_TUNE:
                            this.changeRunningOscillatorsTune(
                                eventValue,
                                Synthesizer.OSC1_ID,
                                GlobalConstants.CTRL_OSC1_OCT
                            );
                            break;
                        case GlobalConstants.CTRL_OSC1_OCT:
                            this.changeRunningOscillatorsOctave(
                                eventValue,
                                Synthesizer.OSC1_ID,
                                GlobalConstants.CTRL_OSC1_TUNE
                            );
                            break;
                        case GlobalConstants.CTRL_OSC1_GAIN:
                            this.getOsc1Gain().gain.setValueAtTime(eventValue, now);
                            break;
                        case GlobalConstants.CTRL_OSC2_WAVE:
                            this.changeRunningOscillatorsWaveType(eventValue, Synthesizer.OSC2_ID);
                            break;
                        case GlobalConstants.CTRL_OSC2_TUNE:
                            this.changeRunningOscillatorsTune(
                                eventValue,
                                Synthesizer.OSC2_ID,
                                GlobalConstants.CTRL_OSC2_OCT
                            );
                            break;
                        case GlobalConstants.CTRL_OSC2_OCT:
                            this.changeRunningOscillatorsOctave(
                                eventValue,
                                Synthesizer.OSC2_ID,
                                GlobalConstants.CTRL_OSC2_TUNE
                            );
                            break;
                        case GlobalConstants.CTRL_OSC2_GAIN:
                            this.getOsc2Gain().gain.setValueAtTime(eventValue, now);
                            break;
                        case GlobalConstants.CTRL_MASTERGAIN:
                            this.getMasterGain().gain.setValueAtTime(eventValue, now);
                            break;
                        case GlobalConstants.CTRL_ATTACK_POINT:
                            this.setEnvelopeAttackGain(eventValue.getGain());
                            this.setEnvelopeAttackTime(eventValue.getTime());
                            break;
                        case GlobalConstants.CTRL_DECAYTIME_SUSTAINGAIN_POINT:
                            this.setEnvelopeSustainGain(eventValue.getGain());
                            this.setEnvelopeDecayTime(eventValue.getTime());
                            break;
                        case GlobalConstants.CTRL_RELEASE_POINT:
                            this.setEnvelopeReleaseGain(eventValue.getGain());
                            this.setEnvelopeReleaseTime(eventValue.getTime());
                            break;
                        case GlobalConstants.CTRL_FLT_TYPE:
                            this.getFilter().type = eventValue;
                            break;
                        case GlobalConstants.CTRL_FLT_FREQUENCY:
                            this.getFilter().frequency.setValueAtTime(eventValue, now);
                            break;
                        case GlobalConstants.CTRL_FLT_RESONANCE:
                            this.getFilter().Q.setValueAtTime(eventValue, now);
                            break
                    }
                }
            }
        },



        noteOn: function(keycode) {
            var note = null;

            if (this._keycode_note_mapping.hasOwnProperty(keycode)) {
                note = this._keycode_note_mapping[keycode];
            }

            if (null === note) {
                return;
            }

            this.createOscillators(note);

            /*

            if(null === this._noteStartTime && note != null) {
                var frequency = AudioUtils.calcFreqByKey(note);
                var now       = this._audioContext.currentTime;

                this._noteStartTime = now;

                this._osc1.frequency.setValueAtTime(frequency, now);
                this._osc2.frequency.setValueAtTime(frequency, now);

                // ADSR - envelope
                // reset all schedulers
                this._envelopeGain.gain.cancelScheduledValues(0.0);
                this._envelopeGain.gain.setValueAtTime(0, now);

                // Ramp to attack-values
                this._envelopeGain.gain.linearRampToValueAtTime(
                    this._envelopeAttackGain,
                    now + this._envelopeAttackTime
                );

                // Ramp to decay time and sustain gain
                this._envelopeGain.gain.linearRampToValueAtTime(
                    this._envelopeSustainGain,
                    now + this._envelopeDecayTime
                );

                // ramp to release
                this._envelopeGain.gain.linearRampToValueAtTime(
                    this._envelopeReleaseGain,
                    now + this._envelopeReleaseTime
                );


            }
            */
        },

        noteOff: function(keycode) {
            var note = null;

            if (this._keycode_note_mapping.hasOwnProperty(keycode)) {
                note = this._keycode_note_mapping[keycode];
            }

            if (null === note) {
                return;
            }

            this.destroyOscillators(note);

            /*
            if (null !== this._noteStartTime) {
                var now = this._audioContext.currentTime;
                this._envelopeGain.gain.cancelScheduledValues(0.0);
                this._envelopeGain.gain.setValueAtTime(this._envelopeGain.gain.value, now);

                // ramp to release
                this._envelopeGain.gain.linearRampToValueAtTime(
                    this._envelopeReleaseGain,
                    now + this._envelopeReleaseTime
                );

                this._noteStartTime = null;
            }
            */
        }
    });

    return Synthesizer;
});
