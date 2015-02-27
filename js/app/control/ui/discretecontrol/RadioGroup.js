/**
 * @namespace Snautsynth.Control.UI.DiscreteControl
 */
define(
    [
        'app/control/ui/discretecontrol/DiscreteControl',
        'app/control/ui/discretecontrol/RadioButton',
        'app/event/Event',
        'dejavu'
    ],
    function (
        DiscreteControl,
        RadioButton,
        Event,
        dejavu
    ) {
        'use strict';

        return dejavu.Class.declare({
                $name: 'RadioGroup',

                $extends: DiscreteControl,

                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @protected
                 *
                 * @type {number}
                 */
                _lastRadioY: null,

                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @protected
                 *
                 * @type {string}
                 */
                _radioButtonColor: null,

                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @protected
                 *
                 * @type {string}
                 */
                _radioButtonCheckedColor: null,



                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @instance
                 *
                 * @return {string}
                 */
                 getRadioButtonColor: function() {
                     return this._radioButtonColor;
                 },

                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @instance
                 *
                 * @return {string}
                 */
                getRadioButtonCheckedColor: function() {
                    return this._radioButtonCheckedColor;
                },

                /**
                 * @constructor
                 * @class    Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @extends  Snautsynth.Control.UI.UIControl
                 *
                 * @param {number}                                   id
                 * @param {Snautsynth.Util.Position}                 position
                 * @param {*}                                        value
                 * @param {Snautsynth.Canvas.CanvasState}            canvasState
                 * @param {Snautsynth.DataType.DiscreteValueOptions} discreteValueOptions
                 * @param {string}                                   radioButtonColor
                 * @param {string}                                   radioButtonCheckedColor
                 * @param {number}                                   radioButtonRadius
                 */
                initialize: function (
                    id,
                    position,
                    value,
                    canvasState,
                    discreteValueOptions,
                    radioButtonColor,
                    radioButtonCheckedColor,
                    radioButtonRadius
                ) {
                    this.$super(id, position, value, canvasState, discreteValueOptions);

                    this._lastRadioY              = position.getY();
                    this._controls                = [];
                    this._radioButtonColor        = radioButtonColor;
                    this._radioButtonCheckedColor = radioButtonCheckedColor;

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
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @instance
                 *
                 * @param {Snautsynth.Control.UI.RadioButton} radioButton
                 */
                addControl: function (radioButton) {
                    radioButton.setX(this.getPosition().getX());
                    radioButton.setY(this._lastRadioY);

                    this.$super(radioButton);

                    if (radioButton.getValue() === this._value) {
                        radioButton.changeCheckedState(true);
                    }

                    this._lastRadioY += radioButton.getRadius() * 2 + 5;
                },

                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @instance
                 */
                setUp: function() {
                    var radioGroup = this;

                    this.getDiscreteValueList().forEach(function(discreteValue) {
                        radioGroup.addControl(
                            new RadioButton(
                                radioGroup.getId() + discreteValue.getValue(),
                                radioGroup.getCanvasState(),
                                discreteValue.getName(),
                                discreteValue.getValue(),
                                radioGroup.getRadioButtonColor(),
                                radioGroup.getRadioButtonCheckedColor()
                            )
                        );
                    });
                }
            }
        );
    }
);
