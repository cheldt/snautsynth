define(['dejavu'], function(dejavu){
    var Control = dejavu.Class.declare({
        $name: 'Control',

        _id: null,
        _x: null,
        _y: null,
        _canvasState: null,

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

        getCanvasState: function() {
            return this._canvasState;
        },

        initialize: function(id, x, y, canvasState) {
            this._id = id;
            this._x = x;
            this._y = y;
            this._canvasState = canvasState;
        }

    });
    return Control;
});