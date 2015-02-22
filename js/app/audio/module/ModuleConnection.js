/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    return dejavu.Class.declare({
        /**
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         * @protected
         *
         * @type {Array.<Snautsynth.Audio.Module.ChannelConnection>}
         */
        _channelConnectionList: null,

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
         * @type {number}
         */
        _sourceModuleId: null,

        /**
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         * @protected
         *
         * @type {Snautsynth.Audio.Module.Module}
         */
        _targetModule: null,

        /**
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         * @protected
         *
         * @type {number}
         */
        _targetModuleId: null,

        /**
         * @return {Array.<Snautsynth.Audio.Module.ChannelConnection>}
         */
        getChannelConnectionList: function() {
            return this._channelConnectionList;
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
         * @param {Snautsynth.Audio.Module.Module} sourceModule
         */
        setSourceModule: function(sourceModule) {
            this._sourceModule = sourceModule;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         *
         * @returns {number}
         */
        getSourceModuleId: function() {
            return this._sourceModuleId;
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
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         *
         * @param {Snautsynth.Audio.Module.Module} targetModule
         */
        setTargetModule: function(targetModule) {
            this._targetModule = targetModule;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ModuleConnection
         * @instance
         *
         * @returns {number}
         */
        getTargetModuleId: function() {
            return this._targetModuleId;
        },

        /**
         * @constructor
         * @class Snautsynth.Audio.Module.ModuleConnection
         *
         * @param {number}                                         sourceModuleId
         * @param {number}                                         targetModuleId
         * @param {Array.<Snautsynth.Audio.Module.ChannelConnection>} channelConnectionList
         */
        initialize: function(sourceModuleId, targetModuleId, channelConnectionList) {
            this._sourceModuleId        = sourceModuleId;
            this._targetModuleId        = targetModuleId;
            this._channelConnectionList = channelConnectionList;
        }
    });
});