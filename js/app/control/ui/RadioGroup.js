/**
 * @namespace Snautsynth.Control.UI
 */
define(['dejavu', 'app/event/Event', 'app/control/ui/UIControl'], function (dejavu, Event, UIControl) {
    'use strict';

    return dejavu.Class.declare({
        $name: 'RadioGroup',

        $extends: UIControl,

        /**
         * @memberof Snautsynth.Control.UI.UIControl
         * @instance
         * @protected
         *
         * @type {number}
         */
        _lastRadioY: null,

        /**
         * @constructor
         * @class    Snautsynth.Control.UI.RadioGroup
         * @extends  Snautsynth.Control.UI.UIControl
         *
         * @param {number}                        id
         * @param {Snautsynth.Util.Position}      position
         * @param {*}                             value
         * @param {Snautsynth.Canvas.CanvasState} canvasState
         */
        initialize: function (id, position, value, canvasState) {
            this.$super(id, position, value, canvasState);

            this._lastRadioY = position.getY();
            this._controls = [];
            var myRadioGroup = this;

            this._kineticGroup.on('click', function (evt) {
                var eventObject = myRadioGroup.getCanvasState().getBaseLayer().getAttr('event');

                if (typeof eventObject === 'undefined') {
                    return;
                }

                if (eventObject.getType() != Event.TYPE_CHECKED_CHANGED) {
                    return;
                }

                var radioButtonList = myRadioGroup.getControls();
                var ctrCount = radioButtonList.length;

                for (var ctrIndex = 0; ctrIndex < ctrCount; ctrIndex++) {
                    var radioButton = radioButtonList[ctrIndex];
                    radioButton.changeCheckedState(false);
                }

                for (ctrIndex = 0; ctrIndex < ctrCount; ctrIndex++) {
                    var radioButton = radioButtonList[ctrIndex];

                    if (radioButton.getValue() !== eventObject.getValue()) {
                        continue;
                    }

                    radioButton.changeCheckedState(true);

                    myRadioGroup.setValue(radioButton.getValue());

                    myRadioGroup.getCanvasState().getBaseLayer().setAttr(
                        'event',
                        new Event(
                            myRadioGroup.getId(),
                            myRadioGroup.getValue(),
                            Event.TYPE_VALUE_CHANGED
                        )
                    );
                }
            });
        },

        /**
         * @memberof Snautsynth.Control.UI.UIControl
         * @instance
         *
         * @param {Snautsynth.Control.UI.RadioButton} radioButton
         */
        addControl: function (radioButton) {
            radioButton.setY(this._lastRadioY);

            this.$super(radioButton);

            if (radioButton.getValue() === this._value) {
                radioButton.changeCheckedState(true);
            }

            this._lastRadioY += radioButton.getRadius() * 2 + 5;
        }
    });
});
