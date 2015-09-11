/**
 * @namespace Snautsynth.Control.UI
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /**
     * @class Snautsynth.Control.UI.IConfigurable
     * @interface
     */
    return dejavu.Interface.declare({
        $name: 'IConfigurable',

        /**
         * @memberof Snautsynth.Control.UI.IConfigurable
         * @abstract
         * @instance
         *
         * @param {Snautsynth.DataType.ValueOptions} valueOptions
         */
        setUp: function (valueOptions) {}
    });
});