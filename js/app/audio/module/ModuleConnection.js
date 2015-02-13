/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu', 'app/audio/module/IConnectable'], function(dejavu, IConnectable) {
    'use strict';

    return dejavu.Class.declare({
        /**
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         * @protected
         *
         * @type {Array.<Snautsynth.Audio.Module.NodeConnection>}
         */
        _nodeConnectionList: null,

        /**
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         * @protected
         *
         * @type {Snautsynth.Audio.Module.Module}
         */
        _sourceModule: null,

        /**
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         * @protected
         *
         * @type {Snautsynth.Audio.Module.Module}
         */
        _targetModule: null,

        /**
         * @return {Array.<Snautsynth.Audio.Module.NodeConnection>}
         */
        getNodeConnectionList: function() {
            return this._nodeConnectionList;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         *
         * @return {Snautsynth.Audio.Module.Module}
         */
        getSourceModule: function() {
            return this._sourceModule;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         *
         * @return {Snautsynth.Audio.Module.Module}
         */
        getTargetModule: function() {
            return this._targetModule;
        },

        /**
         * @constructor
         * @class Snautsynth.Audio.Module.ModuleConnection
         *
         * @param {number} sourceModuleId
         * @param {number} targetModuleId
         * @param {Object} moduleList
         */
        initialize: function(sourceModuleId, targetModuleId, moduleList) {
            this._sourceModule = moduleList[sourceModuleId];
            this._targetModule = moduleList[targetModuleId];
        },

        /**
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         *
         * @param {null|number} id
         */
        getNodeConnectionById: function(id) {
            if (null === this._nodeConnectionList) {
                return;
            }

            var foundNodeConnection = null;

            this._nodeConnectionList.some(function(nodeConnection) {
                if (id === nodeConnection.getId()) {
                    foundNodeConnection = nodeConnection;
                    return true;
                }
            });

            return foundNodeConnection;
        }
    });
});