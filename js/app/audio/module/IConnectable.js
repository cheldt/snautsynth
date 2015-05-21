/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /**
     * @class Snautsynth.Audio.Module.IConnectable
     * @interface
     */
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