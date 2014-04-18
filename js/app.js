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
           'app/audio/Synthesizer', 'app/utils/formatter/NumberFormatter'],
    function (Event, CanvasState, Knob, RadioGroup, RadioButton, Fader, Synthesizer, NumberFormatter) {

        var MASTERGAIN = 1;
        var OSC1_WAVE  = 2;
        var OSC1_TUNE  = 3;
        var OSC1_GAIN  = 4;
        var OSC1_OCT   = 5;
        var OSC2_WAVE  = 6;
        var OSC2_TUNE  = 7;
        var OSC2_GAIN  = 8;
        var OSC2_OCT   = 9;
        var ADSR_A     = 10;
        var ADSR_D     = 11;
        var ADSR_S     = 12;
        var ADSR_R     = 13;

        var TEST_FADER = 14;


        var canvasState = new CanvasState(600, 200);
        //canvasState.addControl(new Knob(OSC1_TUNE, 0, 0, 0, canvasState, null, 1, -12, 12, 50,'#AABBCC', 0, 0.5, 0));

        var radioGroup = new RadioGroup(OSC1_WAVE, 0, 0, Synthesizer.WAVEFORMS_SINE, canvasState, 'OSC1 Waveform');
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Sine", Synthesizer.WAVEFORMS_SINE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Square", Synthesizer.WAVEFORM_SQUARE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Saw", Synthesizer.WAVEFORM_SAWTOOTH, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Triangle", Synthesizer.WAVEFORM_TRIANGLE, '#000', '#FFF'));
        canvasState.addControl(radioGroup);
        
        canvasState.addControl(new Knob(OSC1_TUNE, 60, 0, 0, canvasState, 'OSC1 Tune', 1, -12, 12, 50,'#AABBCC', 0, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Knob(OSC1_OCT, 120, 0, 0, canvasState, 'OSC1 Octave', 1, -4, 4, 50,'#AABBCC', 1, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Knob(OSC1_GAIN, 180, 0, 1, canvasState, 'OSC1 Gain', 100, 0, 1, 50,'#AABBCC', 0, 0, null, new NumberFormatter('#0.0')));

        canvasState.getBaseLayer().on("mousemove dblclick mouseclick", function(evt) {
            var eventObject = this.getAttr('event');
            if(typeof eventObject !== 'undefined') {
                if (eventObject.getType() == Event.TYPE_VALUE_CHANGED) {
                    switch (eventObject.getControlId()) {
                        case OSC1_TUNE:
                            break;
                    }
                }
            }
        });

        /*


        

        var radioGroup = new RadioGroup(OSC2_WAVE, 0, 150, Synthesizer.WAVEFORMS_SINE, canvasState, 'OCS2 Waveform', 10);
        radioGroup.addButton(new RadioButton(canvasState, "Sine", Synthesizer.WAVEFORMS_SINE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(canvasState, "Square", Synthesizer.WAVEFORM_SQUARE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(canvasState, "Saw", Synthesizer.WAVEFORM_SAWTOOTH, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(canvasState, "Triangle", Synthesizer.WAVEFORM_TRIANGLE, '#000', '#FFF'));
        canvasState.addControl(radioGroup);

        canvasState.addControl(new Knob(OSC2_TUNE, 130, 150, 0, canvasState, 'OSC2 Tune', 1, -12, 12, 50,'#AABBCC', 0, 0.5, 0));
        canvasState.addControl(new Knob(OSC2_OCT, 260, 150, 0, canvasState, 'OSC2 Octave', 1, -4, 4, 50,'#AABBCC', 1, 0.5, 0));
        canvasState.addControl(new Knob(OSC2_GAIN, 390, 150, 1, canvasState, 'OSC2 Gain', 100, 0, 1, 50,'#AABBCC', 0, 0, null));

        canvasState.addControl(new Knob(MASTERGAIN, 520, 0, 1, canvasState, 'MASTER Gain', 100, 0, 1, 50,'#AABBCC', 0, 0, null));

        canvasState.addControl(new Knob(ADSR_A, 520, 150, 1, canvasState, 'A', 1, 0, 6, 30, '#AABBCC', 0, 0, null));
        canvasState.addControl(new Knob(ADSR_D, 590, 150, 2, canvasState, 'D', 1, 0, 6, 30, '#AABBCC', 0, 0, null));
        canvasState.addControl(new Knob(ADSR_S, 660, 150, 0.5, canvasState, 'S', 100, 0, 1, 30, '#AABBCC', 0, 0, null));
        canvasState.addControl(new Knob(ADSR_R, 730, 150, 1, canvasState, 'R', 1, 0, 6, 30, '#AABBCC', 0, 0, null));



        //(id, x, y, value, canvasState, label, valueDspMult, minValue, maxValue, length, color, snapStep, snapDistance, doubleClickSnapValue, orientation)

        canvasState.addControl(new Fader(TEST_FADER, 0, 350, 3, canvasState, 'Testfader', 1, 0, 10, 200, '#AABBCC', null, null, null, Fader.ORIENTATION_HORIZONTAL));


        var audioCtx = new webkitAudioContext();
        var synth = new Synthesizer(audioCtx);

        synth.init();

        canvasState.addListener("valuechanged", function(eventArgs) {
            var now = audioCtx.currentTime;

            switch(eventArgs.id) {
                case OSC1_WAVE:
                    synth.getOsc1().type = eventArgs.value;
                    break;
                case OSC1_TUNE:
                    synth.getOsc1().detune.setValueAtTime(eventArgs.value * 100,now);
                    break;
                case OSC1_OCT:
                    synth.getOsc1().detune.setValueAtTime(eventArgs.value * 1200,now);
                    break;
                case OSC1_GAIN:
                    synth.getOsc1Gain().gain.setValueAtTime(eventArgs.value,now);
                    break;
                case OSC2_WAVE:
                    synth.getOsc2().type = eventArgs.value;
                    break;
                case OSC2_TUNE:
                    synth.getOsc2().detune.setValueAtTime(eventArgs.value * 100,now);
                    break;
                case OSC2_OCT:
                    synth.getOsc2().detune.setValueAtTime(eventArgs.value * 1200,now);
                    break;
                case OSC2_GAIN:
                    synth.getOsc2Gain().gain.setValueAtTime(eventArgs.value,now);
                    break;
                case MASTERGAIN:
                    synth.getMasterGain().gain.setValueAtTime(eventArgs.value,now);
                    break;
                case ADSR_A:
                    synth.setEnvelopeAttack(eventArgs.value);
                    break;
                case ADSR_D:
                    synth.setEnvelopeDecay(eventArgs.value);
                    break;
                case ADSR_S:
                    synth.setEnvelopeSustain(eventArgs.value);
                    break;
                case ADSR_R:
                    synth.setEnvelopeRelease(eventArgs.value);
                    break;
            }


        });

        window.addEventListener("keyup", function() {
            synth.noteOff();
        });

        window.addEventListener("keydown", function(e) {
            if(e.keyCode == 65) { //A
                synth.noteOn(52);
            }
            if(e.keyCode == 87) { //W
                synth.noteOn(53);
            }
            if(e.keyCode == 83) { //S
                synth.noteOn(54);
            }
            if(e.keyCode == 69) { //E
                synth.noteOn(55);
            }
            if(e.keyCode == 68) { //D
                synth.noteOn(56);
            }
            if(e.keyCode == 70) { //F
                synth.noteOn(57);
            }
            if(e.keyCode == 84) { //T
                synth.noteOn(58);
            }
            if(e.keyCode == 71) { //G
                synth.noteOn(59);
            }
            if(e.keyCode == 90) { //Z
                synth.noteOn(60);
            }
            if(e.keyCode == 84) { //H
                synth.noteOn(61);
            }
            if(e.keyCode == 72) { //U
                synth.noteOn(62);
            }
            if(e.keyCode == 85) { //J
                synth.noteOn(63);
            }
            if(e.keyCode == 74) { //K
                synth.noteOn(64);
            }
            if(e.keyCode == 75) { //L
                synth.noteOn(65);
            }
        });

        */
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
