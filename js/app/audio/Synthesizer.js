define(['dejavu', 'app/audio/utils/Audio'], function(dejavu, AudioUtils){
    var Synthesizer = dejavu.Class.declare({
        $name: 'Synthesizer',

        _audioContext: null,
        _osc1: null,
        _osc1Gain: null,

        _osc2: null,
        _osc2Gain: null,

        _envelopeGain: null,

        _masterGain: null,

        _envelopeAttack: null,
        _envelopeDecay: null,
        _envelopeSustain: null,
        _envelopeRelease: null,

        _filter: null,

        _noteIsOn: null,

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

        setEnvelopeAttack: function(attack) {
            this._envelopeAttack = attack;
        },

        setEnvelopeDecay: function(decay) {
            this._envelopeDecay = decay;
        },

        setEnvelopeSustain: function(sustain) {
            this._envelopeSustain = sustain;
        },

        setEnvelopeRelease: function(release) {
            this._envelopeRelease = release;
        },

        getFilter: function() {
            return this._filter;
        },

        $constants: {
            WAVEFORM_SINE :    0,
            WAVEFORM_SQUARE:   1,
            WAVEFORM_SAWTOOTH: 2,
            WAVEFORM_TRIANGLE: 3,
            WAVEFORM_CUSTOM:   4,
            FILTER_LOWPASS:    'lowpass',
            FILTER_BANDPASS:   'bandpass',
            FILTER_HIGHPASS:   'highpass',
            FILTER_OFF:        'off'
        },

        initialize: function(audioContext) {
            this._audioContext = audioContext;
        },

        init: function() {

            // Create first oscillator and init values
            this._osc1 = this._audioContext.createOscillator(); // Create sound source
            //this._osc1.type = 0; // Sine wave
            this._osc1.frequency.value = 0; // Frequency in hertz (passed from input button)
            this._osc1Gain = this._audioContext.createGainNode();
            this._osc1Gain.gain.value = 1;

            // Create second oscillator and init values
            this._osc2 = this._audioContext.createOscillator(); // Create sound source
            this._osc2.type = 0; // Sine wave
            this._osc2.frequency.value = 0; // Frequency in hertz (passed from input button)
            this._osc2Gain = this._audioContext.createGainNode();
            this._osc2Gain.gain.value = 1;

            // Create envelope gainnode
            this._envelopeGain = this._audioContext.createGainNode();
            this._envelopeGain.gain.value = 0;

            // Create GainNode
            this._masterGain = this._audioContext.createGainNode(); // Create gain node
            this._masterGain.gain.value = 1; // Set gain to full volume

            // Create FilterNode
            this._filter = this._audioContext.createBiquadFilter();
            this._filter.type = 'lowpass';
            this._filter.frequency.value = 22050;
            this._filter.Q.value = 0.0001;

            // Connect the Nodes
            this._osc1.connect(this._osc1Gain); // Connect oscillator to gain
            this._osc2.connect(this._osc2Gain); // Connect oscillator to gain

            this._osc1Gain.connect(this._envelopeGain);
            this._osc2Gain.connect(this._envelopeGain);

            this._envelopeGain.connect(this._filter);

            this._filter.connect(this._masterGain);

            this._masterGain.connect(this._audioContext.destination); // Connect gain to output

            this._envelopeAttack = 1;
            this._envelopeDecay = 2;
            this._envelopeSustain = 0.5;
            this._envelopeRelease = 1;

            this._noteIsOn = false;

            //start osc
            this._osc1.start(0);
            this._osc2.start(0);
        },

        noteOn: function(key) {
            if(!this._noteIsOn) {
                this._noteIsOn = true;
                var frequency = AudioUtils.calcFreqByKey(key);
                var now = this._audioContext.currentTime;


                this._osc1.frequency.setValueAtTime(frequency,now);
                this._osc2.frequency.setValueAtTime(frequency,now);

                // ADSR - envelope
                // reset all schedulers
                this._envelopeGain.gain.cancelScheduledValues(0.0);
                this._envelopeGain.gain.setValueAtTime(0,now);
                this._envelopeGain.gain.linearRampToValueAtTime(1, now + this._envelopeAttack)
                this._envelopeGain.gain.exponentialRampToValueAtTime(this._envelopeSustain, now + this._envelopeAttack + this._envelopeDecay)

            }
        },

        noteOff: function() {
            var now = this._audioContext.currentTime;
            this._envelopeGain.gain.cancelScheduledValues(0.0);
            this._envelopeGain.gain.setValueAtTime(this._envelopeGain.gain.value, now);
            this._envelopeGain.gain.linearRampToValueAtTime(0, now + this._envelopeRelease);
            //synth.getOsc1().frequency.setValueAtTime(0,now);
            //synth.getOsc2().frequency.setValueAtTime(0,now);

            this._noteIsOn = false;
        }

    });
    return Synthesizer;
});
