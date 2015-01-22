define(['dejavu', 'app/controls/Control'], function(dejavu, Control){
    var UIControl = dejavu.Class.declare({
        $name: 'UIControl',

        $extends: Control,

        _value: null,
        _clickCounter: null,
        _clickEventTStamp: null,
        _selected: null,

        getValue: function() {
            return this._value;
        },
        setValue: function(value) {
            this._value = value;
        },

        getClickCounter: function() {
            return this._clickCounter;
        },
        setClickCounter: function(clickCounter) {
            this._clickCounter = clickCounter;
        },

        getClickEventTStamp: function() {
            return this._clickEventTStamp;
        },
        setClickEventTStamp: function(clickEventTStamp) {
            this._clickEventTStamp = clickEventTStamp;
        },

        getSelected: function() {
            return this._selected;
        },
        setSelected: function(selected) {
            this._selected = selected;
        },

        initialize: function(id, position, value, canvasState) {
            this.$super(id, position, canvasState);
            this._value    = value;
            this._selected = false;
        }
    });
    return UIControl;
});
