'use strict';

require.config({
    baseUrl: 'js/vendor',
    paths: {
        app:     '../app',
        mout:    'mout/src',
        //libs
        kinetic: 'kinetic.min'

    },
    packages: [
        {
            name:     'dejavu',
            location: 'js-dejavu/dist/amd/strict'
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
           'app/controls/layout/Label', 'app/utils/GlobalConstants',
           'app/controls/ui/envelope/Graph', 'app/controls/ui/envelope/Point'],
    function (Event, CanvasState, Knob, RadioGroup, RadioButton, Fader, Synthesizer, NumberFormatter, Label, GlobalConstants, EnvelopeGraph, EnvelopePoint) {

        var canvasState = new CanvasState(600, 800, 'syn');

        var radioGroup = new RadioGroup(GlobalConstants.CTRL_OSC1_WAVE, 0, 20, Synthesizer.WAVEFORM_SINE, canvasState);
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Sine", Synthesizer.WAVEFORM_SINE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Square", Synthesizer.WAVEFORM_SQUARE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Saw", Synthesizer.WAVEFORM_SAWTOOTH, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Triangle", Synthesizer.WAVEFORM_TRIANGLE, '#000', '#FFF'));
        canvasState.addControl(radioGroup);

        canvasState.addControl(new Label(1, 0, 20, canvasState, '#000', 'OSC1-Waveform'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC1_TUNE, 60, 20, 0, canvasState, 1, -12, 12, 50,'#AABBCC', 0, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 130, 20, canvasState, '#000', 'OSC1-Tune'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC1_OCT, 120, 20, 0, canvasState, 1, -4, 4, 50,'#AABBCC', 1, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 250, 20, canvasState, '#000', 'OSC1-Octave'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC1_GAIN, 180, 20, 1, canvasState, 100, 0, 1, 50,'#AABBCC', 0, 0, null, new NumberFormatter('#0.0')));
        canvasState.addControl(new Label(1, 370, 20, canvasState, '#000', 'OSC1-Gain'));


        canvasState.addControl(new Label(1, 0, 180, canvasState, '#000', 'OSC2-Waveform'));

        radioGroup = new RadioGroup(GlobalConstants.CTRL_OSC2_WAVE, 0, 100, Synthesizer.WAVEFORM_SINE, canvasState);
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Sine", Synthesizer.WAVEFORM_SINE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Square", Synthesizer.WAVEFORM_SQUARE, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Saw", Synthesizer.WAVEFORM_SAWTOOTH, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Triangle", Synthesizer.WAVEFORM_TRIANGLE, '#000', '#FFF'));
        canvasState.addControl(radioGroup);


        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC2_TUNE, 60, 100, 0, canvasState, 1, -12, 12, 50,'#AABBCC', 0, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 130, 180, canvasState, '#000', 'OSC1-Tune'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC2_OCT, 120, 100, 0, canvasState, 1, -4, 4, 50,'#AABBCC', 1, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 250, 180, canvasState, '#000', 'OSC1-Octave'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC2_GAIN, 180, 100, 1, canvasState, 100, 0, 1, 50,'#AABBCC', 0, 0, null, new NumberFormatter('#0.0')));
        canvasState.addControl(new Label(1, 370, 180, canvasState, '#000', 'OSC1-Gain'));


        canvasState.addControl(new Knob(GlobalConstants.CTRL_MASTERGAIN, 240, 60, 1, canvasState, 100, 0, 1, 50,'#AABBCC', 0, 0, null, new NumberFormatter('#0.0')));
        canvasState.addControl(new Label(1, 490, 100, canvasState, '#000', 'Mastergain'));


        canvasState.addControl(new Label(1, 0, 320, canvasState, '#000', 'ADSR-Envelope'));
        canvasState.addControl(new Knob(GlobalConstants.CTRL_ADSR_A, 0, 180, 1, canvasState, 1, 0, 6, 30, '#AABBCC', 0, 0, null, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 30, 345, canvasState, '#000', 'A'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_ADSR_D, 40, 180, 2, canvasState, 1, 0, 6, 30, '#AABBCC', 0, 0, null, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 110, 345, canvasState, '#000', 'D'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_ADSR_S, 80, 180, 0.5,canvasState, 100, 0, 1, 30, '#AABBCC', 0, 0, null, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 190, 345, canvasState, '#000', 'S'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_ADSR_R, 120, 180, 1, canvasState, 1, 0, 6, 30, '#AABBCC', 0, 0, null, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 270, 345, canvasState, '#000', 'R'));


        canvasState.addControl(new Label(1, 350, 320, canvasState, '#000', 'Filter'));
        canvasState.addControl(new Label(1, 350, 340, canvasState, '#000', 'Type'));
        radioGroup = new RadioGroup(GlobalConstants.CTRL_FLT_TYPE, 350, 180, Synthesizer.FILTER_LOWPASS, canvasState);
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Lowpass", Synthesizer.FILTER_LOWPASS, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Bandpass", Synthesizer.FILTER_BANDPASS, '#000', '#FFF'));
        radioGroup.addButton(new RadioButton(0, 0, 0, canvasState, "Highpass", Synthesizer.FILTER_HIGHPASS, '#000', '#FFF'));
        canvasState.addControl(radioGroup);

        canvasState.addControl(new Label(1, 450, 340, canvasState, '#000', 'Freq'));
        canvasState.addControl(new Fader(GlobalConstants.CTRL_FLT_FREQUENCY, 450, 370, 22050, canvasState, 1, 60, 22050, 150, '#AABBCC', 0, 0, 0, new NumberFormatter('#0'), Fader.ORIENTATION_VERTICAL));

        canvasState.addControl(new Label(1, 530, 340, canvasState, '#000', 'Res'));
        canvasState.addControl(new Fader(GlobalConstants.CTRL_FLT_RESONANCE, 530, 370, 0.0001, canvasState, 1, 0.0001, 50, 150, '#AABBCC', 0, 0, 0, new NumberFormatter('#0'), Fader.ORIENTATION_VERTICAL));


        var envelopeControl = new EnvelopeGraph(GlobalConstants.CTRL_ENVELOPE, 20, 500, canvasState, 8);

        var envelopePoint   = new EnvelopePoint(GlobalConstants.CTRL_ATTACK_POINT, canvasState, 1, 2, '#AABBCC', envelopeControl);
        envelopeControl.addPoint(envelopePoint);

        envelopePoint       = new EnvelopePoint(GlobalConstants.CTRL_DECAY_POINT, canvasState, 0.7, 5, '#AABBCC', envelopeControl);
        envelopeControl.addPoint(envelopePoint);

        envelopePoint       = new EnvelopePoint(GlobalConstants.CTRL_SUSTAIN_POINT, canvasState, 0.4, 6, '#AABBCC', envelopeControl);
        envelopeControl.addPoint(envelopePoint);

        envelopePoint       = new EnvelopePoint(GlobalConstants.CTRL_RELEASE_POINT, canvasState, 0.2, 7, '#AABBCC', envelopeControl);
        envelopeControl.addPoint(envelopePoint);

        envelopePoint       = new EnvelopePoint(GlobalConstants.CTRL_RELEASE_POINT_END, canvasState, 0.2, 8, '#AABBCC', envelopeControl);
        envelopeControl.addPoint(envelopePoint);

        canvasState.addControl(envelopeControl);

        function handleEvents() {
            var eventObject = canvasState.getBaseLayer().getAttr('event');
            var now = audioCtx.currentTime;

            if(typeof eventObject !== 'undefined' ) {
                if (eventObject.getType() == Event.TYPE_VALUE_CHANGED) {
                    switch (eventObject.getControlId()) {
                        case GlobalConstants.CTRL_OSC1_WAVE:
                            synth.getOsc1().type = eventObject.getValue();
                            break;
                        case GlobalConstants.CTRL_OSC1_TUNE:
                            synth.getOsc1().detune.setValueAtTime(eventObject.getValue() * 100,now);
                            break;
                        case GlobalConstants.CTRL_OSC1_OCT:
                            synth.getOsc1().detune.setValueAtTime(eventObject.getValue() * 1200,now);
                            break;
                        case GlobalConstants.CTRL_OSC1_GAIN:
                            synth.getOsc1Gain().gain.setValueAtTime(eventObject.getValue(),now);
                            break;
                        case GlobalConstants.CTRL_OSC2_WAVE:
                            synth.getOsc2().type = eventObject.getValue();
                            break;
                        case GlobalConstants.CTRL_OSC2_TUNE:
                            synth.getOsc2().detune.setValueAtTime(eventObject.getValue() * 100,now);
                            break;
                        case GlobalConstants.CTRL_OSC2_OCT:
                            synth.getOsc2().detune.setValueAtTime(eventObject.getValue() * 1200,now);
                            break;
                        case GlobalConstants.CTRL_OSC2_GAIN:
                            synth.getOsc2Gain().gain.setValueAtTime(eventObject.getValue(),now);
                            break;
                        case GlobalConstants.CTRL_MASTERGAIN:
                            synth.getMasterGain().gain.setValueAtTime(eventObject.getValue(),now);
                            break;
                        case GlobalConstants.CTRL_ADSR_A:
                            synth.setEnvelopeAttackTime(eventObject.getValue());
                            break;
                        case GlobalConstants.CTRL_ADSR_D:
                            synth.setEnvelopeDecayTime(eventObject.getValue());
                            break;
                        case GlobalConstants.CTRL_ADSR_S:
                            synth.setEnvelopeSustainStartGain(eventObject.getValue());
                            break;
                        case GlobalConstants.CTRL_ADSR_R:
                            synth.setEnvelopeReleaseTime(eventObject.getValue());
                            break;
                        case GlobalConstants.CTRL_FLT_TYPE:
                            synth.getFilter().type = eventObject.getValue();
                            break;
                        case GlobalConstants.CTRL_FLT_FREQUENCY:
                            synth.getFilter().frequency.setValueAtTime(eventObject.getValue(),now);
                            break;
                        case GlobalConstants.CTRL_FLT_RESONANCE:
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

        canvasState.getStage().on("dragmove",
            function(evt) {
                handleEvents();
            }
        );

        canvasState.getContainer().addEventListener("click", function(evt) { handleEvents() });

        var audioCtx = new webkitAudioContext();
        var synth    = new Synthesizer(audioCtx);

        synth.init();

        window.addEventListener("keyup", function() {
            synth.noteOff();
        });

        window.addEventListener("keydown", function(e) {
            synth.noteOn(e.keyCode);
        });
    }
);
