/**
 * @namespace Snautsynth.Audio.Module
 */
define(
    [
        'dejavu',
        'app/audio/module/IConnectable',
        'app/audio/module/IConnecting'
    ],
    function(
        dejavu,
        IConnectable,
        IConnecting
    ) {
    'use strict';

    return dejavu.Class.declare({
        $name: 'Module',

        /**
         * @memberof Snautsynth.Audio.Module.Module
         * @instance
         * @protected
         *
         * @type {AudioContext}
         */
        _audioContext: null,

        /**
         * @memberof Snautsynth.Audio.Module.Module
         * @instance
         * @protected
         *
         * @type {number}
         */
        _id: null,

        /**
         * @memberof Snautsynth.Audio.Module.Module
         * @instance
         * @protected
         *
         * @type {Array.<Snautsynth.Audio.Module.ModuleConnection>}
         */
        _moduleConnectionList: null,

        _controlTargetOptions: null,

        /**
         * @memberof Snautsynth.Audio.Module.Module
         * @instance
         *
         * @returns {number}
         */
        getId: function() {
            return this._id;
        },

        /**
         * @memberof Snautsynth.Audio.Module.Module
         * @instance
         *
         * @return {Array.<Snautsynth.Audio.Module.ModuleConnection>}
         */
        getModuleConnectionList: function() {
            return this._moduleConnectionList;
        },

        /**
         * @constructor
         * @class Snautsynth.Audio.Module.Mixing.Gain
         *
         * @param {number}                                                  id
         * @param {AudioContext}                                            audioContext
         * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>}        moduleConnectionList
         * @param {Snautsynth.Audio.Module.IControlTargetOptionsAccessable} controlTargetOptions
         */
        initialize: function(id, audioContext, moduleConnectionList, controlTargetOptions) {
            this._id                   = id;
            this._audioContext         = audioContext;
            this._moduleConnectionList = moduleConnectionList;
            this._controlTargetOptions = controlTargetOptions;
        },


        /**
         * Set reference for source- and target-module
         * to module-connection
         *
         * @memberof Snautsynth.Audio.Module.Module
         * @instance
         *
         * @param {Array.<Snautsynth.Audio.Module.Module>} moduleList
         */
        setupModuleConnections: function(moduleList) {
            if (null === this._moduleConnectionList) {
                return;
            }

            this._moduleConnectionList.forEach(function(moduleConnection) {
                moduleList.forEach(function(module) {
                    if (module.getId() === moduleConnection.getSourceModuleId()) {
                        moduleConnection.setSourceModule(module);
                    }

                    if (module.getId() === moduleConnection.getTargetModuleId()) {
                        moduleConnection.setTargetModule(module);
                    }
                });
            });

            this.connectChannels();
        },

        /**
         * @memberof Snautsynth.Audio.Module.Module
         * @instance
         */
        connectChannels: function () {
            if (!dejavu.instanceOf(this, IConnecting)) {
                return;
            }

            this._moduleConnectionList.forEach(function(moduleConnection) {
                var sourceNode = moduleConnection.getSourceModule().getSourceNode();
                var targetNode = moduleConnection.getTargetModule().getTargetNode();

                moduleConnection.getChannelConnectionList().forEach(function (channelConnection) {
                    channelConnection.setSourceNode(sourceNode);
                    channelConnection.setTargetNode(targetNode);
                    channelConnection.connectNodes();
                });
            });
        },

        /**
         * @memberof Snautsynth.Audio.Module.Module
         * @instance
         *
         * @param {Object} targetObject
         * @param {string} methodName
         *
         * @return {Function}
         */
        bindCallback: function(targetObject, methodName) {
            return function(value, time) {
                targetObject[methodName](value, time);
            };
        }
    });
});