/**
 * @namespace Snautsynth.Control.UI.DiscreteControl
 */
define(
    [
        'app/control/ui/discretecontrol/DiscreteControl',
        'app/control/ui/discretecontrol/RadioButton',
        'app/event/Event',
        'dejavu',
        'mout/lang/defaults',
        'app/control/ui/discretecontrol/RadioButtonOptions'
    ],
    function (
        DiscreteControl,
        RadioButton,
        Event,
        dejavu,
        defaults,
        RadioButtonOptions
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
                 * @param {number} lastRadioY
                 */
                setLastRadioY: function(lastRadioY) {
                    this._lastRadioY = lastRadioY;
                },

                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @protected
                 *
                 * @return {number}
                 */
                getLastRadioY: function() {
                    return this._lastRadioY;
                },

                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @protected
                 *
                 * @type {Array.<Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions>}
                 */
                _radioButtonOptionsList: null,

                /**
                 * @constructor
                 * @class    Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @extends  Snautsynth.Control.UI.UIControl
                 *
                 * @param {number}                                                           id
                 * @param {Snautsynth.Util.Position}                                         position
                 * @param {*}                                                                value
                 * @param {Snautsynth.Canvas.CanvasState}                                    canvasState
                 * @param {Snautsynth.DataType.DiscreteValueOptions}                         discreteValueOptions
                 * @param {Array.<Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions>} radioButtonOptionsList
                 */
                initialize: function (
                    id,
                    position,
                    value,
                    canvasState,
                    discreteValueOptions,
                    radioButtonOptionsList
                ) {
                    this.$super(id, position, value, canvasState, discreteValueOptions);

                    this._lastRadioY             = position.getY();
                    this._controls               = [];
                    this._radioButtonOptionsList = radioButtonOptionsList;

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

                        radioButtonList.forEach(function(radioButton) {
                            radioButton.changeCheckedState(false);
                        });

                        radioButtonList.forEach(function(radioButton) {
                            if (radioButton.getValue() !== eventObject.getValue()) {
                                return;
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
                        });
                    });
                },

                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioGroup
                 * @instance
                 */
                setUp: function() {
                    var radioGroup             = this;
                    var radioButtonOptionsList = this._radioButtonOptionsList;

                    this._discreteValueOptions.getDiscreteValueList().forEach(function(discreteValue) {
                        var radioButtonOptions = null;

                        if (null !== radioButtonOptionsList) {
                            radioButtonOptionsList.some(function(rbOptions) {
                                if (rbOptions.getValue() == discreteValue.getValue()) {
                                    radioButtonOptions = rbOptions;
                                    return true;
                                }
                            })
                        }

                        if (null === radioButtonOptions) {
                            radioButtonOptions = new RadioButtonOptions(
                                discreteValue.getValue(),
                                null,
                                null,
                                null,
                                discreteValue.getName(),
                                null
                            )
                        }

                        var radioButton = new RadioButton(
                            radioGroup.getId() + discreteValue.getValue(),
                            radioGroup.getCanvasState(),
                            radioButtonOptions
                        );

                        if (null === radioButtonOptions.getPosition()) {
                            radioButton.setX(radioGroup.getX());
                            radioButton.setY(radioGroup.getLastRadioY());
                        }

                        if (radioButton.getValue() === radioGroup.getValue()) {
                            radioButton.changeCheckedState(true);
                        }

                        radioGroup.setLastRadioY(
                            radioGroup.getLastRadioY() + radioButtonOptions.getRadius() * 2 + 5
                        );

                        radioGroup.addControl(radioButton);
                        radioButton.setUp();
                    });
                }
            }
        );
    }
);
