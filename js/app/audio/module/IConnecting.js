/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /**
     * @class Snautsynth.Audio.Module.IConnecting
     * @interface
     */
    return dejavu.Interface.declare({
        $name: 'IConnecting',

        /**
         * @memberof Snautsynth.Audio.Module.IConnecting
         * @abstract
         * @instance
         *
         * @return {AudioNode}
         */
        getSourceNode: function () {}
    });
});