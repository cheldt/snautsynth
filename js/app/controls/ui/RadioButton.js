define(['dejavu', 'app/event/Event', 'app/controls/ui/UIControl','mout/lang/defaults'], function(dejavu, Event, UIControl, defaults){
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
	
	getRadius: function() {
	    return this._radius;
	},

        $constants: {
            BUTTON_RADIUS:           10,
            LABEL_DISPLAY_FONT_SIZE: 18,
            LABEL_BUTTON_SPACE:      2,
            BORDER_WIDTH:            3
        },

        initialize: function(id, x, y, canvasState, label, value, color, checkedColor, radius) {
            this.$super(id, x, y, value, canvasState, label);
	    
	    this._radius = defaults(radius, RadioButton.BUTTON_RADIUS);
	    
	    
            this._canvasState  = canvasState;
            this._checkedColor = checkedColor;
            this._color        = color;

            this._labelText    = label;
            this._value        = value;

            // create button
            this._buttonCircle = new Kinetic.Circle({
                x:      this.getX() + this._radius + RadioButton.BORDER_WIDTH,
                y:      this.getY() + this._radius + RadioButton.BORDER_WIDTH,

                radius: this._radius,
                fill:   color
            });

            this._kineticGroup.add(this._buttonCircle);

            // create button border
            var arc = new Kinetic.Arc({
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
            var label = new Kinetic.Text({
               fill:     '#000',
               fonzSize: RadioButton.LABEL_DISPLAY_FONT_SIZE,
               text:     this._label
            });

            $textHeight = label.getTextHeight();

            label.setX(this._buttonCircle.getX() + this._radius + RadioButton.LABEL_BUTTON_SPACE);
            label.setY(this._buttonCircle.getY() - $textHeight / 2);

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