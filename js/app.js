require.config({
    baseUrl: 'js',

    paths: {
        app:   'app',
        //libs
        mout:  'vendor/mout/src',
        konva: 'vendor/konva/konva.min'
    },

    packages: [
        {
            name:     'dejavu',
            location: 'vendor/dejavu/dist/amd/strict'
        }
    ],

    shim: {
        'konva' : {
            exports: 'Konva'
        }
    }

});

// Start the main app logic.
requirejs(
    [
        'dejavu',
        'app/audio/module/generator/Wave',
        'app/canvas/CanvasState',
        'app/factory/control/ControlList',
        'app/factory/audio/module/ModuleList',
        'app/Synthesizer',
        'app/util/GlobalConstants'

    ],
    function (
        dejavu,
        CanvasState,
        Wave,
        ControlListFactory,
        AudioModuleListFactory,
        Synthesizer,
        GlobalConstants
    ) {
        var canvasState = new CanvasState(600, 550, 'syn');

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext    = new window.AudioContext();

        var audioModuleOptionsList = [
            {
                id:       GlobalConstants.AMOD_OSC1,
                type:     AudioModuleListFactory.CLASS_TYPE_WAVE,
                tuning:   0,
                gain:     1,
                waveType: Synthesizer.WAVEFORM_SINE,
                moduleConnectionList: [
                    {
                        sourceModuleId: GlobalConstants.AMOD_OSC1,
                        targetModuleId: GlobalConstants.AMOD_OSC1_GAIN,
                        channelConnectionList: [
                            {
                                sourceChannelNumber: 0,
                                targetChannelNumber: 0
                            },
                            {
                                sourceChannelNumber: 0,
                                targetChannelNumber: 0
                            },
                            {
                                sourceChannelNumber: 0,
                                targetChannelNumber: 0
                            },
                            {
                                sourceChannelNumber: 0,
                                targetChannelNumber: 0
                            }
                        ]
                    }
                ]
            },
            {
                id:   GlobalConstants.AMOD_OSC1_GAIN,
                type: AudioModuleListFactory.CLASS_TYPE_GAIN,
                gain: 1,
                moduleConnectionList: [
                    {
                        sourceModuleId: GlobalConstants.AMOD_OSC1_GAIN,
                        targetModuleId: GlobalConstants.AMOD_DESTINATION,
                        channelConnectionList: [
                            {
                                sourceChannelNumber: 0,
                                targetChannelNumber: 0
                            }
                        ]
                    }
                ]
            },
            {
                id:   GlobalConstants.AMOD_DESTINATION,
                type: AudioModuleListFactory.CLASS_TYPE_DESTINATION
            }
        ];

        var controlConnectionOptionsList = [
            {
                controlId:   GlobalConstants.CTRL_OSC1_WAVE,
                moduleId:    GlobalConstants.AMOD_OSC1,
                valueTarget: Wave.CTRL_TARGET_VALUE_WAVETYPE
            },
            {
                controlId:   GlobalConstants.CTRL_KEYBOARD,
                moduleId:    GlobalConstants.AMOD_OSC1,
                valueTarget: Wave.CTRL_TARGET_TRIGGER_NOTE
            },
            {
                controlId:   GlobalConstants.CTRL_OSC1_TUNE_OCT,
                moduleId:    GlobalConstants.AMOD_OSC1,
                valueTarget: Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES
            },
            {
                controlId:   GlobalConstants.CTRL_OSC1_TUNE_HALF,
                moduleId:    GlobalConstants.AMOD_OSC1,
                valueTarget: Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES
            },
            {
                controlId:   GlobalConstants.CTRL_OSC1_TUNE_CENTS,
                moduleId:    GlobalConstants.AMOD_OSC1,
                valueTarget: Wave.CTRL_TARGET_VALUE_TUNE_CENTS
            }
        ];

        var controlOptionsList = [
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_LABEL,
                position: {x: 0, y: 20},
                color:    '#000',
                text:     'OSC1-Waveform'
            },
            {
                id:           GlobalConstants.CTRL_OSC1_WAVE,
                type:         ControlListFactory.CLASS_TYPE_RADIOGROUP,
                position:     {x: 0, y: 40},
                value:        Wave.WAVEFORM_SINE,
                radioButtonOptions: [
                    {
                        position:     null,
                        label:        'Sine',
                        value:        Wave.WAVEFORM_SINE,
                        color:        '#000',
                        checkedColor: '#FFF'
                    },
                    {
                        position:     null,
                        label:        'Square',
                        value:        Wave.WAVEFORM_SQUARE,
                        color:        '#000',
                        checkedColor: '#FFF'
                    },
                    {
                        position:     null,
                        label:        'Saw',
                        value:        Wave.WAVEFORM_SAWTOOTH,
                        color:        '#000',
                        checkedColor: '#FFF'
                    },
                    {
                        position:     null,
                        label:        'Triangle',
                        value:        Wave.WAVEFORM_TRIANGLE,
                        color:        '#000',
                        checkedColor: '#FFF'
                    }
                ]
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_LABEL,
                position: {x: 130, y: 20},
                color:    '#000',
                text:     'OSC1-Octave'
            },
            {
                id:                     GlobalConstants.CTRL_OSC1_TUNE_OCT,
                type:                   ControlListFactory.CLASS_TYPE_KNOB,
                position:               {x: 130, y: 40},
                rangeValueOptions:      {
                    valueDisplayMultiplier: 1,
                    valueRange:             {min: -4, max: 4},
                    snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0.5, snapStep: 1},
                    numberFormat:           '#0.0'
                },
                value:                  0,
                radius:                 50,
                color:                  '#AABBCC'
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_LABEL,
                position: {x: 250, y: 20},
                color:    '#000',
                text:     'OSC1-Tune'
            },
            {
                id:                     GlobalConstants.CTRL_OSC1_TUNE_HALF,
                type:                   ControlListFactory.CLASS_TYPE_KNOB,
                position:               {x: 250, y: 40},
                rangeValueOptions:      {
                    valueDisplayMultiplier: 1,
                    valueRange:             {min: -12, max: 12},
                    snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0, snapStep: 0},
                    numberFormat:           '#0.0'
                },
                value:                  0,
                radius:                 50,
                color:                  '#AABBCC'
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_LABEL,
                position: {x: 370, y: 20},
                color:    '#000',
                text:     'OSC1-Cents'
            },
            {
                id:                     GlobalConstants.CTRL_OSC1_TUNE_CENTS,
                type:                   ControlListFactory.CLASS_TYPE_KNOB,
                position:               {x: 370, y: 40},
                rangeValueOptions:      {
                    valueDisplayMultiplier: 1,
                    valueRange:             {min: Wave.CENTS_HALFTONE * -1, max: Wave.CENTS_HALFTONE},
                    snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0, snapStep: 0},
                    numberFormat:           '#0.0'
                },
                value:                  0,
                radius:                 50,
                color:                  '#AABBCC'
            },
            {
                id:       GlobalConstants.CTRL_KEYBOARD,
                type:     ControlListFactory.CLASS_TYPE_KEYBOARD,
                position: {x: 0, y: 300}
            }
            /*
            {
                id:                     GlobalConstants.CTRL_OSC1_TUNE,
                type:                   GlobalConstants.CLASS_TYPE_KNOB,
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
                type:                   GlobalConstants.CLASS_TYPE_KNOB,
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
                type:                   GlobalConstants.CLASS_TYPE_KNOB,
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
                type:                   GlobalConstants.CLASS_TYPE_KNOB,
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
                type:                   GlobalConstants.CLASS_TYPE_KNOB,
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
                type:                   GlobalConstants.CLASS_TYPE_KNOB,
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
                type:                   GlobalConstants.CLASS_TYPE_KNOB,
                position:               {x: 240, y: 60},
                value:                  0.05,
                valueDisplayMultiplier: 2000,
                valueRange:             {min: 0, max: 0.05},
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
                id:         GlobalConstants.CTRL_FLT_FREQUENCY,
                type:       GlobalConstants.CLASS_TYPE_FADER,
                position:   {x: 450, y: 370},
                value:      22050,
                rangeValueOptions:
                {
                    valueRange:             {min: 60, max: 22050},
                    numberFormat:           '#0',
                    valueDisplayMultiplier: 1,
                    snapOptions :           null
                },
                length:      100,
                color:       '#AABBCC',
                snapOptions: null,
                orientation: Fader.ORIENTATION_VERTICAL
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

        var synthesizer = new Synthesizer(
            audioContext,
            audioModuleOptionsList,
            canvasState,
            controlConnectionOptionsList,
            controlOptionsList
        );
    }
);
