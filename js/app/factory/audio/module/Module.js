/**
 * @namespace Snautsynth.Factory.Audio.Module
 */
define(
    [
        'dejavu',
        'app/audio/module/generator/Wave',
        'app/factory/audio/module/ModuleConnection'
    ],
    function(
        dejavu,
        Wave,
        ModuleConnectionFactory
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Audio.Module.Module */
        return dejavu.Class.declare({
            $name: 'Module',

            /**
             * @memberof Snautsynth.Factory.Audio.Module.Module
             * @instance
             *
             * @param {Object} options
             *
             * @return {Array.<Snautsynth.Audio.Module.ModuleConnection>}
             */
            createModuleConnectionList: function(options) {
                var moduleConnectionList = [];
                var moduleConnectionFactory = new ModuleConnectionFactory();

                options.moduleConnectionList.forEach(function(moduleConnectionOptions) {
                    moduleConnectionList.push(moduleConnectionFactory.create(moduleConnectionOptions));
                });

                return moduleConnectionList;
            }
        });
    }
);