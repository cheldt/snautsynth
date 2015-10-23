/**
 * @namespace Snautsynth.Factory.Audio.Module.Mixing
 */
define(
    [
        'dejavu',
        'app/audio/module/mixing/Gain',
        'app/factory/audio/module/mixing/gain/ControlTargetOptions',
        'app/factory/audio/module/EnvelopeValues',
        'app/factory/audio/module/Module'
    ],
    function(
        dejavu,
        Gain,
        ControlTargetOptionsFactory,
        EnvelopeValuesFactory,
        ModuleFactory
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Audio.Module.Mixing.Gain */
        return dejavu.Class.declare({
            $name: 'Gain',

            $extends: ModuleFactory,

            /**
             * @memberof Snautsynth.Factory.Audio.Module.Mixing.Gain
             * @instance
             *
             * @param {AudioContext} audioContext
             * @param {Object}       options
             *
             * @return {Snautsynth.Audio.Module.Mixing.Gain}
             */
            create: function(audioContext, options) {

                var controlTargetOptionsFactory = new ControlTargetOptionsFactory();
                var envelopeValuesFactory       = new EnvelopeValuesFactory();
                var envelopeValues              = null;

                if (null !== options.envelopeValues) {
                    envelopeValues = envelopeValuesFactory.create(options.envelopeValues);
                }

                return new Gain(
                    options.id,
                    audioContext,
                    options.gain,
                    envelopeValues,
                    this.createModuleConnectionList(options),
                    controlTargetOptionsFactory.create(options.controlTargetOptions)
                );
            }
        });
    }
);