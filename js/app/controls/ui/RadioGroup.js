define(['dejavu', 'app/controls/ui/UiControl',  'app/utils/String'], function(dejavu, UiControl, StringUtils){
    var RadioGroup = dejavu.Class.declare({
        $name: 'RadioGroup',

        $extends: UiControl,

        _radioButtons: null,
        _radius: null,
        _fontSize: null,
        _maxButtonY: null,
        _maxButtonX: null,
        _startButtonY: null,
        _startLabelY: null,
        _fontFormatStr: null,

        initialize: function (id, x, y, value, canvasState, label, radius) {
            this.$super(id, x, y, value, canvasState, label);

            this._radioButtons = [];
            this._radius = radius;
            this._fontSize = 18;

            this._startButtonY = this._y + 30;
            this._startLabelY = this._y + this._fontSize * 0.7;

            this._maxButtonY = this._startButtonY;

            this._fontFormatStr = StringUtils.multiReplace("normal normal %FONTSIZE%px droid sans",{ "%FONTSIZE%" : this._fontSize });

            var myBtn = this;
            canvasState.addListener("mousedown", function(mousePos) { myBtn.update(mousePos.getX(),mousePos.getY()); });
        },

        addButton: function(radioButton) {
            if(radioButton.getValue() == this._value)
                radioButton.setSelected(true);

            radioButton.setX(this._x);
            radioButton.setY(this._maxButtonY);
            radioButton.setRadius(this._radius);


            this._radioButtons.push(radioButton);
            this._maxButtonY += this._radius * 2.1;
        },

        draw: function() {
            var btnRadius = this._radius;
            var ctx = this._canvasState.getCanvasContext();

            ctx.beginPath();
            ctx.font = this._fontFormatStr;
            ctx.fillStyle = "#000";
            ctx.fillText(this._label, this._x, this._startLabelY);

            var buttonCount = this._radioButtons.length;
            for(var arrayIndex = 0; arrayIndex < buttonCount; ++ arrayIndex) {
                var radioButton = this._radioButtons[arrayIndex];
                radioButton.draw(ctx, btnRadius, this._fontFormatStr);
            }
        },

        contains: function(mouseX, mouseY) {
            var buttonCount = this._radioButtons.length;
            for(var arrayIndex = 0; arrayIndex < buttonCount; ++ arrayIndex) {
                if(this._radioButtons[arrayIndex].contains(mouseX, mouseY) === true)
                    return true;
            }
            return false;
        },

        update: function(mouseX, mouseY) {

            if(this.contains(mouseX,mouseY)) {
                var buttonCount = this._radioButtons.length;
                for(var arrayIndex = 0; arrayIndex < buttonCount; ++ arrayIndex) {
                    var radioBtn = this._radioButtons[arrayIndex];
                    if(radioBtn.contains(mouseX,mouseY)) {
                        this._value = radioBtn.getValue();
                        radioBtn.setSelected(true);
                        this._canvasState.fire("valuechanged", this, { value: this._value, id:  this._id});
                    } else {
                        radioBtn.setSelected(false);
                    }
                }
            }
        }
    });
    return RadioGroup;
});
//@ sourceURL=RadíoGroup.js