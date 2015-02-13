/**
 * @namespace Snautsynth.Factory.Audio.Module.Output
 */
define(['dejavu', 'app/audio/module/output/Destination'], function(dejavu, Destination) {
    'use strict';

    /** @class Snautsynth.Factory.Audio.Module.Output.Destination */
    return dejavu.Class.declare({
        $name: 'Gain',

        /**
         * @memberof Snautsynth.Factory.Audio.Module.Output.Destination
         * @instance
         *
         * @param {AudioContext} audioContext
         * @param {Object}       options
         *
         * @return {Snautsynth.Audio.Module.Output.Destination}
         */
        create: function(audioContext, options) {
            return new Destination(
                options.id,
                audioContext
            );
        }
    });
});