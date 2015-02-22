/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /** @interface Snautsynth.Audio.Module.IConnectable */
    return dejavu.Interface.declare({
        $name: 'IConnectable',

        /**
         * @memberof Snautsynth.Audio.Module.IConnectable
         * @abstract
         * @instance
         *
         * @return {AudioNode}
         */
        getTargetNode: function () {}
    });
});