/**
 * @namespace Snautsynth.Factory.Audio.Module.Mixing
 */
define(
    [
        'dejavu',
        'app/audio/module/mixing/Gain',
        'app/factory/audio/module/Module'
    ],
    function(
        dejavu,
        Gain,
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
                return new Gain(
                    options.id,
                    audioContext,
                    options.gain,
                    this.createModuleConnectionList(options)
                );
            }
        });
    }
);