/**
 * @namespace Snautsynth.Audio.Module.Mixing.Gain
 */
define(
    [
        'dejavu',
        'app/audio/module/IControlTargetOptionsAccessible',
        'app/audio/module/mixing/Gain',
        'app/audio/module/EnvelopeTargetOptions'
    ],
    function (
        dejavu,
        IControlTargetOptionsAccessible,
        Gain,
        EnvelopeTargetOptions
    ) {
        'use strict';

        /**
         * @class      Snautsynth.Audio.Module.Mixing.Gain.ControlTargetOptions
         * @implements Snautsynth.Audio.Module.IControlTargetOptionsAccessable
         */
        var ControlTargetOptions = dejavu.Class.declare({
            $name: 'ControlTargetOptions',

            $implements: [IControlTargetOptionsAccessible],

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @private
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __gainOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @private
             *
             * @type {Snautsynth.Audio.Module.EnvelopeTargetOptions}
             */
            __envelopeTargetOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Mixing.Gain.ControlTargetOptions
             * @instance
             * @public
             *
             * @param {number} ctrlTargetId
             *
             * @return {null|Snautsynth.DataType.ValueOptions}
             */
            getOptionsById: function(ctrlTargetId) {
                switch(ctrlTargetId) {
                    case Gain.CTRL_TARGET_VALUE_GAIN:
                        return this.__gainOptions;
                    case Gain.CTRL_TARGET_ENV_ATTACK_GAIN:
                        return this.__envelopeTargetOptions.getOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_ATTACK_GAIN
                        );
                    case Gain.CTRL_TARGET_ENV_ATTACK_TIME:
                        return this.__envelopeTargetOptions.getOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_ATTACK_TIME
                        );
                    case Gain.CTRL_TARGET_ENV_DECAY_GAIN:
                        return this.__envelopeTargetOptions.getOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_DECAY_GAIN
                        );
                    case Gain.CTRL_TARGET_ENV_DECAY_TIME:
                        return this.__envelopeTargetOptions.getOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_DECAY_TIME
                        );
                    case Gain.CTRL_TARGET_ENV_RELEASE_TIME:
                        return this.__envelopeTargetOptions.getOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_SUSTAIN_TIME
                        );
                    case Gain.CTRL_TARGET_ENV_SUSTAIN_TIME:
                        return this.__envelopeTargetOptions.getOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_RELEASE_TIME
                        );
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
                    case Gain.CTRL_TARGET_VALUE_GAIN:
                        this.__gainOptions = valueOptions;
                        break;
                    case Gain.CTRL_TARGET_ENV_ATTACK_GAIN:
                        this.__envelopeTargetOptions.setOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_ATTACK_GAIN,
                            valueOptions
                        );
                        break;
                    case Gain.CTRL_TARGET_ENV_ATTACK_TIME:
                        this.__envelopeTargetOptions.setOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_ATTACK_TIME,
                            valueOptions
                        );
                        break;
                    case Gain.CTRL_TARGET_ENV_DECAY_GAIN:
                        this.__envelopeTargetOptions.setOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_DECAY_GAIN,
                            valueOptions
                        );
                        break;
                    case Gain.CTRL_TARGET_ENV_DECAY_TIME:
                        this.__envelopeTargetOptions.setOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_DECAY_TIME,
                            valueOptions
                        );
                        break;
                    case Gain.CTRL_TARGET_ENV_RELEASE_TIME:
                        this.__envelopeTargetOptions.setOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_RELEASE_TIME,
                            valueOptions
                        );
                        break;
                    case Gain.CTRL_TARGET_ENV_SUSTAIN_TIME:
                        this.__envelopeTargetOptions.setOptionsById(
                            EnvelopeTargetOptions.CTRL_TARGET_ENV_SUSTAIN_TIME,
                            valueOptions
                        );
                        break;
                }
            }
        });

        return ControlTargetOptions;
    }
);
