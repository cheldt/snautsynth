/**
 * @namespace Snautsynth.Factory.Audio.Module.Filter
 */
define(
    [
        'dejavu',
        'app/audio/module/filter/Biquad',
        'app/factory/audio/module/generator/wave/ControlTargetOptions',
        'app/factory/audio/module/Module'
    ],
    function(
        dejavu,
        BiquadFilter,
        ControlTargetOptionsFactory,
        ModuleFactory
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Audio.Module.Filter.Biquad */
        return dejavu.Class.declare({
            $name: 'Biquad',
            $extends: ModuleFactory,

            /**
             * @param {AudioContext} audioContext
             * @param {Object}       options
             *
             * @return {Snautsynth.Audio.Module.Filter.Biquad}
             */
            create: function(audioContext, options) {
                var controlTargetOptionsFactory = new ControlTargetOptionsFactory();

                return new BiquadFilter(
                    options.id,
                    audioContext,
                    options.filterType,
                    options.frequency,
                    options.qualityFactor,
                    this.createModuleConnectionList(options),
                    controlTargetOptionsFactory.create(options.controlTargetOptions)
                );
            }
        });
    }
);