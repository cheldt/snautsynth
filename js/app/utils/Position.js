define(['dejavu'], function(dejavu) {
    var Position = dejavu.Class.declare({
        $name: 'Position',

        /** @type {Number} */
        _x: null,
        /** @type {Number} */
        _y: null,

        /**
         * @returns {Number}
         */
        getX: function() {
            return this._x;
        },

        /**
         * @returns {Number}
         */
        getY: function() {
            return this._y;
        },

        /**
         * @param {Number} x
         * @param {Number} y
         */
        initialize: function(x, y) {
            this._x = x;
            this._y = y;
        }
    });

    return Position;
});
