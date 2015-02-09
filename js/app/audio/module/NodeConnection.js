/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
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
         * @constructor
         * @class Snautsynth.Audio.Module.NodeConnection
         *
         * @param {number} sourceModuleId
         * @param {number} targetModuleId
         */
        initialize: function(sourceModuleId, targetModuleId) {
            this._controlId = sourceModuleId;
            this._moduleId = targetModuleId;
        }
    });
});