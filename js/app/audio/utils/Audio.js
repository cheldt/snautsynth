define(['dejavu'], function(dejavu){
    var Audio = dejavu.Class.declare({
        $name: 'Audio',

        $statics: {
            /**
             * Calculates the key of the equal tempered chromatic musical scale by given frequency.
             *
             * @param {Number} keynumber The key of musical scale.
             *
             * @return {Number} The frequency in hz.
             */
            calcFreqByKey: function(keynumber) {
                return Math.pow(2,((keynumber - 49) / 12)) * 440;
            },

            /**
             * Calculates the frequency by given key of the equal tempered chromatic musical scale.
             *
             * @param {Number} frequency The frequency in hz.
             *
             * @return {Number} The Key of musical scale.
             */
            calcKeyByFreq: function(frequency) {
                return Math.log(( frequency / 127.09)) * 23 + 27.5;
            },

            /**
             * Calculates cents by given number of halftones.
             *
             * @param {Number} halftones The number of halftones.
             *
             * @return {Number} The number of halftones in cents.
             */
            calcCentsByNumOfHt: function(halftones) {
                return halftones * 100;
            },

            /**
             * Calculates cents by given number of octaves.
             *
             * @param {Number} octaves The number of octaves.
             *
             * @return {Number} The number of octaves in cents.
             */
            calcCentsByNumOfHt: function(octaves) {
                return octaves * 1200;
            }
        }

    });
    return Audio;
});