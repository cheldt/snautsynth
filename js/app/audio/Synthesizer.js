define(['dejavu', 'app/audio/utils/Audio', 'app/utils/GlobalConstants',  'app/event/Event'], function(dejavu, AudioUtils, GlobalConstants, Event){
    var Synthesizer = dejavu.Class.declare({
        $name: 'Synthesizer',

        _audioContext: null,
        _osc1: null,
        _osc1Gain: null,

        _osc2: null,
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

        getOsc1: function() {
          return this._osc1;
        },

        getOsc1Gain: function() {
            return this._osc1Gain;
        },

        getOsc2: function() {
            return this._osc2;
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

        initialize: function(audioContext) {
            this._audioContext = audioContext;

            this._keycode_note_mapping = {};

            this._keycode_note_mapping[GlobalConstants.KEY_CODE_A] = GlobalConstants.NOTE_Cis5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_W] = GlobalConstants.NOTE_D_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_S] = GlobalConstants.NOTE_Dis5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_E] = GlobalConstants.NOTE_E_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_D] = GlobalConstants.NOTE_F_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_F] = GlobalConstants.NOTE_Fis5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_T] = GlobalConstants.NOTE_G_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_G] = GlobalConstants.NOTE_Gis5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_Z] = GlobalConstants.NOTE_A_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_U] = GlobalConstants.NOTE_Ais5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_J] = GlobalConstants.NOTE_B_5;
            this._keycode_note_mapping[GlobalConstants.KEY_CODE_K] = GlobalConstants.NOTE_C_6;
        },

        init: function() {
            // Create first oscillator and init values
            this._osc1                    = this._audioContext.createOscillator(); // Create sound source
            this._osc1.type               = Synthesizer.WAVEFORM_SINE; // Sine wave
            this._osc1.frequency.value    = 0; // Frequency in hertz (passed from input button)
            this._osc1Gain                = this._audioContext.createGain();
            this._osc1Gain.gain.value     = 1;

            // Create second oscillator and init values
            this._osc2                    = this._audioContext.createOscillator(); // Create sound source
            this._osc2.type               = Synthesizer.WAVEFORM_SINE; // Sine wave
            this._osc2.frequency.value    = 0; // Frequency in hertz (passed from input button)
            this._osc2Gain                = this._audioContext.createGain();
            this._osc2Gain.gain.value     = 1;

            // Create envelope gainnode
            this._envelopeGain            = this._audioContext.createGain();
            this._envelopeGain.gain.value = 0;

            // Create GainNode
            this._masterGain               = this._audioContext.createGain(); // Create gain node
            this._masterGain.gain.value    = 0.5; // Set gain to full volume

            // Create FilterNode
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

            this._noteIsOn                = false;

            // Connect the Nodes
            this._osc1.connect(this._osc1Gain); // Connect oscillator to gain
            this._osc2.connect(this._osc2Gain); // Connect oscillator to gain

            this._osc1Gain.connect(this._envelopeGain);
            this._osc2Gain.connect(this._envelopeGain);

            this._envelopeGain.connect(this._filter);

            this._filter.connect(this._masterGain);

            this._masterGain.connect(this._audioContext.destination); // Connect gain to output

            //start osc
            this._osc1.start(0);
            this._osc2.start(0);
        },

        processEventObject: function(eventObject, canvasState) {
            var now = this._audioContext.currentTime;

            if(typeof eventObject !== 'undefined' ) {
                if (eventObject.getType() == Event.TYPE_VALUE_CHANGED) {
                    var eventValue = eventObject.getValue();

                    switch (eventObject.getControlId()) {
                        case GlobalConstants.CTRL_OSC1_WAVE:
                            this.getOsc1().type = eventValue;
                            break;
                        case GlobalConstants.CTRL_OSC1_TUNE:
                            var osc1OctaveValue = canvasState.getValueByControlId(GlobalConstants.CTRL_OSC1_OCT);
                            this.getOsc1().detune.setValueAtTime(eventValue * 100 + osc1OctaveValue * 1200, now);
                            break;
                        case GlobalConstants.CTRL_OSC1_OCT:
                            var osc1TuneValue = canvasState.getValueByControlId(GlobalConstants.CTRL_OSC1_TUNE);
                            this.getOsc1().detune.setValueAtTime(eventValue * 1200 + osc1TuneValue * 100, now);
                            break;
                        case GlobalConstants.CTRL_OSC1_GAIN:
                            this.getOsc1Gain().gain.setValueAtTime(eventValue, now);
                            break;
                        case GlobalConstants.CTRL_OSC2_WAVE:
                            this.getOsc2().type = eventValue;
                            break;
                        case GlobalConstants.CTRL_OSC2_TUNE:
                            var osc2OctaveValue = canvasState.getValueByControlId(GlobalConstants.CTRL_OSC2_OCT);
                            this.getOsc2().detune.setValueAtTime(eventValue * 100 + osc2OctaveValue * 1200,now);
                            break;
                        case GlobalConstants.CTRL_OSC2_OCT:
                            var osc2TuneValue = canvasState.getValueByControlId(GlobalConstants.CTRL_OSC2_TUNE);
                            this.getOsc2().detune.setValueAtTime(eventValue * 1200 + osc2TuneValue * 100, now);
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

                console.log(this._envelopeReleaseGain);
            }
        },

        noteOff: function() {
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
        }
    });

    return Synthesizer;
});
