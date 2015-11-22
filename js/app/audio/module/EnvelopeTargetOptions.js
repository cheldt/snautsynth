/**
 * @namespace Snautsynth.Audio.Module
 */
define(
    [
        'dejavu',
        'app/audio/module/IControlTargetOptionsAccessible',
    ],
    function (
        dejavu,
        IControlTargetOptionsAccessible
    ) {
        'use strict';

        /**
         * @class Snautsynth.Audio.Module.EnvelopeTargetOptions
         * @implements Snautsynth.Audio.Module.IControlTargetOptionsAccessable
         */
        var EnvelopeTargetOptions = dejavu.Class.declare({
            $name: 'EnvelopeTargetOptions',

            $implements: [IControlTargetOptionsAccessible],

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
             * @instance
             * @private
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __attackGainOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
             * @instance
             * @private
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __attackTimeOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
             * @instance
             * @private
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __decayGainOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
             * @instance
             * @private
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __decayTimeOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
             * @instance
             * @private
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __sustainTimeOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
             * @instance
             * @private
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __releaseTimeOptions: null,

            $constants: {
                /**
                 * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_ATTACK_GAIN: 1,

                /**
                 * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_ATTACK_TIME: 2,

                /**
                 * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_DECAY_GAIN: 3,

                /**
                 * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_DECAY_TIME: 4,

                /**
                 * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_SUSTAIN_TIME: 5,

                /**
                 * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_ENV_RELEASE_TIME: 6

            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeTargetOptions
             * @instance
             * @public
             *
             * @param {number} ctrlTargetId
             *
             * @return {null|Snautsynth.DataType.ValueOptions}
             */
            getOptionsById: function(ctrlTargetId) {
                switch(ctrlTargetId) {
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_ATTACK_GAIN:
                        return this.__attackGainOptions;
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_ATTACK_TIME:
                        return this.__attackTimeOptions;
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_DECAY_GAIN:
                        return this.__decayGainOptions;
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_DECAY_TIME:
                        return this.__decayTimeOptions;
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_RELEASE_TIME:
                        return this.__releaseTimeOptions;
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_SUSTAIN_TIME:
                        return this.__sustainTimeOptions;
                    default:
                        return null;
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain.ControlTargetOptions
             * @instance
             * @public
             *
             * @param {number}                           ctrlTargetId
             * @param {Snautsynth.DataType.ValueOptions} valueOptions
             */
            setOptionsById: function(ctrlTargetId, valueOptions) {
                switch(ctrlTargetId) {
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_ATTACK_GAIN:
                        this.__attackGainOptions = valueOptions;
                        break;
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_ATTACK_TIME:
                        this.__attackTimeOptions = valueOptions;
                        break;
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_DECAY_GAIN:
                        this.__decayGainOptions = valueOptions;
                        break;
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_DECAY_TIME:
                        this.__decayTimeOptions = valueOptions;
                        break;
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_RELEASE_TIME:
                        this.__releaseTimeOptions = valueOptions;
                        break;
                    case EnvelopeTargetOptions.CTRL_TARGET_ENV_SUSTAIN_TIME:
                        this.__sustainTimeOptions = valueOptions;
                        break;
                }
            }
        });

        return EnvelopeTargetOptions;
    }
);
