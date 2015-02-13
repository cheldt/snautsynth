/**
 * @namespace Snautsynth.Audio.Module.Output
 */
define(
    [
        'dejavu',
        'app/audio/module/Module',
        'app/audio/module/IConnectable',
        'app/audio/module/IConnecting'
    ],
    function(
        dejavu,
        Module,
        IConnectable,
        IConnecting
    ) {

        'use strict';

        return dejavu.Class.declare({
            $name: 'Destination',

            $extends: Module,

            $implements: [IConnectable],

            /**
             * @constructor
             * @class      Snautsynth.Audio.Module.Output.Destination
             * @extends    Snautsynth.Audio.Module.Module
             * @implements Snautsynth.Audio.Module.IControlable
             *
             * @param {number}       id
             * @param {AudioContext} audioContext
             */
            initialize: function(id, audioContext) {
                this.$super(id, audioContext, null);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Output.Destination
             * @instance
             *
             * @param {Array.<Snautsynth.Audio.Module.Module>} moduleList
             */
            registerInputNodes: function (moduleList) {
                var currentModuleId = this._id;
                var audioContext    = this._audioContext;

                moduleList.forEach(function(module) {
                    if (!dejavu.instanceOf(module, IConnecting)) {
                        return;
                    }

                    module.getModuleConnectionList().forEach(function(moduleConnection) {
                        if (moduleConnection.getTargetModuleId() !== currentModuleId) {
                            return;
                        }

                        moduleConnection.getNodeConnectionList().forEach(function(nodeConnection) {
                            nodeConnection.setTargetNode(audioContext.destination);
                        });
                    });
                });
            }
        });
    }
);
