/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /** @interface Snautsynth.Audio.Module.IControllable */
    return dejavu.Interface.declare({
        $name: 'IControllable',

        /**
         * @memberof Snautsynth.Audio.Module.IControllable
         * @abstract
         * @instance
         *
         * @param {number} valueTarget
         * @param {*}      value
         */
        changeValue: function (valueTarget, value) {},

        /**
         * @memberof Snautsynth.Audio.Module.IControllable
         * @abstract
         * @instance
         *
         * @param {Array.<Snautsynth.Event.ControlConnection>} controlConnectionList
         */
        connectToControls: function (controlConnectionList) {}
    });
});