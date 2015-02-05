define(
    [
        'dejavu',
    ]
    , function(
        dejavu
    ) {
        return dejavu.Class.declare({
                $name: 'PointValue',

                /** @type {Number} */
                _gain: null,

                /** @type {Number} */
                _time: null,

                /**
                 * @return {Number}
                 */
                getGain: function() {
                    return this._gain;
                },

                /**
                 * @return {Number}
                 */
                getTime: function() {
                    return this._time;
                },

                /**
                 * @param {Number} gain
                 * @param {Number} time
                 */
                initialize: function(gain, time) {
                    this._gain = gain;
                    this._time = time;
                }
            }
        );
    }
);
