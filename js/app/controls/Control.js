define(['dejavu','kinetic'], function(dejavu,Kinetic){
    var Control = dejavu.Class.declare({
        $name: 'Control',

        /** @type {Object} */
        _canvasState:  null,
        /** @type {Object} */
        _controls:     null,
        /** @type {Number} */
        _id:           null,
        /** @type {Object} */
        _kineticGroup: null,

        /**
         * @returns {Object}
         */
        getCanvasState: function() {
            return this._canvasState;
        },

        /**
         * @returns {Object}
         */
        getControls: function() {
            return this._controls;
        },

        /**
         * @returns {Number}
         */
        getId: function() {
            return this._id;
        },

        /**
         * @param {Number} id
         */
        setId: function(id) {
            this._id = id;
        },

        /**
         * @returns {Object}
         */
        getKineticGroup: function() {
            return this._kineticGroup;
        },

        /**
         * @param {Object} position
         */
        setPosition: function(position) {
            this._kineticGroup.setX(position.getX());
            this._kineticGroup.setY(position.getY());
        },

        /**
         * @returns {Number}
         */
        getX: function() {
            return this._kineticGroup.getX();
        },

        /**
         * @param {Number} x
         */
        setX: function(x) {
            this._kineticGroup.setX(x);
        },

        /**
         * @returns {Number}
         */
        getY: function() {
            return this._kineticGroup.getY();
        },

        /**
         * @param {Number} x
         */
        setY: function(y) {
            this._kineticGroup.setY(y);
        },

        /**
         *
         * @param {Number} id
         * @param {Object} position
         * @param {Object} canvasState
         */
        initialize: function(id, position, canvasState) {
            this._id           = id;
            this._canvasState  = canvasState;

            // create layer for control
            this._kineticGroup = new Kinetic.Group();

            this._kineticGroup.setX(position.getX());
            this._kineticGroup.setY(position.getY());
        },

        addControl: function(control) {
            this._controls.push(control);
            this._kineticGroup.add(control.getKineticGroup());
        }

    });
    return Control;
});