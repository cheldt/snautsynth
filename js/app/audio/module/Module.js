/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
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
         * @param {number}                                           id
         * @param {AudioContext}                                     audioContext
         * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>} moduleConnectionList
         */
        initialize: function(id, audioContext, moduleConnectionList) {
            this._id                   = id;
            this._audioContext         = audioContext;
            this._moduleConnectionList = moduleConnectionList;
        }
    });
});