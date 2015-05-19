/**
 * @namespace Snautsynth.Control.UI.DiscreteControl
 */
define(
    [
        'app/event/Event',
        'app/control/ui/discretecontrol/DiscreteControl',
        'dejavu',
        'app/control/ui/discretecontrol/KeyValue'
    ],
    function(
        Event,
        DiscreteControl,
        dejavu,
        KeyValue
    ) {
        'use strict';

        var Keyboard = dejavu.Class.declare({
            $name: 'Keyboard',

            $extends: DiscreteControl,



            /**
             * @constructor
             * @class   Snautsynth.Control.UI.DiscreteControl.Keyboard
             * @extends Snautsynth.Control.UI.DiscreteControl
             *
             * @param {number}                                   id
             * @param {Snautsynth.Canvas.CanvasState}            canvasState
             * @param {Snautsynth.DataType.DiscreteValueOptions} discreteValueOptions
             */
            initialize: function(id, canvasState, discreteValueOptions) {
                this.$super(id, new Position(0, 0), null, canvasState, discreteValueOptions);

                var myKeyboard = this;

                window.addEventListener("keyup", function(e) {
                    myKeyboard.getCanvasState().getBaseLayer().setAttr(
                        'event',
                        new Event(
                            myRadioGroup.getId(),
                            new KeyValue(e.keyCode, Keyboard.KEY_STATE_UP),
                            Event.TYPE_VALUE_CHANGED
                        )
                    );
                });

                window.addEventListener("keydown", function(e) {
                    myKeyboard.getCanvasState().getBaseLayer().setAttr(
                        'event',
                        new Event(
                            myRadioGroup.getId(),
                            new KeyValue(e.keyCode, Keyboard.KEY_STATE_DOWN),
                            Event.TYPE_VALUE_CHANGED
                        )
                    );
                });
            }
        });
    }
);
