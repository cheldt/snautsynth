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
             * @type {boolean}
             */
            _checked: null,

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
            _radius: null,

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
             * @type {Konva.Circle}
             */
            _checkedCircle: null,

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
                return this._radius;
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
                BORDER_WIDTH:            3
            },

            /**
             * @constructor
             * @class   Snautsynth.Control.UI.DiscreteControl.RadioButton
             * @extends Snautsynth.Control.UI.UIControl
             *
             * @param {number}                        id
             * @param {Snautsynth.Canvas.CanvasState} canvasState
             * @param {string}                        labelText
             * @param {*}                             value
             * @param {string}                        color
             * @param {string}                        checkedColor
             * @param {number}                        radius
             */
            initialize: function(id, canvasState, labelText, value, color, checkedColor, radius) {
                this.$super(id, new Position(0, 0), value, canvasState);

                this._radius = defaults(radius, RadioButton.BUTTON_RADIUS);

                this._canvasState  = canvasState;
                this._checkedColor = checkedColor;
                this._color        = color;

                this._labelText    = labelText;
                this._value        = value;

                // create button
                this._buttonCircle = new Konva.Circle({
                    x:      this.getX() + this._radius + RadioButton.BORDER_WIDTH,
                    y:      this.getY() + this._radius + RadioButton.BORDER_WIDTH,

                    radius: this._radius,
                    fill:   color
                });

                this._kineticGroup.add(this._buttonCircle);

                // create button border
                var arc = new Konva.Arc({
                    x:           this._buttonCircle.getX(),
                    y:           this._buttonCircle.getY(),

                    angle:       360,
                    fill:        color,
                    innerRadius: this._radius - RadioButton.BORDER_WIDTH,
                    outerRadius: this._radius,
                    stroke:      color
                });

                this._kineticGroup.add(arc);

                // create label
                var label = new Konva.Text({
                   fill:     '#000',
                   fonzSize: RadioButton.LABEL_DISPLAY_FONT_SIZE,
                   text:     this._labelText
                });

                var textHeight = label.getTextHeight();

                label.setX(this._buttonCircle.getX() + this._radius + RadioButton.LABEL_BUTTON_SPACE);
                label.setY(this._buttonCircle.getY() - textHeight / 2);

                this._kineticGroup.add(label);

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
                    this._buttonCircle.setFill(this._checkedColor);
                } else {
                    this._buttonCircle.setFill(this._color);
                }
            }
        });

        return RadioButton;
    }
);