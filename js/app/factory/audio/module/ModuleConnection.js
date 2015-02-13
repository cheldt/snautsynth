/**
 * @namespace Snautsynth.Factory.Audio.Module
 */
define(['dejavu', 'app/audio/module/ModuleConnection'], function(dejavu, ModuleConnection) {
    'use strict';

    /** @class Snautsynth.Factory.Audio.Module.ModuleConnection */
    return dejavu.Class.declare({
        $name: 'ModuleConnection',

        /**
         * @memberof Snautsynth.Factory.Audio.Module.ModuleConnection
         * @instance
         *
         * @param {Object}                                 options
         * @param {Array.<Snautsynth.Audio.Module.Module>} moduleList
         *
         * @return {Snautsynth.Audio.Output.Destination}
         */
        create: function(options, moduleList) {
            return new ModuleConnection(
                options.sourceModuleId,
                options.targetModuleId,
                moduleList
            );
        }
    });
});
