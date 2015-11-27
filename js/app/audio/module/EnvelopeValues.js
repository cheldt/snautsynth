/**
 * @namespace Snautsynth.Audio.Module
 */
define(
    [
        'dejavu',
        'app/control/ui/envelope/PointValue'
    ],
    function (
        dejavu,
        PointValue
    ) {
        'use strict';

        /**
         * @class Snautsynth.Audio.Module.EnvelopeValues
         */
        return dejavu.Class.declare({
            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __attackGain: null,

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __attackTime: null,

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __decayGain: null,

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __decayTime: null,

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __sustainTime: null,

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @private
             *
             * @type {number}
             */
            __releaseTime: null,

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @return {Snautsynth.Control.UI.Envelope.PointValue}
             */
            getAttack: function() {
              return new PointValue(
                  this.__attackGain,
                  this.__attackTime
              );
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @param {Snautsynth.Control.UI.Envelope.PointValue} pointValue
             */
            setAttack: function(pointValue) {
                this.__attackGain = pointValue.getGain();
                this.__attackTime = pointValue.getTime();
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @return {number}
             */
            getAttackGain: function() {
                return this.__attackGain;
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @param {number} attackGain
             */
            setAttackGain: function(attackGain) {
                this.__attackGain = attackGain;
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @return {number}
             */
            getAttackTime: function() {
                return this.__attackTime;
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @param {number} attackTime
             */
            setAttackTime: function(attackTime) {
                this.__attackTime = attackTime;
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @return {Snautsynth.Control.UI.Envelope.PointValue}
             */
            getDecay: function() {
                return new PointValue(
                    this.__decayGain,
                    this.__decayTime
                );
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @param {Snautsynth.Control.UI.Envelope.PointValue} pointValue
             */
            setDecay: function(pointValue) {
                this.__decayGain = pointValue.getGain();
                this.__decayTime = pointValue.getTime();
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @return {number}
             */
            getDecayGain: function() {
                return this.__decayGain;
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @param {number} decayGain
             */
            setDecayGain: function(decayGain) {
                this.__decayGain = decayGain;
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @return {number}
             */
            getDecayTime: function() {
                return this.__decayTime;
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @param {number} decayTime
             */
            setDecayTime: function(decayTime) {
                this.__decayTime = decayTime;
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @return {Snautsynth.Control.UI.Envelope.PointValue}
             */
            getSustain: function() {
                return new PointValue(
                    this.__decayGain,
                    this.__sustainTime
                );
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @param {Snautsynth.Control.UI.Envelope.PointValue} pointValue
             */
            setSustain: function(pointValue) {
                this.__sustainTime = pointValue.getTime();
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @return {number}
             */
            getSustainTime: function() {
                return this.__sustainTime;
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @param {number} sustainTime
             */
            setSustainTime: function(sustainTime) {
                this.__sustainTime = sustainTime;
            },


            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @return {Snautsynth.Control.UI.Envelope.PointValue}
             */
            getRelease: function() {
                return new PointValue(
                    this.__decayGain,
                    this.__releaseTime
                );
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @param {Snautsynth.Control.UI.Envelope.PointValue} pointValue
             */
            setRelease: function(pointValue) {
                this.__sustainTime = pointValue.getTime();
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @return {number}
             */
            getReleaseTime: function() {
                return this.__releaseTime;
            },

            /**
             * @memberof Snautsynth.Audio.Module.EnvelopeValues
             * @instance
             * @public
             *
             * @param {number} releaseTime
             */
            setReleaseTime: function(releaseTime) {
                this.__releaseTime = releaseTime;
            },

            /**
             * @constructor
             * @class Snautsynth.Audio.Module.EnvelopeValues
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
