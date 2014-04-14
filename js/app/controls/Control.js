define(['dejavu','kinetic'], function(dejavu,Kinetic){
    var Control = dejavu.Class.declare({
        $name: 'Control',

        _canvasState: null,

        _id: null,

        _kineticGroup: null,

        getId: function() {
            return this._id;
        },
        setId: function(id) {
            this._id = id;
        },

        getCanvasState: function() {
            return this._canvasState;
        },

        getKineticGroup: function() {
            return this._kineticGroup;
        },

        getX: function() {
            return this._kineticGroup.getX();
        },
        setX: function(x) {
            this._kineticGroup.setX(x);
        },

        getY: function() {
            return this._kineticGroup.getY();
        },
        setY: function(y) {
            this._kineticGroup.setY(y);
        },

        initialize: function(id, x, y, canvasState) {
            this._id           = id;
            this._canvasState  = canvasState;

            // create layer for control
            this._kineticGroup = new Kinetic.Group();

            this._kineticGroup.setX(x);
            this._kineticGroup.setY(y);
        }

    });
    return Control;
});