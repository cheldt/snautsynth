/**
 * @namespace Snautsynth.Factory.Audio.Module.Generator
 */
define(
    [
        'dejavu',
        'app/audio/module/generator/Wave',
        'app/factory/audio/module/generator/wave/ControlTargetOptions',
        'app/factory/audio/module/EnvelopeValues',
        'app/factory/audio/module/Module'
    ],
    function(
        dejavu,
        Wave,
        ControlTargetOptionsFactory,
        EnvelopeValuesFactory,
        ModuleFactory
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Audio.Module.Generator.Wave */
        return dejavu.Class.declare({
            $name: 'Wave',

            $extends: ModuleFactory,

            /**
             * @memberof Snautsynth.Factory.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {AudioContext} audioContext
             * @param {Object}       options
             *
             * @return {Snautsynth.Audio.Module.Generator.Wave}
             */
            create: function(audioContext, options) {
                var controlTargetOptionsFactory = new ControlTargetOptionsFactory();
                var envelopeValuesFactory       = new EnvelopeValuesFactory();
                var envelopeValues              = null;

                if (null != options.envelopeValues) {
                    envelopeValues = envelopeValuesFactory.create(options.envelopeValues);
                }

                return new Wave(
                    options.id,
                    audioContext,
                    options.tuning,
                    options.waveType,
                    options.gain,
                    envelopeValues,
                    this.createModuleConnectionList(options),
                    controlTargetOptionsFactory.create(options.controlTargetOptions)
                );
            }
        });
    }
);