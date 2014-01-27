define(['dejavu'], function(dejavu){
    var Synthesizer = dejavu.Class.declare({
        $name: 'Synthesizer',

        _audioContext: null,
        _osc1: null,
        _osc1Gain: null,

        _osc2: null,
        _osc2Gain: null,

        _masterGain: null,

        getOsc1: function() {
          return this._osc1;
        },

        getOsc1Gain: function() {
            return this._osc1Gain;
        },

        getOsc2: function() {
            return this._osc1;
        },

        getOsc2Gain: function() {
            return this._osc1Gain;
        },

        getMasterGain: function() {
            return this._masterGain;
        },

        $constants: {
            WAVEFORMS_SINE : 0,
            WAVEFORM_SQUARE: 1,
            WAVEFORM_SAWTOOTH: 2,
            WAVEFORM_TRIANGLE: 3,
            WAVEFORM_CUSTOM: 4
        },


        initialize: function(audioContext) {
            this._audioContext = audioContext;
        },

        init: function() {
            this._osc1 = this._audioContext.createOscillator(); // Create sound source
            this._osc1.type = 0; // Sine wave
            this._osc1.frequency.value = 0; // Frequency in hertz (passed from input button)
            this._osc1Gain = this._audioContext.createGainNode();
            this._osc1Gain.gain.value = 1;

            this._osc2 = this._audioContext.createOscillator(); // Create sound source
            this._osc2.type = 0; // Sine wave
            this._osc2.frequency.value = 0; // Frequency in hertz (passed from input button)
            this._osc2Gain = this._audioContext.createGainNode();
            this._osc2Gain.gain.value = 1;

            // Create GainNode
            this._masterGain = this._audioContext.createGainNode(); // Create gain node
            this._masterGain.gain.value = 1; // Set gain to full volume

            // Connect the Nodes
            this._osc1.connect(this._osc1Gain); // Connect oscillator to gain
            this._osc2.connect(this._osc2Gain); // Connect oscillator to gain

            this._osc1Gain.connect(this._masterGain);
            this._osc2Gain.connect(this._masterGain);
            this._masterGain.connect(this._audioContext.destination); // Connect gain to output

            //start osc
            this._osc1.start(0);
        }
    });
    return Synthesizer;
});
