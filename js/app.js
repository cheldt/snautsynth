'use strict';

require.config({
    baseUrl: 'js/vendor',
    paths: {
        app:     '../app',
        mout:    'mout/src',
        //libs
        kinetic: 'kinetic/kinetic.min'

    },
    packages: [
        {
            name:     'dejavu',
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
requirejs(
    [
        'app/event/Event',
        'app/canvas/CanvasState',
        'app/control/ui/rangecontrol/Knob',
        'app/control/ui/RadioGroup',
        'app/control/ui/RadioButton',
        'app/control/ui/rangecontrol/Fader',
        'app/audio/Synthesizer',
        'app/utils/formatter/NumberFormatter',
        'app/control/layout/Label',
        'app/utils/GlobalConstants',
        'app/control/ui/envelope/Graph',
        'app/control/ui/envelope/Point',
        'app/datatype/NumberRange',
        'app/utils/Position',
        'app/control/ui/rangecontrol/SnapOptions',
        'app/factory/control/layout/Label',
        'app/factory/control/ui/RadioGroup',
        'app/factory/control/ui/rangecontrol/Knob'
    ],
    function (
        Event,
        CanvasState,
        Knob,
        RadioGroup,
        RadioButton,
        Fader,
        Synthesizer,
        NumberFormatter,
        Label,
        GlobalConstants,
        EnvelopeGraph,
        EnvelopePoint,
        NumberRange,
        Position,
        SnapOptions,
        LabelFactory,
        RadioGroupFactory,
        KnobFactory
    ) {

        var canvasState = new CanvasState(600, 550, 'syn');


        var factories = {};
        factories[GlobalConstants.CLASS_TYPE_BUTTON]     = KnobFactory;
        factories[GlobalConstants.CLASS_TYPE_LABEL]      = LabelFactory;
        factories[GlobalConstants.CLASS_TYPE_RADIOGROUP] = RadioGroupFactory;

        var controlOptions = [
            {
                id:                     GlobalConstants.CTRL_MASTERGAIN,
                type:                   GlobalConstants.CLASS_TYPE_BUTTON,
                position:               {x: 240, y: 60},
                value:                  0.5,
                valueDisplayMultiplier: 100,
                valueRange:             {min: 0, max: 1},
                radius:                 50,
                color:                  '#AABBCC',
                snapOptions:            null,
                numberFormat:           '#0.0'
            },
            {
                id:       -1,
                type:     GlobalConstants.CLASS_TYPE_LABEL,
                position: {x: 0, y: 20},
                color:    '#000',
                text:     'OSC1-Waveform'
            },
            {
                id:           GlobalConstants.CTRL_OSC1_WAVE,
                type:         GlobalConstants.CLASS_TYPE_RADIOGROUP,
                position:     {x: 0, y: 20},
                value:        Synthesizer.WAVEFORM_SINE,
                radioButtons: [
                    {
                        id:           0,
                        type:         GlobalConstants.CLASS_TYPE_RADIOBUTTON,
                        position:     {x: 0, y: 0},
                        label:        'Sine',
                        value:        Synthesizer.WAVEFORM_SINE,
                        color:        '#000',
                        checkedColor: '#FFF'
                    },
                    {
                        id:           0,
                        type:         GlobalConstants.CLASS_TYPE_RADIOBUTTON,
                        position:     {x: 0, y: 0},
                        label:        'Square',
                        value:        Synthesizer.WAVEFORM_SQUARE,
                        color:        '#000',
                        checkedColor: '#FFF'
                    },
                    {
                        id:           0,
                        type:         GlobalConstants.CLASS_TYPE_RADIOBUTTON,
                        position:     {x: 0, y: 0},
                        label:        'Saw',
                        value:        Synthesizer.WAVEFORM_SAWTOOTH,
                        color:        '#000',
                        checkedColor: '#FFF'
                    },
                    {
                        id:           0,
                        type:         GlobalConstants.CLASS_TYPE_RADIOBUTTON,
                        position:     {x: 0, y: 0},
                        label:        'Triangle',
                        value:        Synthesizer.WAVEFORM_TRIANGLE,
                        color:        '#000',
                        checkedColor: '#FFF'
                    }
                ]
            },
            {
                id:                     GlobalConstants.CTRL_OSC1_TUNE,
                type:                   GlobalConstants.CLASS_TYPE_BUTTON,
                position:               {x: 60, y: 20},
                value:                  0,
                valueDisplayMultiplier: 1,
                valueRange:             {min: -12, max: 12},
                radius:                 50,
                color:                  '#AABBCC',
                snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0, snapStep: 0.5},
                numberFormat:           '#0.0'
            },
        ];

        controlOptions.forEach(function(controlOption) {
            if (factories.hasOwnProperty(controlOption.type)) {
                var factory = new factories[controlOption.type]();
                canvasState.addControl(factory.create(canvasState, controlOption));
            }
        });

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC1_TUNE, new Position(60, 20), 0, canvasState, 1, new NumberRange(-12, 12), 50,'#AABBCC', new SnapOptions(0, 0, 0.5), new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, new Position(130, 20), canvasState, '#000', 'OSC1-Tune'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC1_OCT, new Position(120, 20), 0, canvasState, 1, new NumberRange(-4, 4), 50,'#AABBCC', new SnapOptions(0, 0.5, 1), new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, new Position(250, 20), canvasState, '#000', 'OSC1-Octave'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC1_GAIN, new Position(180, 20), 1, canvasState, 100, new NumberRange(0, 1), 50,'#AABBCC', null, new NumberFormatter('#0.0')));
        canvasState.addControl(new Label(1, new Position(370, 20), canvasState, '#000', 'OSC1-Gain'));

        canvasState.addControl(new Label(1, new Position(0, 180), canvasState, '#000', 'OSC2-Waveform'));

        var radioGroup = new RadioGroup(GlobalConstants.CTRL_OSC2_WAVE, new Position(0, 100), Synthesizer.WAVEFORM_SINE, canvasState);
        radioGroup.addControl(new RadioButton(0, new Position(0, 0), canvasState, "Sine", Synthesizer.WAVEFORM_SINE, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, new Position(0, 0), canvasState, "Square", Synthesizer.WAVEFORM_SQUARE, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, new Position(0, 0), canvasState, "Saw", Synthesizer.WAVEFORM_SAWTOOTH, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, new Position(0, 0), canvasState, "Triangle", Synthesizer.WAVEFORM_TRIANGLE, '#000', '#FFF'));
        canvasState.addControl(radioGroup);

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC2_TUNE, new Position(60, 100), 0, canvasState, 1, new NumberRange(-12, 12), 50,'#AABBCC', new SnapOptions(0, 0, 0.5), new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, new Position(130, 180), canvasState, '#000', 'OSC2-Tune'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC2_OCT, new Position(120, 100), 0, canvasState, 1, new NumberRange(-4, 4), 50,'#AABBCC', new SnapOptions(0, 0.5, 1), new NumberFormatter('#0')));
        canvasState.addControl(new Label(1, new Position(250, 180), canvasState, '#000', 'OSC2-Octave'));

        canvasState.addControl(new Knob(GlobalConstants.CTRL_OSC2_GAIN, new Position(180, 100), 1, canvasState, 100, new NumberRange(0, 1), 50,'#AABBCC', null, new NumberFormatter('#0.0')));
        canvasState.addControl(new Label(1, new Position(370, 180), canvasState, '#000', 'OSC2-Gain'));

        //canvasState.addControl(new Knob(GlobalConstants.CTRL_MASTERGAIN, new Position(240, 60), 0.5, canvasState, 100, new NumberRange(0, 0.5), 50,'#AABBCC', null, new NumberFormatter('#0.0')));
        canvasState.addControl(new Label(1, new Position(490, 100), canvasState, '#000', 'Mastergain'));

        canvasState.addControl(new Label(1, new Position(350, 320), canvasState, '#000', 'Filter'));
        canvasState.addControl(new Label(1, new Position(350, 340), canvasState, '#000', 'Type'));

        radioGroup = new RadioGroup(GlobalConstants.CTRL_FLT_TYPE, new Position(350, 180), Synthesizer.FILTER_LOWPASS, canvasState);
        radioGroup.addControl(new RadioButton(0, new Position(0, 0), canvasState, "Lowpass", Synthesizer.FILTER_LOWPASS, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, new Position(0, 0), canvasState, "Bandpass", Synthesizer.FILTER_BANDPASS, '#000', '#FFF'));
        radioGroup.addControl(new RadioButton(0, new Position(0, 0), canvasState, "Highpass", Synthesizer.FILTER_HIGHPASS, '#000', '#FFF'));
        canvasState.addControl(radioGroup);

        canvasState.addControl(new Label(1, new Position(450, 340), canvasState, '#000', 'Freq'));
        canvasState.addControl(new Fader(GlobalConstants.CTRL_FLT_FREQUENCY, new Position(450, 370), 22050, canvasState, 1, new NumberRange(60, 22050), 100, '#AABBCC', null, new NumberFormatter('#0'), Fader.ORIENTATION_VERTICAL));

        canvasState.addControl(new Label(1, new Position(530, 340), canvasState, '#000', 'Res'));
        canvasState.addControl(new Fader(GlobalConstants.CTRL_FLT_RESONANCE, new Position(530, 370), 0.0001, canvasState, 1, new NumberRange(0.0001, 50), 100, '#AABBCC', null, new NumberFormatter('#0'), Fader.ORIENTATION_VERTICAL));

        canvasState.addControl(new Label(1, new Position(0, 320), canvasState, '#000', 'ADSR-Envelope'));
        var envelopeControl = new EnvelopeGraph(GlobalConstants.CTRL_ENVELOPE, new Position(20, 350), canvasState, 8);

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
