define(
    [
        'dejavu',
    ]
    , function(
        dejavu
    ) {
        return dejavu.Class.declare({
                $name: 'PointValue',

                /** @type {number} */
                _gain: null,

                /** @type {number} */
                _time: null,

                /**
                 * @return {number}
                 */
                getGain: function() {
                    return this._gain;
                },

                /**
                 * @return {number}
                 */
                getTime: function() {
                    return this._time;
                },

                /**
                 * @param {number} gain
                 * @param {number} time
                 */
                initialize: function(gain, time) {
                    this._gain = gain;
                    this._time = time;
                }
            }
        );
    }
);
