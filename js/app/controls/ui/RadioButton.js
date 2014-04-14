define(['dejavu', 'app/event/Event', 'app/controls/ui/UIControl'], function(dejavu, Event, UIControl){
    var RadioButton = dejavu.Class.declare({
        $name: 'RadioButton',

        $extends: UIControl,

        _checked: null,

        _checkedColor: null,

        _color: null,

        _fontFormatStr: null,

        _fontSize: null,

        _labelText: null,

        _radius: null,

        _buttonCircle: null,

        _checkedCircle: null,

        _value: null,

        getChecked: function() {
            return this._checked;
        },
        setChecked: function(checked) {
            this._checked = checked;
        },

        getValue: function() {
            return this._value;
        },

        $constants: {
            BUTTON_RADIUS:           10,
            LABEL_DISPLAY_FONT_SIZE: 18,
            LABEL_BUTTON_SPACE:      2,
            BORDER_WIDTH:            3
        },

        initialize: function(id, x, y, canvasState, label, value, color, checkedColor) {
            this.$super(id, x, y, value, canvasState, label);

            this._canvasState  = canvasState;
            this._checkedColor = checkedColor;
            this._color        = color;

            this._labelText    = label;
            this._value        = value;

            // create button
            this._buttonCircle = new Kinetic.Circle({
                x:      this.getX(),
                y:      this.getY(),

                radius: RadioButton.BUTTON_RADIUS,
                fill:   color
            });

            this._kineticGroup.add(this._buttonCircle);

            // create button border
            var arc = new Kinetic.Arc({
                x:           this._knobX,
                y:           this._knobY,

                angle:       360,
                fill:        color,
                innerRadius: RadioButton.BUTTON_RADIUS - RadioButton.BORDER_WIDTH,
                outerRadius: RadioButton.BUTTON_RADIUS,
                stroke:      color
            });

            this._kineticGroup.add(arc);

            // create label
            var label = new Kinetic.Text({
               fill:     '#000',
               fonzSize: RadioButton.LABEL_DISPLAY_FONT_SIZE,
               text:     this._label
            });

            $textHeight = label.getTextHeight();

            label.setX(this.getX() + RadioButton.BUTTON_RADIUS + RadioButton.LABEL_BUTTON_SPACE);
            label.setY(this.getY() - $textHeight / 2);

            this._kineticGroup.add(label);

            var myRadioButton = this;
            this._kineticGroup.on('click', function(evt) {
                    myRadioButton.getCanvasState().getBaseLayer().setAttr('event', new Event(
                    myRadioButton.getId(),
                    myRadioButton.getValue(),
                    Event.TYPE_CHECKED_CHANGED
                ));
            });
        },

        /**
         * Change state and mark as selected
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
});