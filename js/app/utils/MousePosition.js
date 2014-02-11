define(['dejavu'], function(dejavu) {
    var MousePosition = dejavu.Class.declare({
        $name: 'MousePosition',

        _x: null,
        _y: null,

        setX: function(x) {
            this._x = x;
        },
        getX: function() {
            return this._x;
        },

        setY: function(y) {
            this._y = y;
        },
        getY: function() {
            return this._y;
        },

        initialize: function(x, y) {
            this._x = x;
            this._y = y;
        }
    });
    return MousePosition;
});
