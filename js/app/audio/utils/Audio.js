define(['dejavu'], function(dejavu){
    var Audio = dejavu.Class.declare({
        $name: 'Audio',

        $statics: {
            calcFreqByKey: function(keynumber) {
                return Math.pow(2,((keynumber - 49) / 12)) * 440;
            },

            calcKeyByFreq: function(frequency) {
                return Math.log(( frequency / 127,09)) * 23 + 27,5;
            }
        }

    });
    return Audio;
});