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
        var ControlTargetOptions = dejavu.Class.declare({
            $name: 'ControlTargetOptions',

            $implements: [IControlTargetOptionsAccessible],

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            _frequencyOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            _qualityFactorOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.DiscreteValueOptions}
             */
            _typeOptions: null,

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
                        return this._frequencyOptions;
                    case BiquadFilter.CTRL_TARGET_QUALITY_FACTOR:
                        return this._qualityFactorOptions;
                    case BiquadFilter.CTRL_TARGET_TYPE:
                        return this._typeOptions;
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
                        this._frequencyOptions = valueOptions;
                        break;
                    case BiquadFilter.CTRL_TARGET_QUALITY_FACTOR:
                        this._qualityFactorOptions = valueOptions;
                        break;
                    case BiquadFilter.CTRL_TARGET_TYPE:
                        this._typeOptions = valueOptions;
                        break;
                    default:
                        return null;
                }
            }
        });

        return ControlTargetOptions;
    }
);
