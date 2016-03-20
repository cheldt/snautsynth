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
        'app/audio/module/EnvelopeTargetOptions',
        'app/audio/module/filter/Biquad',
        'app/audio/module/generator/Wave',
        'app/audio/module/mixing/Gain',
        'app/canvas/CanvasState',
        'app/control/ui/rangecontrol/Fader',
        'app/factory/control/ControlList',
        'app/factory/audio/module/ControlTargetOptions',
        'app/factory/audio/module/ModuleList',
        'app/Synthesizer',
        'app/util/GlobalConstants'
    ],
    function (
        dejavu,
        EnvelopeTargetOptions,
        BiquadFilter,
        Wave,
        Gain,
        CanvasState,
        Fader,
        ControlListFactory,
        ControlTargetOptionsFactory,
        AudioModuleListFactory,
        Synthesizer,
        GlobalConstants
    ) {
        var canvasState = new CanvasState(600, 650, 'syn');

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext    = new window.AudioContext();


        var controlTargetOptionsOSC1_OSC2 = [
            {
                type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                targetId:               Wave.CTRL_TARGET_VALUE_GAIN,
                valueDisplayMultiplier: 1,
                valueRange:             {min: 0, max: 0.5},
                snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0, snapStep: 0},
                numberFormat:           '#0.0'
            },
            {
                type:     ControlTargetOptionsFactory.CLASS_TYPE_DISCRETEVALUEOPTIONS,
                targetId: Wave.CTRL_TARGET_VALUE_WAVETYPE,
                discreteOptions: [
                    {
                        name: 'Saw',
                        value: Wave.WAVEFORM_SAWTOOTH
                    },
                    {
                        name: 'Sine',
                        value: Wave.WAVEFORM_SINE
                    },
                    {
                        name: 'Square',
                        value: Wave.WAVEFORM_SQUARE
                    },
                    {
                        name: 'Triangle',
                        value: Wave.WAVEFORM_TRIANGLE
                    }
                ]
            },
            {
                type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                targetId:               Wave.CTRL_TARGET_VALUE_TUNE_CENTS,
                valueDisplayMultiplier: 1,
                valueRange:             {min: Wave.CENTS_HALFTONE * -1, max: Wave.CENTS_HALFTONE},
                snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0, snapStep: 0},
                numberFormat:           '#0'
            },
            {
                type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                targetId:               Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES,
                valueDisplayMultiplier: 1,
                valueRange:             {min: -12, max: 12},
                snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0.5, snapStep: 1},
                numberFormat:           '#0'
            },
            {
                type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                targetId:               Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES,
                valueDisplayMultiplier: 1,
                valueRange:             {min: -4, max: 4},
                snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0.5, snapStep: 1},
                numberFormat:           '#0'
            },
            {
                type:     ControlTargetOptionsFactory.CLASS_TYPE_DISCRETEVALUEOPTIONS,
                targetId: Wave.CTRL_TARGET_TRIGGER_NOTE,
                discreteOptions: [
                    {
                        name: 'C-F',
                        value: GlobalConstants.NOTE_C_5
                    },
                    {
                        name: 'C#5',
                        value: GlobalConstants.NOTE_Cis5
                    },
                    {
                        name: 'D-5',
                        value: GlobalConstants.NOTE_D_5
                    },
                    {
                        name: 'D#5',
                        value: GlobalConstants.NOTE_Dis5
                    },
                    {
                        name: 'E-5',
                        value: GlobalConstants.NOTE_E_5
                    },
                    {
                        name: 'F-5',
                        value: GlobalConstants.NOTE_F_5
                    },
                    {
                        name: 'F#5',
                        value: GlobalConstants.NOTE_Fis5
                    },
                    {
                        name: 'G-5',
                        value: GlobalConstants.NOTE_G_5
                    },
                    {
                        name: 'G#5',
                        value: GlobalConstants.NOTE_Gis5
                    },
                    {
                        name: 'A-5',
                        value: GlobalConstants.NOTE_A_5
                    },
                    {
                        name: 'A#5',
                        value: GlobalConstants.NOTE_Ais5
                    },
                    {
                        name: 'B-5',
                        value: GlobalConstants.NOTE_B_5
                    },
                    {
                        name: 'C-6',
                        value: GlobalConstants.NOTE_C_6
                    }
                ]
            },
            {
                type:     ControlTargetOptionsFactory.CLASS_TYPE_ENVELOPETARGETOPTIONS,
                targetId: Wave.CTRL_TARGET_ENVELOPE,
                options: [
                    {
                        type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                        targetId:               EnvelopeTargetOptions.CTRL_TARGET_ENV_ATTACK_GAIN,
                        valueDisplayMultiplier: 1,
                        valueRange:             {min: 0, max: 1},
                        snapOptions:            null,
                        numberFormat:           '#0'
                    },
                    {
                        type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                        targetId:               EnvelopeTargetOptions.CTRL_TARGET_ENV_ATTACK_TIME,
                        valueDisplayMultiplier: 1,
                        valueRange:             null,
                        snapOptions:            null,
                        numberFormat:           '#0'
                    },
                    {
                        type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                        targetId:               EnvelopeTargetOptions.CTRL_TARGET_ENV_DECAY_GAIN,
                        valueDisplayMultiplier: 1,
                        valueRange:             {min: 0, max: 1},
                        snapOptions:            null,
                        numberFormat:           '#0'
                    },
                    {
                        type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                        targetId:               EnvelopeTargetOptions.CTRL_TARGET_ENV_DECAY_TIME,
                        valueDisplayMultiplier: 1,
                        valueRange:             null,
                        snapOptions:            null,
                        numberFormat:           '#0'
                    },
                    {
                        type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                        targetId:               EnvelopeTargetOptions.CTRL_TARGET_ENV_SUSTAIN_TIME,
                        valueDisplayMultiplier: 1,
                        valueRange:             null,
                        snapOptions:            null,
                        numberFormat:           '#0'
                    },
                    {
                        type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                        targetId:               EnvelopeTargetOptions.CTRL_TARGET_ENV_RELEASE_TIME,
                        valueDisplayMultiplier: 1,
                        valueRange:             null,
                        snapOptions:            null,
                        numberFormat:           '#0'
                    }
                ]
            }
        ];

        var audioModuleOptionsList = [
            {
                id:       GlobalConstants.AMOD_OSC1,
                type:     AudioModuleListFactory.CLASS_TYPE_AMOD_WAVE,
                tuning:   0,
                gain:     0.5,
                envelopeValues: {
                    attackGain:  1.0,
                    attackTime:  0.5,
                    decayGain:   0.5,
                    decayTime:   1.0,
                    sustainTime: 2,
                    releaseTime: 3
                },
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
                ],
                controlTargetOptions: controlTargetOptionsOSC1_OSC2
            },
            {
                id:   GlobalConstants.AMOD_OSC1_GAIN,
                type: AudioModuleListFactory.CLASS_TYPE_AMOD_GAIN,
                gain: 0.1,
                moduleConnectionList: [
                    {
                        sourceModuleId: GlobalConstants.AMOD_OSC1_GAIN,
                        targetModuleId: GlobalConstants.AMOD_BIQUAD_FILTER,
                        channelConnectionList: [
                            {
                                sourceChannelNumber: 0,
                                targetChannelNumber: 0
                            }
                        ]
                    }
                ],
                controlTargetOptions: [
                    {
                        type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                        targetId:               Gain.CTRL_TARGET_VALUE_GAIN,
                        valueDisplayMultiplier: 10,
                        valueRange:             {min: 0, max: 0.1},
                        snapOptions:            {doubleClickSnapValue: 0.1, snapDistance: 0, snapStep: 0},
                        numberFormat:           '#0.0'
                    }
                ]
            },
            {
                id:       GlobalConstants.AMOD_OSC2,
                type:     AudioModuleListFactory.CLASS_TYPE_AMOD_WAVE,
                tuning:   0,
                gain:     0.5,
                waveType: Wave.WAVEFORM_SQUARE,
                envelopeValues: {
                    attackGain:  1.0,
                    attackTime:  0.5,
                    decayGain:   0.5,
                    decayTime:   1.0,
                    sustainTime: 2,
                    releaseTime: 3
                },
                moduleConnectionList: [
                    {
                        sourceModuleId: GlobalConstants.AMOD_OSC2,
                        targetModuleId: GlobalConstants.AMOD_OSC2_GAIN,
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
                ],
                controlTargetOptions: controlTargetOptionsOSC1_OSC2
            },
            {
                id:   GlobalConstants.AMOD_OSC2_GAIN,
                type: AudioModuleListFactory.CLASS_TYPE_AMOD_GAIN,
                gain: 0.1,
                moduleConnectionList: [
                    {
                        sourceModuleId: GlobalConstants.AMOD_OSC2_GAIN,
                        targetModuleId: GlobalConstants.AMOD_BIQUAD_FILTER,
                        channelConnectionList: [
                            {
                                sourceChannelNumber: 0,
                                targetChannelNumber: 0
                            }
                        ]
                    }
                ],
                controlTargetOptions: [
                    {
                        type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                        targetId:               Gain.CTRL_TARGET_VALUE_GAIN,
                        valueDisplayMultiplier: 10,
                        valueRange:             {min: 0, max: 0.1},
                        snapOptions:            {doubleClickSnapValue: 0.1, snapDistance: 0, snapStep: 0},
                        numberFormat:           '#0.0'
                    }
                ]
            },
            {
                id:            GlobalConstants.AMOD_BIQUAD_FILTER,
                type:          AudioModuleListFactory.CLASS_TYPE_AMOD_BIQUAD_FILTER,
                filterType:    BiquadFilter.FILTER_LOWPASS,
                frequency:     22000,
                qualityFactor: 1,
                moduleConnectionList: [
                    {
                        sourceModuleId: GlobalConstants.AMOD_BIQUAD_FILTER,
                        targetModuleId: GlobalConstants.AMOD_DESTINATION,
                        channelConnectionList: [
                            {
                                sourceChannelNumber: 0,
                                targetChannelNumber: 0
                            }
                        ]
                    }
                ],
                controlTargetOptions: [
                    {
                        type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                        targetId:               BiquadFilter.CTRL_TARGET_FREQUENCY,
                        valueDisplayMultiplier: 1,
                        valueRange:             {min: 0, max: 22000},
                        snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0, snapStep: 0},
                        numberFormat:           '#0'
                    },
                    {
                        type:                   ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS,
                        targetId:               BiquadFilter.CTRL_TARGET_QUALITY_FACTOR,
                        valueDisplayMultiplier: 1,
                        valueRange:             {min: 0, max: 1},
                        snapOptions:            {doubleClickSnapValue: 0, snapDistance: 0, snapStep: 0},
                        numberFormat:           '#0.0'
                    },
                    {
                        type:     ControlTargetOptionsFactory.CLASS_TYPE_DISCRETEVALUEOPTIONS,
                        targetId: BiquadFilter.CTRL_TARGET_TYPE,
                        discreteOptions: [
                            {
                                name: 'Lowpass',
                                value: BiquadFilter.FILTER_LOWPASS
                            },
                            {
                                name: 'Bandpass',
                                value: BiquadFilter.FILTER_BANDPASS
                            },
                            {
                                name: 'Highpass',
                                value: BiquadFilter.FILTER_HIGHPASS
                            }
                        ]
                    }
                ]
            },
            {
                id:   GlobalConstants.AMOD_DESTINATION,
                type: AudioModuleListFactory.CLASS_TYPE_AMOD_DESTINATION
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
            {
                controlId:   GlobalConstants.CTRL_OSC2_WAVE,
                moduleId:    GlobalConstants.AMOD_OSC2,
                valueTarget: Wave.CTRL_TARGET_VALUE_WAVETYPE
            },
            {
                controlId:   GlobalConstants.CTRL_KEYBOARD,
                moduleId:    GlobalConstants.AMOD_OSC2,
                valueTarget: Wave.CTRL_TARGET_TRIGGER_NOTE
            },
            {
                controlId:   GlobalConstants.CTRL_OSC2_TUNE_OCT,
                moduleId:    GlobalConstants.AMOD_OSC2,
                valueTarget: Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES
            },
            {
                controlId:   GlobalConstants.CTRL_OSC2_TUNE_HALF,
                moduleId:    GlobalConstants.AMOD_OSC2,
                valueTarget: Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES
            },
            {
                controlId:   GlobalConstants.CTRL_OSC2_TUNE_CENTS,
                moduleId:    GlobalConstants.AMOD_OSC2,
                valueTarget: Wave.CTRL_TARGET_VALUE_TUNE_CENTS
            },
            {
                controlId:   GlobalConstants.CTRL_OSC2_GAIN,
                moduleId:    GlobalConstants.AMOD_OSC2_GAIN,
                valueTarget: Gain.CTRL_TARGET_VALUE_GAIN
            },
            {
                controlId:   GlobalConstants.CTRL_FILTER_TYPE,
                moduleId:    GlobalConstants.AMOD_BIQUAD_FILTER,
                valueTarget: BiquadFilter.CTRL_TARGET_TYPE
            },
            {
                controlId:   GlobalConstants.CTRL_FILTER_FREQUENCY,
                moduleId:    GlobalConstants.AMOD_BIQUAD_FILTER,
                valueTarget: BiquadFilter.CTRL_TARGET_FREQUENCY
            },
            {
                controlId:   GlobalConstants.CTRL_FILTER_RESONANCE,
                moduleId:    GlobalConstants.AMOD_BIQUAD_FILTER,
                valueTarget: BiquadFilter.CTRL_TARGET_QUALITY_FACTOR
            },
            {
                controlId:   GlobalConstants.CTRL_ENVELOPE,
                moduleId:    GlobalConstants.AMOD_OSC1,
                valueTarget: Wave.CTRL_TARGET_ENVELOPE
            },
            {
                controlId:   GlobalConstants.CTRL_ENVELOPE,
                moduleId:    GlobalConstants.AMOD_OSC2,
                valueTarget: Wave.CTRL_TARGET_ENVELOPE
            }
        ];

        var controlOptionsList = [
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 0, y: 20},
                color:    '#000',
                text:     'OSC1-Waveform'
            },
            {
                id:       GlobalConstants.CTRL_OSC1_WAVE,
                type:     ControlListFactory.CLASS_TYPE_CTRL_RADIOGROUP,
                position: {x: 0, y: 40},
                value:    Wave.WAVEFORM_SINE,
                radioButtonOptions: [
                    {
                        position:     null,
                        label:        'Sine',
                        value:        Wave.WAVEFORM_SINE,
                        color:        '#AABBCC',
                        checkedColor: '#000'
                    },
                    {
                        position:     null,
                        label:        'Square',
                        value:        Wave.WAVEFORM_SQUARE,
                        color:        '#AABBCC',
                        checkedColor: '#000'
                    },
                    {
                        position:     null,
                        label:        'Saw',
                        value:        Wave.WAVEFORM_SAWTOOTH,
                        color:        '#AABBCC',
                        checkedColor: '#000'
                    },
                    {
                        position:     null,
                        label:        'Triangle',
                        value:        Wave.WAVEFORM_TRIANGLE,
                        color:        '#AABBCC',
                        checkedColor: '#000'
                    }
                ]
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 130, y: 20},
                color:    '#000',
                text:     'OSC1-Octave'
            },
            {
                id:       GlobalConstants.CTRL_OSC1_TUNE_OCT,
                type:     ControlListFactory.CLASS_TYPE_CTRL_KNOB,
                position: {x: 130, y: 40},
                value:    0,
                radius:   50,
                color:    '#AABBCC'
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 250, y: 20},
                color:    '#000',
                text:     'OSC1-Halftone'
            },
            {
                id:       GlobalConstants.CTRL_OSC1_TUNE_HALF,
                type:     ControlListFactory.CLASS_TYPE_CTRL_KNOB,
                position: {x: 250, y: 40},
                value:    0,
                radius:   50,
                color:    '#AABBCC'
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 370, y: 20},
                color:    '#000',
                text:     'OSC1-Cents'
            },
            {
                id:       GlobalConstants.CTRL_OSC1_TUNE_CENTS,
                type:     ControlListFactory.CLASS_TYPE_CTRL_KNOB,
                position: {x: 370, y: 40},
                value:    0,
                radius:   50,
                color:    '#AABBCC'
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 490, y: 20},
                color:    '#000',
                text:     'OSC1-Gain'
            },
            {
                id:       GlobalConstants.CTRL_OSC1_GAIN,
                type:     ControlListFactory.CLASS_TYPE_CTRL_KNOB,
                position: {x: 490, y: 40},
                value:    0,
                radius:   50,
                color:    '#AABBCC'
            },
            {
                id:       GlobalConstants.CTRL_KEYBOARD,
                type:     ControlListFactory.CLASS_TYPE_CTRL_KEYBOARD,
                position: {x: 0, y: 600}
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 0, y: 210},
                color:    '#000',
                text:     'OSC2-Waveform'
            },
            {
                id:           GlobalConstants.CTRL_OSC2_WAVE,
                type:         ControlListFactory.CLASS_TYPE_CTRL_RADIOGROUP,
                position:     {x: 0, y: 230},
                value:        Wave.WAVEFORM_SINE,
                radioButtonOptions: [
                    {
                        position:     null,
                        label:        'Sine',
                        value:        Wave.WAVEFORM_SINE,
                        color:        '#aaccbb',
                        checkedColor: '#000'
                    },
                    {
                        position:     null,
                        label:        'Square',
                        value:        Wave.WAVEFORM_SQUARE,
                        color:        '#aaccbb',
                        checkedColor: '#000'
                    },
                    {
                        position:     null,
                        label:        'Saw',
                        value:        Wave.WAVEFORM_SAWTOOTH,
                        color:        '#aaccbb',
                        checkedColor: '#000'
                    },
                    {
                        position:     null,
                        label:        'Triangle',
                        value:        Wave.WAVEFORM_TRIANGLE,
                        color:        '#aaccbb',
                        checkedColor: '#000'
                    }
                ]
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 130, y: 210},
                color:    '#000',
                text:     'OSC1-Octave'
            },
            {
                id:       GlobalConstants.CTRL_OSC2_TUNE_OCT,
                type:     ControlListFactory.CLASS_TYPE_CTRL_KNOB,
                position: {x: 130, y: 230},
                value:    0,
                radius:   50,
                color:    '#aaccbb'
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 250, y: 210},
                color:    '#000',
                text:     'OSC1-Halftone'
            },
            {
                id:       GlobalConstants.CTRL_OSC2_TUNE_HALF,
                type:     ControlListFactory.CLASS_TYPE_CTRL_KNOB,
                position: {x: 250, y: 230},
                value:    0,
                radius:   50,
                color:    '#aaccbb'
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 370, y: 210},
                color:    '#000',
                text:     'OSC1-Cents'
            },
            {
                id:       GlobalConstants.CTRL_OSC2_TUNE_CENTS,
                type:     ControlListFactory.CLASS_TYPE_CTRL_KNOB,
                position: {x: 370, y: 230},
                value:    0,
                radius:   50,
                color:    '#aaccbb'
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 490, y: 210},
                color:    '#000',
                text:     'OSC1-Gain'
            },
            {
                id:       GlobalConstants.CTRL_OSC2_GAIN,
                type:     ControlListFactory.CLASS_TYPE_CTRL_KNOB,
                position: {x: 490, y: 230},
                value:    0,
                radius:   50,
                color:    '#aaccbb'
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 0, y: 390},
                color:    '#000',
                text:     'Filtertype'
            },
            {
                id:           GlobalConstants.CTRL_FILTER_TYPE,
                type:         ControlListFactory.CLASS_TYPE_CTRL_RADIOGROUP,
                position:     {x: 0, y: 420},
                value:        BiquadFilter.FILTER_LOWPASS,
                radioButtonOptions: [
                    {
                        position:     null,
                        label:        'Lowpass',
                        value:        BiquadFilter.FILTER_LOWPASS,
                        color:        '#b2aacc',
                        checkedColor: '#000'
                    },
                    {
                        position:     null,
                        label:        'Bandpass',
                        value:        BiquadFilter.FILTER_BANDPASS,
                        color:        '#b2aacc',
                        checkedColor: '#000'
                    },
                    {
                        position:     null,
                        label:        'Highpass',
                        value:        BiquadFilter.FILTER_HIGHPASS,
                        color:        '#b2aacc',
                        checkedColor: '#000'
                    }
                ]
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 130, y: 390},
                color:    '#000',
                text:     'Filter-Cutoff'
            },
            {
                id:          GlobalConstants.CTRL_FILTER_FREQUENCY,
                type:        ControlListFactory.CLASS_TYPE_CTRL_FADER,
                position:    {x: 130, y: 420},
                value:       0,
                length:      130,
                orientation: Fader.ORIENTATION_VERTICAL,
                color:       '#b2aacc'
            },
            {
                id:       -1,
                type:     ControlListFactory.CLASS_TYPE_CTRL_LABEL,
                position: {x: 260, y: 390},
                color:    '#000',
                text:     'Filter-Resonance'
            },
            {
                id:          GlobalConstants.CTRL_FILTER_RESONANCE,
                type:        ControlListFactory.CLASS_TYPE_CTRL_FADER,
                position:    {x: 260, y: 420},
                value:       0,
                length:      130,
                orientation: Fader.ORIENTATION_VERTICAL,
                color:       '#b2aacc'
            },
            {
                id:          GlobalConstants.CTRL_ENVELOPE,
                type:        ControlListFactory.CLASS_TYPE_CTRL_GRAPH,
                position:    {x: 320, y: 420},
                graphOptions: {
                    color:         '#000',
                    pointColor:    '#b2aacc',
                    maxTime:       4,
                    selectedColor: '#000'
                }
            }
        ];


        new Synthesizer(
            audioContext,
            audioModuleOptionsList,
            canvasState,
            controlConnectionOptionsList,
            controlOptionsList
        );
        canvasState.draw();
    }
);
