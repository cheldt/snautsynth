/**
 * @namespace Snautsynth.Control.UI.DiscreteControl
 */
define(
    [
        'app/event/Event',
        'app/control/ui/UIControl',
        'app/util/Position',
        'dejavu',
        'mout/lang/defaults'
    ],
    function(
        Event,
        UIControl,
        Position,
        dejavu,
        defaults
    ) {
        'use strict';

        var RadioButton = dejavu.Class.declare({
            $name: 'RadioButton',

            $extends: UIControl,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {Konva.Circle}
             */
            _buttonCircle: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {Konva.Arc}
             */
            _buttonBorder: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {boolean}
             */
            _checked: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {Konva.Circle}
             */
            _checkedCircle: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {string}
             */
            _checkedColor: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {string}
             */
            _color: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {string}
             */
            _fontFormatStr: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {number}
             */
            _fontSize: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {Konva.Text}
             */
            _label: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {string}
             */
            _labelText: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {number}
             */
            radius: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions}
             */
            _radioButtonOptions: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             * @protected
             *
             * @type {*}
             */
            _value: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             *
             * @return {boolean}
             */
            getChecked: function() {
                return this._checked;
            },

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             *
             * @param {boolean} checked
             */
            setChecked: function(checked) {
                this._checked = checked;
            },

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             *
             * @return {*}
             */
            getValue: function() {
                return this._value;
            },

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             *
             * @return {number}
             */
            getRadius: function() {
                return this.radius;
            },

            $constants: {
                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                BUTTON_RADIUS:           10,
                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                LABEL_DISPLAY_FONT_SIZE: 18,
                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                LABEL_BUTTON_SPACE:      2,
                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                BORDER_WIDTH:            3,
                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                DEFAULT_COLOR:           '#000',
                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                DEFAULT_CHECKED_COLOR:   '#FFF'
            },

            /**
             * @constructor
             * @class   Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @extends Snautsynth.Control.UI.UIControl
             *
             * @param {number}                                                   id
             * @param {Snautsynth.Canvas.CanvasState}                            canvasState
             * @param {Snautsynth.Control.UI.DiscreteControl.RadioButtonOptions} radioButtonOptions
             */
            initialize: function(id, canvasState, radioButtonOptions) {
                this.$super(
                    id,
                    defaults(radioButtonOptions.getPosition(), new Position(0,0)),
                    radioButtonOptions.getValue(),
                    canvasState
                );

                this._radioButtonOptions = radioButtonOptions;

                this._canvasState  = canvasState;

                // create button
                this._buttonCircle = new Konva.Circle({
                    radius: radioButtonOptions.getRadius(),
                    fill:   radioButtonOptions.getColor()
                });

                this._kineticGroup.add(this._buttonCircle);

                // create button border
                this._buttonBorder = new Konva.Arc({
                    angle:       360,
                    fill:        radioButtonOptions.getColor(),
                    stroke:      radioButtonOptions.getColor()
                });

                this._kineticGroup.add(this._buttonBorder);

                // create label
                this._label = new Konva.Text({
                   fill:     '#000',
                   fontSize: RadioButton.LABEL_DISPLAY_FONT_SIZE,
                   text:     radioButtonOptions.getLabel()
                });

                this._kineticGroup.add(this._label);

                var myRadioButton = this;
                this._kineticGroup.on('click', function(evt) {
                        myRadioButton.getCanvasState().getBaseLayer().setAttr(
                            'event',
                            new Event(
                                myRadioButton.getId(),
                                myRadioButton.getValue(),
                                Event.TYPE_CHECKED_CHANGED
                            )
                        );
                });
            },

            /**
             * Change state and mark as selected
             *
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             *
             * @param {boolean} checked
             */
            changeCheckedState: function(checked) {
                this._checked = checked;

                if(this._checked) {
                    this._buttonCircle.setFill(this._radioButtonOptions.getCheckedColor());
                } else {
                    this._buttonCircle.setFill(this._radioButtonOptions.getColor());
                }
            },

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @instance
             */
            setUp: function() {
                var radius         = this._radioButtonOptions.getRadius();
                var positionOffset = radius + RadioButton.BORDER_WIDTH;

                this._buttonCircle.x(this.getX() + positionOffset);
                this._buttonCircle.y(this.getY() + positionOffset);

                this._buttonBorder.x(this._buttonCircle.getX());
                this._buttonBorder.y(this._buttonCircle.getY());
                this._buttonBorder.innerRadius(radius - RadioButton.BORDER_WIDTH);
                this._buttonBorder.outerRadius(radius);

                var textHeight = this._label.getTextHeight();

                this._label.setX(this._buttonCircle.getX() + radius + RadioButton.LABEL_BUTTON_SPACE);
                this._label.setY(this._buttonCircle.getY() - textHeight / 2);
            }
        });

        return RadioButton;
    }
);