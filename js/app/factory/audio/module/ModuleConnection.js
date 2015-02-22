/**
 * @namespace Snautsynth.Factory.Audio.Module
 */
define(
    [
        'dejavu',
        'app/audio/module/ModuleConnection',
        'app/factory/audio/module/ChannelConnection'
    ],
    function(
        dejavu,
        ModuleConnection,
        ChannelConnectionFactory
    ) {
    'use strict';

    /** @class Snautsynth.Factory.Audio.Module.ModuleConnection */
    return dejavu.Class.declare({
        $name: 'ModuleConnection',

        /**
         * @memberof Snautsynth.Factory.Audio.Module.ModuleConnection
         * @instance
         *
         * @param {Object} options
         *
         * @return {Snautsynth.Audio.Module.ModuleConnection}
         */
        create: function(options) {
            var channelConnectionList    = [];
            var channelConnectionFactory = new ChannelConnectionFactory();

            if (null !== options.channelConnectionList) {
                options.channelConnectionList.forEach(function(channelConnectionOptions) {
                    channelConnectionList.push(channelConnectionFactory.create(channelConnectionOptions));
                });
            }

            return new ModuleConnection(
                options.sourceModuleId,
                options.targetModuleId,
                channelConnectionList
            );
        }
    });
});
