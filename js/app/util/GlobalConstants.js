/**
 * @namespace Snautsynth.Util
 */
define(
    ['dejavu'],
    function(dejavu) {
        /** @class Snautsynth.Util.GlobalConstants */
        var GlobalConstants = dejavu.Class.declare({
            $name: 'GlobalConstants',

            $constants: {
                CLASS_TYPE_AMOD_DESTINATION: 1,
                CLASS_TYPE_AMOD_GAIN:        2,
                CLASS_TYPE_AMOD_WAVE:        3,
                CLASS_TYPE_CTRL_FADER:       4,
                CLASS_TYPE_CTRL_GRAPH:       5,
                CLASS_TYPE_CTRL_KEYBOARD:    6,
                CLASS_TYPE_CTRL_KNOB:        7,
                CLASS_TYPE_CTRL_LABEL:       8,
                CLASS_TYPE_CTRL_POINT:       9,
                CLASS_TYPE_CTRL_RADIOGROUP:  10,
                CLASS_TYPE_CTRL_RADIOBUTTON: 11,

                CTRL_MASTERGAIN:                  1,
                CTRL_FILTER_TYPE:                 2,
                CTRL_FILTER_FREQUENCY:            3,
                CTRL_FILTER_RESONANCE:            4,
                CTRL_OSC1_GAIN:                   5,
                CTRL_OSC1_WAVE:                   6,
                CTRL_OSC1_TUNE_CENTS:             7,
                CTRL_OSC1_TUNE_HALF:              8,
                CTRL_OSC1_TUNE_OCT:               9,
                CTRL_OSC2_GAIN:                   10,
                CTRL_OSC2_WAVE:                   11,
                CTRL_OSC2_TUNE_CENTS:             12,
                CTRL_OSC2_TUNE_HALF:              13,
                CTRL_OSC2_TUNE_OCT:               14,
                CTRL_KEYBOARD:                    15,

                /*
                CTRL_ENVELOPE:                    14,
                CTRL_ATTACK_POINT:                15,
                CTRL_DECAYTIME_SUSTAINGAIN_POINT: 16,
                CTRL_RELEASE_POINT:               17,
                CTRL_KEYBOARD:                    18,
                */

                AMOD_DESTINATION:   1,
                AMOD_BIQUAD_FILTER: 2,
                AMOD_OSC1:          3,
                AMOD_OSC1_GAIN:     4,
                AMOD_OSC2:          5,
                AMOD_OSC2_GAIN:     6,

                KEY_CODE_A: 65,
                KEY_CODE_W: 87,
                KEY_CODE_S: 83,
                KEY_CODE_E: 69,
                KEY_CODE_D: 68,
                KEY_CODE_F: 70,
                KEY_CODE_T: 84,
                KEY_CODE_G: 71,
                KEY_CODE_Z: 90,
                KEY_CODE_H: 72,
                KEY_CODE_U: 85,
                KEY_CODE_J: 74,
                KEY_CODE_K: 75,

                NOTE_C_5:  52,
                NOTE_Cis5: 53,
                NOTE_D_5:  54,
                NOTE_Dis5: 55,
                NOTE_E_5:  56,
                NOTE_F_5:  57,
                NOTE_Fis5: 58,
                NOTE_G_5:  59,
                NOTE_Gis5: 60,
                NOTE_A_5:  61,
                NOTE_Ais5: 62,
                NOTE_B_5:  63,
                NOTE_C_6:  64
            }
        });
        return GlobalConstants;
    }
);
