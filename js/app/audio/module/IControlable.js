/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /** @interface Snautsynth.Audio.Module.IControlable */
    var IConnectable = dejavu.Interface.declare({
        $name: 'IControlable',

        /**
         * @memberof Snautsynth.Audio.Module.IControlable
         * @abstract
         * @instance
         *
         * @param {number} valueTarget
         * @param {*}      value
         */
        changeValue: function (valueTarget, value) {},

        /**
         * @memberof Snautsynth.Audio.Module.IControlable
         * @abstract
         * @instance
         *
         * @param {Array.<Snautsynth.Event.ControlConnection>} controlConnectionList
         */
        connectToControls: function (controlConnectionList) {}
    });
});