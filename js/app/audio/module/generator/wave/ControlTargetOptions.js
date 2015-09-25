/**
 * @namespace Snautsynth.Audio.Module.Generator.Wave
 */
define(
    [
        'dejavu',
        'app/audio/module/generator/Wave',
        'app/audio/module/IControlTargetOptionsAccessible'
    ],
    function (
        dejavu,
        Wave,
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
            __gainOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.DiscreteValueOptions}
             */
            __triggerNoteOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __tuneCentsOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __tuneHalftonesOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            __tuneOctavesOptions: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @protected
             *
             * @type {Snautsynth.DataType.DiscreteValueOptions}
             */
            __wavetypeOptions: null,

            __envelopeOptions: null,

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
                        return this.__gainOptions;
                    case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                        return this.__wavetypeOptions;
                    case Wave.CTRL_TARGET_VALUE_TUNE_CENTS:
                        return this.__tuneCentsOptions;
                    case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                        return this.__tuneHalftonesOptions;
                    case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                        return this.__tuneOctavesOptions;
                    case Wave.CTRL_TARGET_TRIGGER_NOTE:
                        return this.__triggerNoteOptions;
                    default:
                        return null;
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.ControlTargetOptions
             * @instance
             * @public
             *
             * @param {number}                           ctrlTargetId
             * @param {Snautsynth.DataType.ValueOptions} valueOptions
             */
            setOptionsById: function(ctrlTargetId, valueOptions) {
                switch (ctrlTargetId) {
                    case Wave.CTRL_TARGET_VALUE_GAIN:
                        this.__gainOptions = valueOptions;
                        break;
                    case Wave.CTRL_TARGET_VALUE_WAVETYPE:
                        this.__wavetypeOptions = valueOptions;
                        break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_CENTS:
                        this.__tuneCentsOptions = valueOptions;
                        break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_HALFTONES:
                        this.__tuneHalftonesOptions = valueOptions;
                        break;
                    case Wave.CTRL_TARGET_VALUE_TUNE_OCTAVES:
                        this.__tuneOctavesOptions = valueOptions;
                        break;
                    case Wave.CTRL_TARGET_TRIGGER_NOTE:
                        this.__triggerNoteOptions = valueOptions;
                        break;
                }
            }
        });

        return ControlTargetOptions;
    }
);