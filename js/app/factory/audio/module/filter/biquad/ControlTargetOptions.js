/**
 * @namespace Snautsynth.Factory.Audio.Module.Filter.Biquad
 */
define(
    [
        'dejavu',
        'app/audio/module/mixing/gain/ControlTargetOptions',
        'app/factory/audio/module/ControlTargetOptions'
    ],
    function(
        dejavu,
        ControlTargetOptions,
        ControlTargetOptionsFactory
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Audio.Module.Mixing.Gain.ControlTargetOptions */
        return dejavu.Class.declare({
            $name: 'Wave',

            $extends: ControlTargetOptionsFactory,

            /**
             * @memberof Snautsynth.Factory.Audio.Module.Mixing.Gain.ControlTargetOptions
             * @instance
             *
             * @param {Object} options
             *
             * @return {Snautsynth.Audio.Module.Mixing.Gain.ControlTargetOptions}
             */
            create: function(options) {
                var controlTargetOptions = new ControlTargetOptions();

                this._setOptionsById(options, controlTargetOptions);

                return controlTargetOptions;
            }
        });
    }
);