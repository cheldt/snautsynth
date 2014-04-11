define(['dejavu', 'app/controls/Control'], function(dejavu, Control){
    var UIControl = dejavu.Class.declare({
        $name: 'UIControl',

        $extends: Control,

        _value: null,
        _clickCounter: null,
        _clickEventTStamp: null,
        _selected: null,
        _label: null,

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

        getLabel: function() {
            return this._label;
        },
        setLabel: function(label) {
            this._label = label;
        },

        initialize: function(id, x, y, value, canvasState, label) {
            this.$super(id, x, y, canvasState);
            this._value    = value;
            this._selected = false;
            this._label    = label;
        }
    });
    return UIControl;
});
