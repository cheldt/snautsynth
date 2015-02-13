/**
 * @namespace Snautsynth.Factory.Audio.Module.Generator
 */
define(['dejavu', 'app/audio/module/generator/Wave'], function(dejavu, Wave) {
    'use strict';

    /** @class Snautsynth.Factory.Audio.Module.Generator.Wave */
    return dejavu.Class.declare({
        $name: 'Wave',

        /**
         * @memberof Snautsynth.Factory.Audio.Module.Generator.Wave
         * @instance
         *
         * @param {AudioContext}                                     audioContext
         * @param {Object}                                           options
         * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>} moduleConnectionList
         *
         * @return {Snautsynth.Audio.Module.Generator.Wave}
         */
        create: function(audioContext, options, moduleConnectionList) {
            return new Wave(
                options.id,
                audioContext,
                options.tuning,
                options.waveType,
                moduleConnectionList
            );
        }
    });
});