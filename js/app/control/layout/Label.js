define(['dejavu', 'app/control/layout/LayoutControl'], function(dejavu, LayoutControl) {
    var Label = dejavu.Class.declare({
        $name: 'Label',

        $extends: LayoutControl,

        _color: null,
        _text:  null,

        getColor: function() {
            return this._color;
        },
        setColor: function(color) {
            this._color = color;
            return this;
        },

        getText: function() {
            return this._text;
        },
        setText: function(text) {
            this._text = text;
            return this;
        },

        initialize: function(id, position, canvasState, color, text) {
            this.$super(id, position, canvasState);

            this._color = color;
            this._text  = text;

            $textContainer = new Kinetic.Text({
                fill:     color,
                fontSize: 16,
                text:     text
            });

            this._kineticGroup.add($textContainer);
        }

    });

    return Label;
});