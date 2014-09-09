define(['dejavu', 'app/audio/utils/Audio', 'app/utils/GlobalConstants'], function(dejavu, AudioUtils, GlobalConstants){
    var Synthesizer = dejavu.Class.declare({
        $name: 'Synthesizer',

        _audioContext: null,
        _osc1: null,
        _osc1Gain: null,

        _osc2: null,
        _osc2Gain: null,

        _envelopeGain: null,

        _masterGain: null,

        _envelopeAttackEndGain: null,
        _envelopeAttackEndTime: null,

        _envelopeDecayEndGain: null,
        _envelopeDecayEndTime: null,

        _envelopeSustainEndGain: null,
        _envelopeSustainEndTime: null,

        _envelopeReleaseEndGain: null,
        _envelopeReleaseEndTime: null,

        _envelopeReleaseHoldGain: null,
        _envelopeReleaseHoldTime: null,

        _filter: null,

        _noteIsOn: null,

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

        setEnvelopeAttackEndGain: function(attackEndGain) {
            this._envelopeAttackEndGain = attackEndGain;
        },

        setEnvelopeAttackEndTime: function(attackEndTime) {
            this._envelopeAttackEndTime = attackEndTime;
        },

        setEnvelopeSustainGain: function(sustainGain) {
            this._envelopeSustainGain = sustainGain;
        },

        setEnvelopeDecayEndTime: function(decayEndTime) {
            this._envelopeDecayEndTime = decayEndTime;
        },

        setEnvelopeSustainEndGain: function(sustainEndGain) {
            this._envelopeSustainEndGain = sustainEndGain;
        },

        setEnvelopeSustainEndTime: function(sustainEndTime) {
            this._envelopeSustainEndTime = sustainEndTime;
        },

        setEnvelopeReleaseEndGain: function(releaseEndGain) {
            this._envelopeReleaseEndGain = releaseEndGain;
        },

        setEnvelopeReleaseEndTime: function(releaseEndTime) {
            this._envelopeReleaseEndTime = releaseEndTime;
        },

        setEnvelopeReleaseHoldGain: function(releaseHoldGain) {
            this._envelopeReleaseHoldGain = releaseHoldGain;
        },

        setEnvelopeReleaseHoldTime: function(releaseHoldTime) {
            this._envelopeReleaseHoldTime = releaseHoldTime;
        },

        getFilter: function() {
            return this._filter;
        },

        $constants: {
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

            this._keycode_note_mapping = [
                {key:  GlobalConstants.KEY_CODE_A, value: GlobalConstants.NOTE_C_5},
                {key:  GlobalConstants.KEY_CODE_W, value: GlobalConstants.NOTE_Cis5},
                {key:  GlobalConstants.KEY_CODE_S, value: GlobalConstants.NOTE_D_5},
                {key:  GlobalConstants.KEY_CODE_E, value: GlobalConstants.NOTE_Dis5},
                {key:  GlobalConstants.KEY_CODE_D, value: GlobalConstants.NOTE_E_5},
                {key:  GlobalConstants.KEY_CODE_F, value: GlobalConstants.NOTE_F_5},
                {key:  GlobalConstants.KEY_CODE_T, value: GlobalConstants.NOTE_Fis5},
                {key:  GlobalConstants.KEY_CODE_G, value: GlobalConstants.NOTE_G_5},
                {key:  GlobalConstants.KEY_CODE_Z, value: GlobalConstants.NOTE_Gis5},
                {key:  GlobalConstants.KEY_CODE_H, value: GlobalConstants.NOTE_A_5},
                {key:  GlobalConstants.KEY_CODE_U, value: GlobalConstants.NOTE_Ais5},
                {key:  GlobalConstants.KEY_CODE_J, value: GlobalConstants.NOTE_B_5},
                {key:  GlobalConstants.KEY_CODE_K, value: GlobalConstants.NOTE_C_6}
            ];

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

            this._envelopeAttackEndGain   = 1;
            this._envelopeAttackEndTime   = 1;

            this._envelopeSustainGain     = 1;
            this._envelopeDecayEndTime    = 3;

            this._envelopeReleaseEndGain  = 0.2;
            this._envelopeReleaseEndTime  = 7;

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

        noteOn: function(keycode) {
            var arrayLength = this._keycode_note_mapping.length;
            var note        = null;

            for (var i = 0; i < arrayLength; i++) {
                if(this._keycode_note_mapping[i].key == keycode) {
                    note = this._keycode_note_mapping[i].value;
                }
            }

            if(!this._noteIsOn) {
                this._noteIsOn = true;
                var frequency  = AudioUtils.calcFreqByKey(note);
                var now        = this._audioContext.currentTime;

                this._osc1.frequency.setValueAtTime(frequency,now);
                this._osc2.frequency.setValueAtTime(frequency,now);

                // ADSR - envelope
                // reset all schedulers
                this._envelopeGain.gain.cancelScheduledValues(0.0);
                this._envelopeGain.gain.setValueAtTime(0, now);
                this._envelopeGain.gain.linearRampToValueAtTime(
                    this._envelopeAttackEndGain,
                    now + this._envelopeAttackEndTime
                );

                this._envelopeGain.gain.linearRampToValueAtTime(
                    this._envelopeSustainGain,
                    now + this._envelopeDecayEndTime
                );

                this._envelopeGain.gain.linearRampToValueAtTime(
                    this._envelopeSustainEndGain,
                    now + this._envelopeSustainEndTime
                );
            }
        },

        noteOff: function() {
            var now = this._audioContext.currentTime;
            this._envelopeGain.gain.cancelScheduledValues(0.0);
            this._envelopeGain.gain.setValueAtTime(this._envelopeGain.gain.value, now);
            this._envelopeGain.gain.linearRampToValueAtTime(
                this._envelopeReleaseEndGain,
                now + this._envelopeReleaseEndTime);
            console.log(this._envelopeReleaseEndGain);

            this._noteIsOn = false;
        }

    });
    return Synthesizer;
});
