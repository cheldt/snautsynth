/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /**
     * @class Snautsynth.Audio.Module.IControllable
     * @interface
     */
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
         * @param {number} ctrlTargetId
         *
         * @return {null|*}
         */
        getDefaultValueByCtrlTarget: function(ctrlTargetId) {},

        /**
         * @memberof Snautsynth.Audio.Module.IControllable
         * @abstract
         * @instance
         *
         * @param {number} ctrlTargetId
         *
         * @return {null|Snautsynth.DataType.ValueOption}
         */
        getValueOptionsByCtrlTarget: function(ctrlTargetId) {}
    });
});