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
         * @protected
         *
         * @type {number}
         */
        _gain: null,

        /**
         * @memberof Snautsynth.Control.UI.Envelope.PointValue
         * @instance
         * @protected
         *
         * @type {number}
         */
        _time: null,

        /**
         * @memberof Snautsynth.Control.UI.Envelope.PointValue
         * @instance
         *
         * @return {number}
         */
        getGain: function() {
            return this._gain;
        },

        /**
         * @memberof Snautsynth.Control.UI.Envelope.PointValue
         * @instance
         *
         * @return {number}
         */
        getTime: function() {
            return this._time;
        },

        /**
         * @constructor
         * @class Snautsynth.Control.UI.Envelope.PointValue
         *
         * @param {number} gain
         * @param {number} time
         */
        initialize: function(gain, time) {
            this._gain = gain;
            this._time = time;
        }
    });
});
