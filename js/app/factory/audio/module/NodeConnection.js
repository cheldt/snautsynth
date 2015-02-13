/**
 * @namespace Snautsynth.Factory.Audio.Module
 */
define(['dejavu', 'app/audio/module/NodeConnection'], function(dejavu, NodeConnection) {
    'use strict';

    /** @class Snautsynth.Factory.Audio.Module.NodeConnection */
    return dejavu.Class.declare({
        $name: 'NodeConnection',

        /**
         * @memberof Snautsynth.Factory.Audio.Module.NodeConnection
         * @instance
         *
         * @param {Object} options
         *
         * @return {Snautsynth.Audio.Output.Destination}
         */
        create: function(options) {
            return new NodeConnection(
                options.sourceChannelNumber,
                options.targetChannelNumber
            );
        }
    });
});
