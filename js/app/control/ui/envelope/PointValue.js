/**
 * @namespace Snautsynth.Control.UI.Envelope
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    return dejavu.Class.declare({
        $name: 'PointValue',

        /**
         * @memberof Snautsynth.Control.UI.Envelope.PointValue
         * @instance
         * @private
         *
         * @type {number}
         */
        __pointId: null,

        /**
         * @memberof Snautsynth.Control.UI.Envelope.PointValue
         * @instance
         * @private
         *
         * @type {number}
         */
        __gain: null,

        /**
         * @memberof Snautsynth.Control.UI.Envelope.PointValue
         * @instance
         * @private
         *
         * @type {number}
         */
        __time: null,

        /**
         * @memberof Snautsynth.Control.UI.Envelope.PointValue
         * @instance
         *
         * @return {number}
         */
        getPointId: function() {
            return this.__pointId;
        },

        /**
         * @memberof Snautsynth.Control.UI.Envelope.PointValue
         * @instance
         *
         * @return {number}
         */
        getGain: function() {
            return this.__gain;
        },

        /**
         * @memberof Snautsynth.Control.UI.Envelope.PointValue
         * @instance
         *
         * @return {number}
         */
        getTime: function() {
            return this.__time;
        },

        /**
         * @constructor
         * @class Snautsynth.Control.UI.Envelope.PointValue
         *
         * @param {number} pointId
         * @param {number} gain
         * @param {number} time
         */
        initialize: function(pointId, gain, time) {
            this.__pointId = pointId;
            this.__gain    = gain;
            this.__time    = time;
        }
    });
});
