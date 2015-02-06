/**
 * @module    app/util/formatter/Formatter
 * @namespace Snautsynth.Util.Formatter
 */
define(['dejavu'], function(dejavu){
    /**
     * @class Snautsynth.Util.Formatter.Formatter
     * @abstract
     */
    var Formatter = dejavu.AbstractClass.declare({
        $name: 'Formatter',

        $abstracts: {
            /**
             * @memberof Snautsynth.Util.Formatter.Formatter
             * @abstract
             * @instance
             * @param {number} value
             * @return {string}
             */
            format: function(value) {}
        }
    });

    return Formatter;
});
