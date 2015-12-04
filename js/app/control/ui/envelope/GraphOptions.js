/**
 * @namespace Snautsynth.Control.UI.Envelope
 */
define(
    [
        'dejavu',
        'app/control/ui/ControlOptions'
    ],
    function (
        dejavu,
        ControlOptions
    ) {
        'use strict';

        var GraphOptions = dejavu.Class.declare({
            $name: 'GraphOptions',

            $extends: ControlOptions,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.GraphOptions
             * @instance
             *
             * @type {number}
             */
            __maxTime: null,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.GraphOptions
             * @instance
             *
             * @type {string}
             */
            __pointColor: null,

            /**
             * @memberof Snautsynth.Control.UI.Envelope.GraphOptions
             * @instance
             *
             * @return {number}
             */
            getMaxTime: function() {
                return this.__maxTime;
            },

            /**
             * @memberof Snautsynth.Control.UI.Envelope.GraphOptions
             * @instance
             *
             * @return {string}
             */
            getPointColor: function() {
                return this.__pointColor;
            },

            /**
             * @class Snautsynth.Control.UI.Envelope.GraphOptions
             * @constructor
             *
             * @param {string} color
             * @param {string} selectedColor
             * @param {string} pointColor
             */
            initialize: function(color, selectedColor, pointColor, maxTime) {
                this.$super(color, selectedColor);

                this.__maxTime    = maxTime;
                this.__pointColor = pointColor;
            }
        });

        return GraphOptions;
    }
);