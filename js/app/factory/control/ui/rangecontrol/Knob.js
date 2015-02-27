/**
 * @namespace Snautsynth.Factory.Control.UI.RangeControl
 */
define(
    [
        'app/control/ui/rangecontrol/Knob',
        'app/factory/datatype/RangeValueOptions',
        'app/util/Position',
        'dejavu'
    ],
    function(
        Knob,
        RangeValueOptionsFactory,
        Position,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Control.UI.RangeControl.Knob */
        return dejavu.Class.declare({
            $name: 'Knob',

            /**
             * @memberof Snautsynth.Factory.Control.UI.RangeControl.Knob
             * @instance
             *
             * @param  {Snautsynth.Canvas.CanvasState} canvasState
             * @param  {Object}                        options
             *
             * @return {Snautsynth.Control.UI.RangeControl.Knob}
             */
            create: function(canvasState, options) {
                var position                 = new Position(options.position.x, options.position.y);
                var rangeValueOptionsFactory = new RangeValueOptionsFactory();
                var rangeValueOptions        = rangeValueOptionsFactory.create(options.rangeValueOptions);

                return new Knob(
                    options.id,
                    position,
                    options.value,
                    canvasState,
                    rangeValueOptions,
                    options.radius,
                    options.color
                );
            }
        });
    }
);