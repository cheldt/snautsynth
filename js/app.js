'use strict';

require.config({
    baseUrl: 'js/lib',
    paths: {
        app:    '../app',
        mout:   'mout/src',
        //libs
        kinetic: 'kinetic-v5.0.1.min'

    },
    packages: [
        {
            name: 'dejavu',
            location: 'dejavu/dist/amd/strict'
        }
    ],

    shim: {
        'kinetic' : {
            exports: 'Kinetic'
        }
    }

});

// Start the main app logic.
requirejs(['app/event/Event', 'app/canvas/CanvasState',
           'app/controls/ui/Knob', 'app/controls/ui/RadioGroup',
           'app/controls/ui/RadioButton', 'app/controls/ui/Fader',
           'app/audio/Synthesizer', 'app/utils/formatter/NumberFormatter',
           'app/controls/layout/Label'],
    function (Event, CanvasState, Knob, RadioGroup, RadioButton, Fader, Synthesizer, NumberFormatter, Label) {

        var MASTERGAIN    = 1;

        var OSC1_WAVE     = 2;
        var OSC1_TUNE     = 3;
        var OSC1_GAIN     = 4;
        var OSC1_OCT      = 5;

        var OSC2_WAVE     = 6;
        var OSC2_TUNE     = 7;
        var OSC2_GAIN     = 8;
        var OSC2_OCT      = 9;

        var ADSR_A        = 10;
        var ADSR_D        = 11;
        var ADSR_S        = 12;
        var ADSR_R        = 13;

        var FLT_TYPE      = 14;
        var FLT_FREQUENCY = 15;
        var FLT_RESONANCE = 16;

        //var TEST_FADER = 14;

        var canvasState = new CanvasState(600, 600, 'syn');

        var radioGroup = new RadioGroup(OSC1_WAVE, 0, 20, Synthesizer.WAVEFORM_SINE, canvasState);
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Sine", Synthesizer.WAVEFORM_SINE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Square", Synthesizer.WAVEFORM_SQUARE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Saw", Synthesizer.WAVEFORM_SAWTOOTH, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Triangle", Synthesizer.WAVEFORM_TRIANGLE, '#000', '#FFF'));
        canvasState.addControl(radioGroup);

        canvasState.addControl(new Label(1, 0, 20, canvasState, '#000', 'OSC1-Waveform'));

        canvasState.addControl(new Knob(OSC1_TUNE, 60, 20, 0, canvasState, 1, -12, 12, 50,'#AABBCC', 0, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 130, 20, canvasState, '#000', 'OSC1-Tune'));

        canvasState.addControl(new Knob(OSC1_OCT, 120, 20, 0, canvasState, 1, -4, 4, 50,'#AABBCC', 1, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 250, 20, canvasState, '#000', 'OSC1-Octave'));

        canvasState.addControl(new Knob(OSC1_GAIN, 180, 20, 1, canvasState, 100, 0, 1, 50,'#AABBCC', 0, 0, null, new NumberFormatter('#0.0')));
        canvasState.addControl(new Label(1, 370, 20, canvasState, '#000', 'OSC1-Gain'));


        canvasState.addControl(new Label(1, 0, 180, canvasState, '#000', 'OSC2-Waveform'));

        radioGroup = new RadioGroup(OSC2_WAVE, 0, 100, Synthesizer.WAVEFORM_SINE, canvasState);
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Sine", Synthesizer.WAVEFORM_SINE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Square", Synthesizer.WAVEFORM_SQUARE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Saw", Synthesizer.WAVEFORM_SAWTOOTH, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Triangle", Synthesizer.WAVEFORM_TRIANGLE, '#000', '#FFF'));
        canvasState.addControl(radioGroup);


        canvasState.addControl(new Knob(OSC2_TUNE, 60, 100, 0, canvasState, 1, -12, 12, 50,'#AABBCC', 0, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 130, 180, canvasState, '#000', 'OSC1-Tune'));

        canvasState.addControl(new Knob(OSC2_OCT, 120, 100, 0, canvasState, 1, -4, 4, 50,'#AABBCC', 1, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 250, 180, canvasState, '#000', 'OSC1-Octave'));

        canvasState.addControl(new Knob(OSC2_GAIN, 180, 100, 1, canvasState, 100, 0, 1, 50,'#AABBCC', 0, 0, null, new NumberFormatter('#0.0')));
        canvasState.addControl(new Label(1, 370, 180, canvasState, '#000', 'OSC1-Gain'));


        canvasState.addControl(new Knob(MASTERGAIN, 240, 60, 1, canvasState, 100, 0, 1, 50,'#AABBCC', 0, 0, null, new NumberFormatter('#0.0')));
        canvasState.addControl(new Label(1, 490, 100, canvasState, '#000', 'Mastergain'));


        canvasState.addControl(new Label(1, 0, 320, canvasState, '#000', 'ADSR-Envelope'));
        canvasState.addControl(new Knob(ADSR_A, 0, 180, 1, canvasState, 1, 0, 6, 30, '#AABBCC', 0, 0, null, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 30, 345, canvasState, '#000', 'A'));

        canvasState.addControl(new Knob(ADSR_D, 40, 180, 2, canvasState, 1, 0, 6, 30, '#AABBCC', 0, 0, null, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 110, 345, canvasState, '#000', 'D'));

        canvasState.addControl(new Knob(ADSR_S, 80, 180, 0.5,canvasState, 100, 0, 1, 30, '#AABBCC', 0, 0, null, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 190, 345, canvasState, '#000', 'S'));

        canvasState.addControl(new Knob(ADSR_R, 120, 180, 1, canvasState, 1, 0, 6, 30, '#AABBCC', 0, 0, null, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 270, 345, canvasState, '#000', 'R'));


        canvasState.addControl(new Label(1, 350, 320, canvasState, '#000', 'Filter'));
        canvasState.addControl(new Label(1, 350, 340, canvasState, '#000', 'Type'));
        radioGroup = new RadioGroup(FLT_TYPE, 350, 180, Synthesizer.FILTER_LOWPASS, canvasState);
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Lowpass", Synthesizer.FILTER_LOWPASS, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Bandpass", Synthesizer.FILTER_BANDPASS, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Highpass", Synthesizer.FILTER_HIGHPASS, '#000', '#FFF'));
        canvasState.addControl(radioGroup);

        canvasState.addControl(new Label(1, 450, 340, canvasState, '#000', 'Freq'));
        canvasState.addControl(new Fader(FLT_FREQUENCY, 450, 370, 22000, canvasState, 1, 10, 22000, 150, '#AABBCC', 0, 0, 0, new NumberFormatter('#0'), Fader.ORIENTATION_VERTICAL));

        canvasState.addControl(new Label(1, 530, 340, canvasState, '#000', 'Res'));
        canvasState.addControl(new Fader(FLT_RESONANCE, 530, 370, 0.0001, canvasState, 1, 0.0001, 50, 150, '#AABBCC', 0, 0, 0, new NumberFormatter('#0'), Fader.ORIENTATION_VERTICAL));

        function handleEvents() {
            var eventObject = canvasState.getBaseLayer().getAttr('event');
            var now = audioCtx.currentTime;

            if(typeof eventObject !== 'undefined' ) {
                if (eventObject.getType() == Event.TYPE_VALUE_CHANGED) {
                    switch (eventObject.getControlId()) {
                        case OSC1_WAVE:
                            synth.getOsc1().type = eventObject.getValue();
                            break;
                        case OSC1_TUNE:
                            synth.getOsc1().detune.setValueAtTime(eventObject.getValue() * 100,now);
                            break;
                        case OSC1_OCT:
                            synth.getOsc1().detune.setValueAtTime(eventObject.getValue() * 1200,now);
                            break;
                        case OSC1_GAIN:
                            synth.getOsc1Gain().gain.setValueAtTime(eventObject.getValue(),now);
                            break;
                        case OSC2_WAVE:
                            synth.getOsc2().type = eventObject.getValue();
                            break;
                        case OSC2_TUNE:
                            synth.getOsc2().detune.setValueAtTime(eventObject.getValue() * 100,now);
                            break;
                        case OSC2_OCT:
                            synth.getOsc2().detune.setValueAtTime(eventObject.getValue() * 1200,now);
                            break;
                        case OSC2_GAIN:
                            synth.getOsc2Gain().gain.setValueAtTime(eventObject.getValue(),now);
                            break;
                        case MASTERGAIN:
                            synth.getMasterGain().gain.setValueAtTime(eventObject.getValue(),now);
                            break;
                        case ADSR_A:
                            synth.setEnvelopeAttack(eventObject.getValue());
                            break;
                        case ADSR_D:
                            synth.setEnvelopeDecay(eventObject.getValue());
                            break;
                        case ADSR_S:
                            synth.setEnvelopeSustain(eventObject.getValue());
                            break;
                        case ADSR_R:
                            synth.setEnvelopeRelease(eventObject.getValue());
                            break;
                        case FLT_TYPE:
                            synth.getFilter().type = eventObject.getValue();
                            break
                        case FLT_FREQUENCY:
                            synth.getFilter().frequency.setValueAtTime(eventObject.getValue(),now);
                            break
                        case FLT_RESONANCE:
                            synth.getFilter().Q.setValueAtTime(eventObject.getValue(),now);
                            break
                    }
                }
            }
        }

        canvasState.getContainer().addEventListener("mousemove",
            function(evt) {
                if (canvasState.getPointerLocked()) {
                    handleEvents();
                }
            }
        );

        canvasState.getContainer().addEventListener("click", function(evt) { handleEvents() });

        var audioCtx = new webkitAudioContext();
        var synth = new Synthesizer(audioCtx);

        synth.init();

        window.addEventListener("keyup", function() {
            synth.noteOff();
        });

        window.addEventListener("keydown", function(e) {
            if(e.keyCode == 65) { //A C-5
                synth.noteOn(52);
            }
            if(e.keyCode == 87) { //W C#5/Db5
                synth.noteOn(53);
            }
            if(e.keyCode == 83) { //S D-5
                synth.noteOn(54);
            }
            if(e.keyCode == 69) { //E A#5/Bb5
                synth.noteOn(55);
            }
            if(e.keyCode == 68) { //D E-5
                synth.noteOn(56);
            }
            if(e.keyCode == 70) { //F F-5
                synth.noteOn(57);
            }
            if(e.keyCode == 84) { //T F#5/Gb5
                synth.noteOn(58);
            }
            if(e.keyCode == 71) { //G G-5
                synth.noteOn(59);
            }
            if(e.keyCode == 90) { //Z G#5/Ab5
                synth.noteOn(60);
            }
            if(e.keyCode == 72) { //H A-5
                synth.noteOn(61);
            }
            if(e.keyCode == 85) { //U A#5/Bb5
                synth.noteOn(62);
            }
            if(e.keyCode == 74) { //J B-5
                synth.noteOn(63);
            }
            if(e.keyCode == 75) { //K C-6
                synth.noteOn(64);
            }
        });
    }
);

/*
 this.low = audioCtx.createBiquadFilter();
 this.low.type = "lowshelf";
 this.low.frequency.value = 320.0;
 this.low.gain.value = 0.0;
 this.low.connect( this.xfadeGain );

 this.mid = audioCtx.createBiquadFilter();
 this.mid.type = "peaking";
 this.mid.frequency.value = 1000.0;
 this.mid.Q.value = 0.5;
 this.mid.gain.value = 0.0;
 this.mid.connect( this.low );

 this.high = audioCtx.createBiquadFilter();
 this.high.type = "highshelf";
 this.high.frequency.value = 3200.0;
 this.high.gain.value = 0.0;
 this.high.connect( this.mid );
 */
/*
requirejs.onError = function (err) {
    console.log(err.requireType);
    console.log('modules: ' + err.requireModules);
    console.dir(err);
    //throw err;
};
*/
