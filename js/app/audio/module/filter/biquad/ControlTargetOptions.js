/**
 * @namespace Snautsynth.Audio.Module.Filter.Biquad
 */
define(
    [
        'dejavu',
        'app/audio/module/IControlTargetOptionsAccessible',
        'app/audio/module/filter/Biquad',
        'app/audio/module/filter/biquad/ControlTargetOptions'

    ],
    function (
        dejavu,
        IControlTargetOptionsAccessible,
        BiquadFilter,
        ControlTargetOptions
    ) {
        'use strict';

        /**
         * @class      Snautsynth.Audio.Module.Filter.Biquad.ControlTargetOptions
         * @implements Snautsynth.Audio.Module.IControlTargetOptionsAccessable
         */
        return dejavu.Class.declare({
            $name: 'ControlTargetOptions',

            $implements: [IControlTargetOptionsAccessible],

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __frequencyOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __qualityFactorOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.DiscreteValueOptions}
             */
            __typeOptions: null,

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
                    case BiquadFilter.CTRL_TARGET_FREQUENCY:
                        return this.__frequencyOptions;
                    case BiquadFilter.CTRL_TARGET_QUALITY_FACTOR:
                        return this.__qualityFactorOptions;
                    case BiquadFilter.CTRL_TARGET_TYPE:
                        return this.__typeOptions;
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
                    case BiquadFilter.CTRL_TARGET_FREQUENCY:
                        this.__frequencyOptions = valueOptions;
                        break;
                    case BiquadFilter.CTRL_TARGET_QUALITY_FACTOR:
                        this.__qualityFactorOptions = valueOptions;
                        break;
                    case BiquadFilter.CTRL_TARGET_TYPE:
                        this.__typeOptions = valueOptions;
                        break;
                    default:
                        return null;
                }
            }
        });
    }
);
