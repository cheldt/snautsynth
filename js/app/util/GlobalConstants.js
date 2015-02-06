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
                CLASS_TYPE_BUTTON:      1,
                CLASS_TYPE_FADER:       2,
                CLASS_TYPE_GRAPH:       3,
                CLASS_TYPE_RADIOGROUP:  4,
                CLASS_TYPE_RADIOBUTTON: 5,
                CLASS_TYPE_LABEL:       6,
                CLASS_TYPE_POINT:       7,

                CTRL_MASTERGAIN:                  1,
                CTRL_OSC1_WAVE:                   2,
                CTRL_OSC1_TUNE:                   3,
                CTRL_OSC1_GAIN:                   4,
                CTRL_OSC1_OCT:                    5,

                CTRL_OSC2_WAVE:                   6,
                CTRL_OSC2_TUNE:                   7,
                CTRL_OSC2_GAIN:                   8,
                CTRL_OSC2_OCT:                    9,

                CTRL_FLT_TYPE:                    10,
                CTRL_FLT_FREQUENCY:               11,
                CTRL_FLT_RESONANCE:               12,

                CTRL_ENVELOPE:                    14,
                CTRL_ATTACK_POINT:                15,
                CTRL_DECAYTIME_SUSTAINGAIN_POINT: 16,
                CTRL_RELEASE_POINT:               17,

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
