/**
 * @namespace Snautsynth.Factory.Audio.Module
 */
define(['dejavu', 'app/audio/module/ChannelConnection'], function(dejavu, ChannelConnection) {
    'use strict';

    /** @class Snautsynth.Factory.Audio.Module.ChannelConnection */
    return dejavu.Class.declare({
        $name: 'ChannelConnection',

        /**
         * @memberof Snautsynth.Factory.Audio.Module.ChannelConnection
         * @instance
         *
         * @param {Object} options
         *
         * @return {Snautsynth.Audio.Output.Destination}
         */
        create: function(options) {
            return new ChannelConnection(
                options.sourceChannelNumber,
                options.targetChannelNumber
            );
        }
    });
});