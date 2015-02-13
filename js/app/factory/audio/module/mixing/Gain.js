/**
 * @namespace Snautsynth.Factory.Audio.Module.Mixing
 */
define(['dejavu', 'app/audio/module/mixing/Gain'], function(dejavu, Gain) {
    'use strict';

    /** @class Snautsynth.Factory.Audio.Module.Mixing.Gain */
    return dejavu.Class.declare({
        $name: 'Gain',

        /**
         * @memberof Snautsynth.Factory.Audio.Module.Mixing.Gain
         * @instance
         *
         * @param {AudioContext}                                     audioContext
         * @param {Object}                                           options
         * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>} moduleConnectionList
         *
         * @return {Snautsynth.Audio.Module.Mixing.Gain}
         */
        create: function(audioContext, options, moduleConnectionList) {
            return new Gain(
                options.id,
                audioContext,
                options.gain,
                moduleConnectionList
            );
        }
    });
});