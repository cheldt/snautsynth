/**
 * @namespace Snautsynth.Util.Formatter
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /**
     * @class Snautsynth.Util.Formatter.Formatter
     * @abstract
     */
    return dejavu.AbstractClass.declare({
        $name: 'Formatter',

        $abstracts: {
            /**
             * @memberof Snautsynth.Util.Formatter.Formatter
             * @abstract
             * @instance
             *
             * @param {number} value
             *
             * @return {string}
             */
            format: function(value) {}
        }
    });
});
