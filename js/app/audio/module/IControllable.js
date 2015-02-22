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
         * @param {Object} controlConnectionList
         */
        connectToControls: function (controlConnectionList) {},

        /**
         * @memberof Snautsynth.Audio.Module.IControllable
         * @abstract
         * @instance
         *
         * @param {Object} controlConnectionList
         * @param {Array.<Snautsynth.Control.Control>} controlList
         */
        setupControls: function(controlConnectionList, controlList) {},

        /**
         * @memberof Snautsynth.Audio.Module.IControllable
         * @abstract
         * @instance
         *
         * @param {number} ctrlTargetId
         */
        getValueBoundariesByCtrlTarget: function(ctrlTargetId) {}
    });
});