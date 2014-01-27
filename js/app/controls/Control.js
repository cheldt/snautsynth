define(['dejavu'], function(dejavu){
    var Control = dejavu.Class.declare({
        $name: 'Control',

        _id: null,
        _x: null,
        _y: null,
        _value: null,
        _clickCounter: null,
        _clickEventTStamp: null,
        _canvasState: null,
        _selected: null,
        _label: null,

        getId: function() {
            return this._id;
        },
        setId: function(id) {
            this._id = id;
        },

        getX: function() {
            return this._x
        },
        setX: function(x) {
            this._x = x;
        },

        getY: function() {
            return this._y;
        },
        setY: function(y) {
            this._y = y;
        },

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

        getCanvasState: function() {
            return this._canvasState;
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
            this._id = id;
            this._x = x;
            this._y = y;
            this._value = value;
            this._canvasState = canvasState;
            this._selected = false;
            this._label = label;

            var myControl = this;
            canvasState.addListener("mouseout", function() { myControl.setSelected(false); });
        }

    });
    return Control;
});