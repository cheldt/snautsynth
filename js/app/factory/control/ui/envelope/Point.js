/**
 * @namespace Snautsynth.Factory.Control.UI.Envelope
 */
define(
    [
        'app/control/ui/envelope/Point',
        'app/control/ui/envelope/PointValue',
        'dejavu'
    ],
    function(
        Point,
        PointValue,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Control.UI.Envelope.Point */
        return dejavu.Class.declare({
            $name: 'Point',

            /**
             * @memberof Snautsynth.Factory.Control.UI.Envelope.Point
             * @instance
             *
             * @param {Snautsynth.Canvas.CanvasState}        canvasState
             * @param {Snautsynth.Control.UI.Envelope.Graph} envelopeControl
             * @param {Object}                               options
             *
             * @return {Snautsynth.Control.UI.Envelope.Point}
             */
            create: function(canvasState, envelopeControl, options) {
                //var pointValue = new PointValue(options.value.gain, options.value.time);

                return new Point(
                    options.id,
                    null,
                    canvasState,
                    options.color,
                    envelopeControl
                );
            }
        });
    }
);