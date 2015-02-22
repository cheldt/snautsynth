/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /** @interface Snautsynth.Audio.Module.IConnecting */
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