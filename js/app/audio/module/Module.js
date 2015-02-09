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
        _id:           null,

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
         * @constructor
         * @class Snautsynth.Audio.Module.Module
         *
         * @param {number} id
         * @param {AudioContext} audioContext
         */
        initialize: function(id, audioContext) {
            this._id           = id;
            this._audioContext = audioContext;
        }
    });
});