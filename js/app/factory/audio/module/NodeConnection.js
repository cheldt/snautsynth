/**
 * @namespace Snautsynth.Factory.Audio.Module
 */
define(['dejavu', 'app/audio/module/NodeConnection'], function(dejavu, NodeConnection) {
    'use strict';

    return dejavu.Class.declare({
        $name: 'NodeConnection',

        /**
         * @memberof Snautsynth.Audio.Module.NodeConnection
         * @instance
         * @protected
         *
         * @type {number}
         */
        _controlId:   null,

        /**
         * @memberof Snautsynth.Audio.Module.NodeConnection
         * @instance
         * @protected
         *
         * @type {number}
         */
        _moduleId:    null,

        /**
         * @memberof Snautsynth.Audio.Module.NodeConnection
         * @instance
         *
         * @returns {number}
         */
        getSourceModuleId: function() {
            return this._controlId;
        },

        /**
         * @memberof Snautsynth.Audio.Module.NodeConnection
         * @instance
         *
         * @returns {number}
         */
        getTargetModuleId: function() {
            return this._moduleId;
        },

        /**
         * @memberof Snautsynth.Factory.Audio.Module.NodeConnection
         * @instance
         *
         * @param {Object} options
         *
         * @return {Snautsynth.Audio.Module.NodeConnection}
         */
        create: function (options) {
            return new NodeConnection(options.sourceModuleId, options.targetModuleId);
        }
    });
});