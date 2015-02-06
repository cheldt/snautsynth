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
        'app/canvas/CanvasState',
        'app/control/ui/rangecontrol/Fader',
        'app/audio/Synthesizer',
        'app/utils/GlobalConstants',
        'app/factory/control/layout/Label',
        'app/factory/control/ui/RadioGroup',
        'app/factory/control/ui/envelope/Graph',
        'app/factory/control/ui/rangecontrol/Fader',
        'app/factory/control/ui/rangecontrol/Knob'
    ],
    function (
        CanvasState,
        Fader,
        Synthesizer,
        GlobalConstants,
        LabelFactory,
        RadioGroupFactory,
        GraphFactory,
        FaderFactory,
        KnobFactory
    ) {

        var canvasState = new CanvasState(600, 550, 'syn');

        var factories = {};
        factories[GlobalConstants.CLASS_TYPE_BUTTON]     = KnobFactory;
        factories[GlobalConstants.CLASS_TYPE_LABEL]      = LabelFactory;
        factories[GlobalConstants.CLASS_TYPE_RADIOGROUP] = RadioGroupFactory;
        factories[GlobalConstants.CLASS_TYPE_FADER]      = FaderFactory;
        factories[GlobalConstants.CLASS_TYPE_GRAPH]      = GraphFactory;

        var controlOptions = [
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
                id:       -1,
                type:     GlobalConstants.CLASS_TYPE_LABEL,
                position: {x: 130, y: 20},
                color:    '#000',
                text:     'OSC1-Tune'
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
                snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0, snapStep: 0},
                numberFormat:           '#0.0'
            },
            {
                id:       -1,
                type:     GlobalConstants.CLASS_TYPE_LABEL,
                position: {x: 250, y: 20},
                color:    '#000',
                text:     'OSC1-Octave'
            },
            {
                id:                     GlobalConstants.CTRL_OSC1_OCT,
                type:                   GlobalConstants.CLASS_TYPE_BUTTON,
                position:               {x: 120, y: 20},
                value:                  0,
                valueDisplayMultiplier: 1,
                valueRange:             {min: -4, max: 4},
                radius:                 50,
                color:                  '#AABBCC',
                snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0.5, snapStep: 1},
                numberFormat:           '#0'
            },
            {
                id:       -1,
                type:     GlobalConstants.CLASS_TYPE_LABEL,
                position: {x: 370, y: 20},
                color:    '#000',
                text:     'OSC1-Gain'
            },
            {
                id:                     GlobalConstants.CTRL_OSC1_GAIN,
                type:                   GlobalConstants.CLASS_TYPE_BUTTON,
                position:               {x: 180, y: 20},
                value:                  1,
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
                position: {x: 0, y: 180},
                color:    '#000',
                text:     'OSC2-Waveform'
            },
            {
                id:           GlobalConstants.CTRL_OSC2_WAVE,
                type:         GlobalConstants.CLASS_TYPE_RADIOGROUP,
                position:     {x: 0, y: 100},
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
                id:       -1,
                type:     GlobalConstants.CLASS_TYPE_LABEL,
                position: {x: 130, y: 180},
                color:    '#000',
                text:     'OSC2-Tune'
            },
            {
                id:                     GlobalConstants.CTRL_OSC2_TUNE,
                type:                   GlobalConstants.CLASS_TYPE_BUTTON,
                position:               {x: 60, y: 100},
                value:                  0,
                valueDisplayMultiplier: 1,
                valueRange:             {min: -12, max: 12},
                radius:                 50,
                color:                  '#AABBCC',
                snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0, snapStep: 0},
                numberFormat:           '#0.0'
            },
            {
                id:       -1,
                type:     GlobalConstants.CLASS_TYPE_LABEL,
                position: {x: 250, y: 180},
                color:    '#000',
                text:     'OSC2-Octave'
            },
            {
                id:                     GlobalConstants.CTRL_OSC2_OCT,
                type:                   GlobalConstants.CLASS_TYPE_BUTTON,
                position:               {x: 120, y: 100},
                value:                  0,
                valueDisplayMultiplier: 1,
                valueRange:             {min: -4, max: 4},
                radius:                 50,
                color:                  '#AABBCC',
                snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0.5, snapStep: 1},
                numberFormat:           '#0'
            },
            {
                id:       -1,
                type:     GlobalConstants.CLASS_TYPE_LABEL,
                position: {x: 370, y: 180},
                color:    '#000',
                text:     'OSC2-Gain'
            },
            {
                id:                     GlobalConstants.CTRL_OSC2_GAIN,
                type:                   GlobalConstants.CLASS_TYPE_BUTTON,
                position:               {x: 180, y: 100},
                value:                  1,
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
                position: {x: 490, y: 100},
                color:    '#000',
                text:     'Mastergain'
            },
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
                position: {x: 350, y: 320},
                color:    '#000',
                text:     'Filter'
            },
            {
                id:       -1,
                type:     GlobalConstants.CLASS_TYPE_LABEL,
                position: {x: 350, y: 340},
                color:    '#000',
                text:     'Type'
            },
            {
                id:           GlobalConstants.CTRL_FLT_TYPE,
                type:         GlobalConstants.CLASS_TYPE_RADIOGROUP,
                position:     {x: 350, y: 180},
                value:        Synthesizer.FILTER_LOWPASS,
                radioButtons: [
                    {
                        id:           0,
                        type:         GlobalConstants.CLASS_TYPE_RADIOBUTTON,
                        position:     {x: 0, y: 0},
                        label:        'Lowpass',
                        value:        Synthesizer.FILTER_LOWPASS,
                        color:        '#000',
                        checkedColor: '#FFF'
                    },
                    {
                        id:           0,
                        type:         GlobalConstants.CLASS_TYPE_RADIOBUTTON,
                        position:     {x: 0, y: 0},
                        label:        'Bandpass',
                        value:        Synthesizer.FILTER_BANDPASS,
                        color:        '#000',
                        checkedColor: '#FFF'
                    },
                    {
                        id:           0,
                        type:         GlobalConstants.CLASS_TYPE_RADIOBUTTON,
                        position:     {x: 0, y: 0},
                        label:        'Highpass',
                        value:        Synthesizer.FILTER_HIGHPASS,
                        color:        '#000',
                        checkedColor: '#FFF'
                    }
                ]
            },
            {
                id:       -1,
                type:     GlobalConstants.CLASS_TYPE_LABEL,
                position: {x: 450, y: 340},
                color:    '#000',
                text:     'Freq'
            },
            {
                id:                     GlobalConstants.CTRL_FLT_FREQUENCY,
                type:                   GlobalConstants.CLASS_TYPE_FADER,
                position:               {x: 450, y: 370},
                value:                  22050,
                valueDisplayMultiplier: 1,
                valueRange:             {min: 60, max: 22050},
                length:                 100,
                color:                  '#AABBCC',
                snapOptions:            null,
                numberFormat:           '#0',
                orientation:            Fader.ORIENTATION_VERTICAL
            },
            {
                id:       -1,
                type:     GlobalConstants.CLASS_TYPE_LABEL,
                position: {x: 530, y: 340},
                color:    '#000',
                text:     'Res'
            },
            {
                id:                     GlobalConstants.CTRL_FLT_RESONANCE,
                type:                   GlobalConstants.CLASS_TYPE_FADER,
                position:               {x: 530, y: 370},
                value:                  0.0001,
                valueDisplayMultiplier: 1,
                valueRange:             {min: 0.0001, max: 50},
                length:                 100,
                color:                  '#AABBCC',
                snapOptions:            null,
                numberFormat:           '#0',
                orientation:            Fader.ORIENTATION_VERTICAL
            }
            /*
            {
                id:       -1,
                type:     GlobalConstants.CLASS_TYPE_LABEL,
                position: {x: 0, y: 320},
                color:    '#000',
                text:     'ADSR-Envelope'
            },
            {
                id:       GlobalConstants.CTRL_ENVELOPE,
                type:     GlobalConstants.CLASS_TYPE_GRAPH,
                position: {x: 20, y: 350},
                color:    '#000',
                maxTime:  4,
                points:   [
                    {
                        id:    GlobalConstants.CTRL_ATTACK_POINT,
                        type:  GlobalConstants.CLASS_TYPE_POINT,
                        value: {'gain' : 1, 'time' : 0.5},
                        color: '#AABBCC'
                    },
                    {
                        id:    GlobalConstants.CTRL_DECAYTIME_SUSTAINGAIN_POINT,
                        type:  GlobalConstants.CLASS_TYPE_POINT,
                        value: {'gain' : 0.7, 'time' : 0.8},
                        color: '#AABBCC'
                    },
                    {
                        id:    GlobalConstants.CTRL_RELEASE_POINT,
                        type:  GlobalConstants.CLASS_TYPE_POINT,
                        value: {'gain' : 0, 'time' : 1.2},
                        color: '#AABBCC'
                    },
                ]
            }
            */
        ];

        controlOptions.forEach(function(controlOption) {
            if (factories.hasOwnProperty(controlOption.type)) {
                var factory = new factories[controlOption.type]();
                canvasState.addControl(factory.create(canvasState, controlOption));
            }
        });

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioCtx        = new window.AudioContext();
        var synth           = new Synthesizer(audioCtx, canvasState);

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

        window.addEventListener("keyup", function(e) { synth.noteOff(e.keyCode); });

        window.addEventListener("keydown", function(e) { synth.noteOn(e.keyCode); });
    }
);
