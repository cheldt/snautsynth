/**
* @namespace Snautsynth.Factory.Control.UI.DiscreteControl
*/
define(
    [
        '../../../../control/ui/discretecontrol/RadioButtonOptions',
        'app/util/Position',
        'dejavu'
    ],
    function(
        RadioButtonOptions,
        Position,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Control.UI.DiscreteControl.RadioButtonOptions */
        return dejavu.Class.declare({
            $name: 'RadioButtonOptions',

            /**
             * @memberof Snautsynth.Factory.Control.UI.DiscreteControl.RadioButtonOptions
             * @instance
             *
             * @param  {Object}                        options
             *
             * @return {Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions}
             */
            create: function(options) {
                var position = null;

                if (null !== options.position) {
                    position = new Position(options.position.x, options.position.y);
                }

                return new RadioButtonOptions(
                    options.value,
                    options.color,
                    options.checkedColor,
                    options.radius,
                    options.label,
                    position
                );
            }
        });
    }
);