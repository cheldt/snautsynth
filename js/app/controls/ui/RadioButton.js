define(['dejavu', 'app/controls/ui/UiControl',  'app/utils/String'], function(dejavu, UiControl, StringUtils){
    var RadioButton = dejavu.Class.declare({
        $name: 'RadioButton',

        $extends: UiControl,

        _label: null,
        _value: null,
        _color: null,
        _selectedColor: null,
        _selected: null,
        _radius: null,
        _labelWidth: null,
        _fontFormatStr: null,
        _fontSize: null,

        getLabel: function() {
            return this._label;
        },

        getValue: function() {
            return this._value;
        },

        getSelected: function() {
            return this._selected;
        },
        setSelected: function(selected) {
            this._selected = selected;
        },

        setRadius: function(radius) {
            this._radius = radius;
        },

        contains: function(mouseX, mouseY) {
            var knobDiam = this._radius * 2;

            if( (mouseY > this._y && mouseY < this._y + knobDiam)
                &&
                (mouseX > this._x && mouseX < this._x + knobDiam + this._labelWidth)
              )
                return true;
            else
                return false;
        },

        initialize: function(canvasState, label, value, color, selectedColor) {
            this.$super(0, 0, 0, value, canvasState, label);

            this._label = label;
            this._value = value;
            this._color = color;
            this._selectedColor = selectedColor;
            this._canvasState = canvasState;

            this._fontSize = 18;
            this._fontFormatStr = StringUtils.multiReplace("normal normal %FONTSIZE%px droid sans",{ "%FONTSIZE%" : this._fontSize });
            var ctx = this._canvasState.getCanvasContext();
            ctx.font = this._fontFormatStr;

            this._labelWidth = ctx.measureText(this._label).width;
        },

        draw: function() {
            var knobX = this._x + this._radius;
            var knobY = this._y + this._radius;

            var ctx = this._canvasState.getCanvasContext();

            ctx.beginPath();
            ctx.arc(knobX, knobY, this._radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = this._color;
            ctx.fill();

            // draw selected marking
            if(this._selected) {
                ctx.beginPath();
                ctx.arc(knobX, knobY, this._radius * 0.5, 0, 2 * Math.PI, false);
                ctx.fillStyle = this._selectedColor;
                ctx.fill();
            }

            // draw label
            ctx.beginPath();
            ctx.font = this._fontFormatStr;
            ctx.fillStyle = "#000";
            ctx.fillText(this._label, knobX + 1.5 * this._radius, knobY + this._radius / 2);
        }
    });
    return RadioButton;
});