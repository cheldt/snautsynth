define(['dejavu'], function(dejavu){
    var Event = dejavu.Class.declare({
        $name: 'Event',

        _controlId: null,

        _value: null,

        _type: null,

        $constants: {
            TYPE_VALUE_CHANGED:   1,
            TYPE_CHECKED_CHANGED: 2
        },

        getControlId: function() {
            return this._controlId;
        },
        setControlId: function(controlId) {
            this._controlId = controlId;
            return this;
        },

        getValue: function() {
            return this._value;
        },
        setValue: function(value) {
            this._value = value;
            return this;
        },

        getType: function() {
            return this._type;
        },
        setType: function(type) {
            this._type = type;
            return this;
        },

        initialize: function(controlId, value, type) {
            this._controlId = controlId;
            this._value     = value;
            this._type      = type;
        }
    });

    return Event;
});