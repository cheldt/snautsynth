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
        'app/audio/module/mixing/Gain',
        'app/canvas/CanvasState',
        'app/factory/control/ControlList',
        'app/factory/audio/module/ModuleList',
        'app/Synthesizer',
        'app/util/GlobalConstants'
    ],
    function (
        dejavu,
        Wave,
        Gain,
        CanvasState,
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
                gain:     0.5,
                waveType: Wave.WAVEFORM_SQUARE,
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
                gain: 0.5,
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
            },
            {
                controlId:   GlobalConstants.CTRL_OSC1_GAIN,
                moduleId:    GlobalConstants.AMOD_OSC1_GAIN,
                valueTarget: Gain.CTRL_TARGET_VALUE_GAIN
            },
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
                text:     'OSC1-Halftone'
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
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_LABEL,
                position: {x: 490, y: 20},
                color:    '#000',
                text:     'OSC1-Gain'
            },
            {
                id:                     GlobalConstants.CTRL_OSC1_GAIN,
                type:                   ControlListFactory.CLASS_TYPE_KNOB,
                position:               {x: 490, y: 40},
                rangeValueOptions:      {
                    valueDisplayMultiplier: 1,
                    valueRange:             {min: 0, max: 0.5},
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
