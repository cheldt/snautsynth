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

        var canvasState = new CanvasState(600, 550, 'syn');

        var radioGroup = new RadioGroup(GlobalConstants.CTRL_OSC1_WAVE, 0, 20, Synthesizer.WAVEFORM_SINE, canvasState);
        radioGroup.addControl(new RadioButton(0, 0, 0, canvasState, "Sine", Synthesizer.WAVEFORM_SINE, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, 0, 0, canvasState, "Square", Synthesizer.WAVEFORM_SQUARE, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, 0, 0, canvasState, "Saw", Synthesizer.WAVEFORM_SAWTOOTH, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, 0, 0, canvasState, "Triangle", Synthesizer.WAVEFORM_TRIANGLE, '#000', '#FFF'));
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
        radioGroup.addControl(new RadioButton(0, 0, 0, canvasState, "Sine", Synthesizer.WAVEFORM_SINE, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, 0, 0, canvasState, "Square", Synthesizer.WAVEFORM_SQUARE, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, 0, 0, canvasState, "Saw", Synthesizer.WAVEFORM_SAWTOOTH, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, 0, 0, canvasState, "Triangle", Synthesizer.WAVEFORM_TRIANGLE, '#000', '#FFF'));
        canvasState.addControl(radioGroup);


        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC2_TUNE, 60, 100, 0, canvasState, 1, -12, 12, 50,'#AABBCC', 0, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 130, 180, canvasState, '#000', 'OSC1-Tune'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC2_OCT, 120, 100, 0, canvasState, 1, -4, 4, 50,'#AABBCC', 1, 0.5, 0, new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, 250, 180, canvasState, '#000', 'OSC1-Octave'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC2_GAIN, 180, 100, 1, canvasState, 100, 0, 1, 50,'#AABBCC', 0, 0, null, new NumberFormatter('#0.0')));
        canvasState.addControl(new Label(1, 370, 180, canvasState, '#000', 'OSC1-Gain'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_MASTERGAIN, 240, 60, 0.5, canvasState, 100, 0, 0.5, 50,'#AABBCC', 0, 0, null, new NumberFormatter('#0.0')));
        canvasState.addControl(new Label(1, 490, 100, canvasState, '#000', 'Mastergain'));

        canvasState.addControl(new Label(1, 350, 320, canvasState, '#000', 'Filter'));
        canvasState.addControl(new Label(1, 350, 340, canvasState, '#000', 'Type'));

        radioGroup = new RadioGroup(GlobalConstants.CTRL_FLT_TYPE, 350, 180, Synthesizer.FILTER_LOWPASS, canvasState);
        radioGroup.addControl(new RadioButton(0, 0, 0, canvasState, "Lowpass", Synthesizer.FILTER_LOWPASS, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, 0, 0, canvasState, "Bandpass", Synthesizer.FILTER_BANDPASS, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, 0, 0, canvasState, "Highpass", Synthesizer.FILTER_HIGHPASS, '#000', '#FFF'));
        canvasState.addControl(radioGroup);

        canvasState.addControl(new Label(1, 450, 340, canvasState, '#000', 'Freq'));
        canvasState.addControl(new Fader(GlobalConstants.CTRL_FLT_FREQUENCY, 450, 370, 22050, canvasState, 1, 60, 22050, 100, '#AABBCC', 0, 0, 0, new NumberFormatter('#0'), Fader.ORIENTATION_VERTICAL));

        canvasState.addControl(new Label(1, 530, 340, canvasState, '#000', 'Res'));
        canvasState.addControl(new Fader(GlobalConstants.CTRL_FLT_RESONANCE, 530, 370, 0.0001, canvasState, 1, 0.0001, 50, 100, '#AABBCC', 0, 0, 0, new NumberFormatter('#0'), Fader.ORIENTATION_VERTICAL));


        canvasState.addControl(new Label(1, 0, 320, canvasState, '#000', 'ADSR-Envelope'));
        var envelopeControl = new EnvelopeGraph(GlobalConstants.CTRL_ENVELOPE, 20, 350, canvasState, 8);

        var envelopePoint   = new EnvelopePoint(GlobalConstants.CTRL_ATTACK_POINT, {'gain' : 1, 'time' : 1}, canvasState, '#AABBCC', envelopeControl);
        envelopeControl.addControl(envelopePoint);

        envelopePoint       = new EnvelopePoint(GlobalConstants.CTRL_DECAYTIME_SUSTAINGAIN_POINT, {'gain' : 1, 'time' : 3}, canvasState, '#AABBCC', envelopeControl);
        envelopeControl.addControl(envelopePoint);

        envelopePoint       = new EnvelopePoint(GlobalConstants.CTRL_RELEASE_POINT, {'gain' : 0.2, 'time' : 7}, canvasState, '#AABBCC', envelopeControl);
        envelopeControl.addControl(envelopePoint);

        canvasState.addControl(envelopeControl);



        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioCtx        = new window.AudioContext();
        var synth           = new Synthesizer(audioCtx);

        synth.init();

        canvasState.getContainer().addEventListener(
            "click",
            function(evt) {
                var eventObject = canvasState.getBaseLayer().getAttr('event');
                synth.processEventObject(eventObject, canvasState);
            }
        );

        canvasState.getContainer().addEventListener(
            "mousemove",
            function(evt) {
                if (canvasState.getPointerLocked()) {
                    var eventObject = canvasState.getBaseLayer().getAttr('event');
                    synth.processEventObject(eventObject, canvasState);
                }
            }
        );

        canvasState.getStage().on(
            "dragmove",
            function(evt) {
                var eventObject = canvasState.getBaseLayer().getAttr('event');
                synth.processEventObject(eventObject, canvasState);
            }
        );

        window.addEventListener("keyup", function() { synth.noteOff(); });

        window.addEventListener("keydown", function(e) { synth.noteOn(e.keyCode); });
    }
);
