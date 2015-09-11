/**
 * @namespace Snautsynth.Audio.Module.Mixing.Gain
 */
define(
    [
        'dejavu',
        'app/audio/module/IControlTargetOptionsAccessible',
        'app/audio/module/mixing/Gain'
    ],
    function (
        dejavu,
        IControlTargetOptionsAccessible,
        Gain
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
             * @protected
             *
             * @type {Snautsynth.DataType.RangeValueOptions}
             */
            _gainOptions: null,

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
                        return this._gainOptions;
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
                        this._gainOptions = valueOptions;
                        break;
                }
            }
        });

        return ControlTargetOptions;
    }
);
