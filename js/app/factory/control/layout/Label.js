/**
 * @namespace Snautsynth.Factory.Control.Layout
 */
define(
    [
        'app/control/layout/Label',
        'app/util/Position',
        'dejavu'
    ],
    function(
        Label,
        Position,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Control.Layout.Label */
        return dejavu.Class.declare({
            $name: 'Label',

            /**
             * @memberof Snautsynth.Factory.Control.Layout.Label
             * @instance
             *
             * @param  {Snautsynth.Canvas.CanvasState} canvasState
             * @param  {Object}                        options
             *
             * @return {Snautsynth.Control.Layout.Label}
             */
            create: function(canvasState, options) {
                var position = new Position(options.position.x, options.position.y);

                return new Label(options.id, position, canvasState, options.color, options.text);
            }
        });
    }
);