'use strict';

require.config({
    baseUrl: 'js/lib',
    paths: {
        app:    '../app',
        mout:   'mout/src'
    },
    packages: [
        {
            name: 'dejavu',
            location: 'dejavu/dist/amd/strict'
        }
    ]
});

// Start the main app logic.
requirejs(['app/canvas/CanvasState', 'app/controls/Knob', 'app/controls/RadioGroup', 'app/controls/RadioButton', 'app/audio/Synthesizer', 'app/audio/utils/Audio'],
    function (CanvasState, Knob, RadioGroup, RadioButton, Synthesizer, AudioUtils) {

        var MASTERGAIN = 1;
        var OSC1_WAVE = 2;
        var OSC1_TUNE = 3;
        var OSC1_GAIN = 4;
        var OSC1_OCT = 5;
        var OSC2_WAVE = 6;
        var OSC2_TUNE = 7;
        var OSC2_GAIN = 8;
        var OSC2_OCT = 9;
        var ADSR_A = 10;
        var ADSR_D = 11;
        var ADSR_S = 12;
        var ADSR_R = 13;



        var canvas = document.createElement('canvas');
        canvas.setAttribute('id','cvs');

        document.body.appendChild(canvas); // adds the canvas to the body element
        var canvasState = new CanvasState(canvas, 800, 400);

        //(id, x, y, value, canvasState, label, valueDspMult,  minValue, maxValue, radius, color, snapStep, snapDistance, doubleClickSnapValue) {

        var radioGroup = new RadioGroup(OSC1_WAVE, 0, 0, Synthesizer.WAVEFORMS_SINE, canvasState, 'OSC1 Waveform', 10);
        radioGroup.addButton(new RadioButton(canvasState, "Sine", Synthesizer.WAVEFORMS_SINE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(canvasState, "Square", Synthesizer.WAVEFORM_SQUARE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(canvasState, "Saw", Synthesizer.WAVEFORM_SAWTOOTH, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(canvasState, "Triangle", Synthesizer.WAVEFORM_TRIANGLE, '#000', '#FFF'));
        canvasState.addControl(radioGroup);

        canvasState.addControl(new Knob(OSC1_TUNE, 130, 0, 0, canvasState, 'OSC1 Tune', 1, -12, 12, 50,'#AABBCC', 1, 0.5, 0));
        canvasState.addControl(new Knob(OSC1_OCT, 260, 0, 0, canvasState, 'OSC1 Octave', 1, -12, 12, 50,'#AABBCC', 1, 0.5, 0));
        canvasState.addControl(new Knob(OSC1_GAIN, 390, 0, 1, canvasState, 'OSC1 Gain', 100, 0, 1, 50,'#AABBCC', 0, 0, null));

        var radioGroup = new RadioGroup(OSC2_WAVE, 0, 150, Synthesizer.WAVEFORMS_SINE, canvasState, 'OCS2 Waveform', 10);
        radioGroup.addButton(new RadioButton(canvasState, "Sine", Synthesizer.WAVEFORMS_SINE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(canvasState, "Square", Synthesizer.WAVEFORM_SQUARE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(canvasState, "Saw", Synthesizer.WAVEFORM_SAWTOOTH, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(canvasState, "Triangle", Synthesizer.WAVEFORM_TRIANGLE, '#000', '#FFF'));
        canvasState.addControl(radioGroup);

        canvasState.addControl(new Knob(OSC2_TUNE, 130, 150, 0, canvasState, 'OSC2 Tune', 1, -12, 12, 50,'#AABBCC', 1, 0.5, 0));
        canvasState.addControl(new Knob(OSC2_OCT, 260, 150, 0, canvasState, 'OSC2 Octave', 1, -12, 12, 50,'#AABBCC', 1, 0.5, 0));
        canvasState.addControl(new Knob(OSC2_GAIN, 390, 150, 1, canvasState, 'OSC2 Gain', 100, 0, 1, 50,'#AABBCC', 0, 0, null));


        canvasState.addControl(new Knob(MASTERGAIN, 520, 0, 1, canvasState, 'MASTER Gain', 100, 0, 1, 50,'#AABBCC', 0, 0, null));


        canvasState.addControl(new Knob(ADSR_A, 520, 150, 1, canvasState, 'A', 1, 0, 6, 30, '#AABBCC', 0, 0, null));
        canvasState.addControl(new Knob(ADSR_D, 590, 150, 2, canvasState, 'D', 1, 0, 6, 30, '#AABBCC', 0, 0, null));
        canvasState.addControl(new Knob(ADSR_S, 660, 150, 1, canvasState, 'S', 1, 0, 6, 30, '#AABBCC', 0, 0, null));
        canvasState.addControl(new Knob(ADSR_R, 730, 150, 1, canvasState, 'R', 1, 0, 6, 30, '#AABBCC', 0, 0, null));


        var audioCtx = new webkitAudioContext();
        var synth = new Synthesizer(audioCtx);

        synth.init();

        canvasState.addListener("valuechanged", function(eventArgs) {
            console.log(eventArgs.id + ' ' + eventArgs.value)
            switch(eventArgs.id) {
                case OSC1_WAVE:
                    synth.getOsc1().type = eventArgs.value;
                    break;
                case OSC1_TUNE:
                    synth.getOsc1().detune.value = eventArgs.value;
                    break;
                case OSC1_OCT:
                    synth.getOsc1().detune.value += eventArgs.value * 100;
                    break;
                case OSC1_GAIN:
                    synth.getOsc1Gain().gain.value = eventArgs.value;
                    break;
                case OSC2_WAVE:
                    synth.getOsc2().type = eventArgs.value;
                    //synth.masterGain.gain.value = value;
                    break;
                case OSC2_TUNE:
                    synth.getOsc2().detune.value = eventArgs.value;
                    break;
                case OSC2_OCT:
                    synth.getOsc2().detune.value += eventArgs.value * 100;
                    break;
                case OSC2_GAIN:
                    synth.getOsc2Gain().gain.value = eventArgs.value;
                    break;
                case MASTERGAIN:
                    synth.getMasterGain().gain.value = eventArgs.value;
                    break;
            }



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

        });

        window.addEventListener("keyup", function() {
            synth.getOsc1().frequenzy = 0;
            synth.getOsc2().frequenzy = 0;
        });

        window.addEventListener("keydown", function(e) {
            if(e.keyCode == 65) {
                synth.getOsc1().frequenzy.value = AudioUtils.calcFreqByKey(52);
                synth.getOsc2().frequenzy.value = AudioUtils.calcFreqByKey(52);
            }
            if(e.keyCode == 87) {
                myState.selection.value = AudioUtils.calcFreqByKey(53);
                synth.getOsc1().frequenzy.value = AudioUtils.calcFreqByKey(52);
                synth.getOsc2().frequenzy.value = AudioUtils.calcFreqByKey(52);
            }
            if(e.keyCode == 83) {
                myState.selection.value = AudioUtils.calcFreqByKey(54);
                synth.getOsc1().frequenzy.value = AudioUtils.calcFreqByKey(52);
                synth.getOsc2().frequenzy.value = AudioUtils.calcFreqByKey(52);
            }
            if(e.keyCode == 69) {
                myState.selection.value = AudioUtils.calcFreqByKey(55);
                synth.getOsc1().frequenzy.value = AudioUtils.calcFreqByKey(52);
                synth.getOsc2().frequenzy.value = AudioUtils.calcFreqByKey(52);
            }
            if(e.keyCode == 68) {
                myState.selection.value = AudioUtils.calcFreqByKey(56);
            }
            if(e.keyCode == 70) {
                myState.selection.value = AudioUtils.calcFreqByKey(57);
            }
            if(e.keyCode == 84) {
                myState.selection.value = AudioUtils.calcFreqByKey(58);
            }
            if(e.keyCode == 71) {
                myState.selection.value = AudioUtils.calcFreqByKey(59);
            }
            if(e.keyCode == 90) {
                myState.selection.value = AudioUtils.calcFreqByKey(60);
            }
            if(e.keyCode == 84) {
                myState.selection.value = AudioUtils.calcFreqByKey(61);
            }
            if(e.keyCode == 72) {
                myState.selection.value = AudioUtils.calcFreqByKey(62);
            }
            if(e.keyCode == 85) {
                myState.selection.value = AudioUtils.calcFreqByKey(63);
            }
            if(e.keyCode == 74) {
                myState.selection.value = AudioUtils.calcFreqByKey(64);
            }
            if(e.keyCode == 75) {
                myState.selection.value = AudioUtils.calcFreqByKey(65);
            }
        });
    }
);
