/**
 * @namespace Snautsynth.Audio.Module.Generator.Wave
 */
define(
    [
        'dejavu'
    ],
    function (
        dejavu
    ) {
        'use strict';

        /**
         * @class Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
         */
        return dejavu.Class.declare({
            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __attackGain: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __attackTime: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __decayGain: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __decayTime: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __sustainTime: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __releaseTime: null,

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @public
             *
             * @type {number}
             */
            getAttackGain: function() {
                return this.__attackGain;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @public
             *
             * @type {number}
             */
            getAttackTime: function() {
                return this.__attackTime;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @public
             *
             * @type {number}
             */
            getDecayGain: function() {
                return this.__decayGain;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @public
             *
             * @type {number}
             */
            getDecayTime: function() {
                return this.__decayTime;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @public
             *
             * @type {number}
             */
            getSustainTime: function() {
                return this.__sustainTime;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             * @public
             *
             * @type {number}
             */
            getReleaseTime: function() {
                return this.__releaseTime;
            },

            /**
             * @constructor
             * @class Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues
             *
             * @param {number} attackGain
             * @param {number} attackTime
             * @param {number} decayGain
             * @param {number} decayTime
             * @param {number} sustainTime
             * @param {number} releaseTime
             */
            initialize: function(
                attackGain,
                attackTime,
                decayGain,
                decayTime,
                sustainTime,
                releaseTime
            ) {
                this.__attackGain  = attackGain;
                this.__attackTime  = attackTime;
                this.__decayGain   = decayGain;
                this.__decayTime   = decayTime;
                this.__sustainTime = sustainTime;
                this.__releaseTime = releaseTime;
            }
        });
    }
);
