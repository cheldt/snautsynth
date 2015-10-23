/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /**
     * @class Snautsynth.Audio.Module.IEnvelopeModable
     * @interface
     */
    return dejavu.Interface.declare({
        $name: 'IEnvelopeModable',

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @return {number}
         */
        //getAttackGain: function() {},

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @param {number} attackGain
         */
        setAttackGain: function(attackGain) {},

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @return {number}
         */
        //getDecayGain: function() {},

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @param {number} decayGain
         */
        setDecayGain: function(decayGain) {},

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @return {number}
         */
        //getDecayTime: function() {},

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @param {number} decayTime
         */
        setDecayTime: function(decayTime) {},

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @return {number}
         */
        //getSustainTime: function() {},

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @param {number} sustainTime
         */
        setSustainTime: function(sustainTime) {},

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @return {number}
         */
        //getReleaseTime: function() {},

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @param {number} releaseTime
         */
        setReleaseTime: function(releaseTime) {},

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @param {Snautsynth.Audio.Module.EnvelopeValues} envelopeValues
         */
        //setEnvelopeValues: function(envelopeValues) {}

        /**
         * @memberof Snautsynth.Audio.Module.IEnvelopeModable
         * @abstract
         * @instance
         *
         * @param {number} currentTime
         */
        triggerEnvelope: function(currentTime) {}

    });
});
