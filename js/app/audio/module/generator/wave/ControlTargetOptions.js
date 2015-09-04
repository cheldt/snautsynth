/**
 * @namespace Snautsynth.Audio.Module.Generator.Wave
 */
define(
    [
        'dejavu',
        'app/audio/module/IControlTargetOptionsAccessible'
    ],
    function (
        dejavu,
        IControlTargetOptionsAccessible
    ) {
        'use strict';

        /**
         * @class      Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
         * @implements Snautsynth.Audio.Module.IControlTargetOptionsAccessable
         */
        var ControlTargetOptions = dejavu.Class.declare({
            $name: 'ControlTargetOptions',

            $implements: [IControlTargetOptionsAccessible],

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            _gainOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            _tuneCentsOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            _tuneHalftonesOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            _tuneOctavesOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            _wavetypeOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @public
             *
             * @param {number} ctrlTargetId
             *
             * @return {Snautsynth.DataType.ValueOptions}
             */
            getOptionsById: function(ctrlTargetId) {
                switch (ctrlTargetId) {
                    case Wave.CTRL_TARGET_VALUE_GAIN:
                        return this._gainOptions;
                    case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                        return this._wavetypeOptions;
                    case Wave.CTRL_TARGET_VALUE_TUNE_CENTS:
                        return this._tuneCentsOptions;
                    case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                        return this._tuneHalftonesOptions;
                    case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                        return this._tuneOctavesOptions;
                    default:
                        return null;
                }
            },

            /**
             * @param {number}                           ctrlTargetId
             * @param {Snautsynth.DataType.ValueOptions} valueOptions
             */
            setOptionsById: function(ctrlTargetId, valueOptions) {
                switch (ctrlTargetId) {
                    case Wave.CTRL_TARGET_VALUE_GAIN:
                        this._gainOptions = valueOptions;
                        break;
                    case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                        this._wavetypeOptions = valueOptions;
                        break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_CENTS:
                        this._tuneCentsOptions = valueOptions;
                        break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                        this._tuneHalftonesOptions = valueOptions;
                        break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                        this._tuneOctavesOptions = valueOptions;
                        break;
                }
            }
        });

        return ControlTargetOptions;
    }
);