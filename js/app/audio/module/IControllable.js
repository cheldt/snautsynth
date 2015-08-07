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
        getValueByCtrlTarget: function(ctrlTargetId) {},

        /**
         * @memberof Snautsynth.Audio.Module.IControllable
         * @abstract
         * @instance
         *
         * @param {number} ctrlTargetId
         *
         * @return {null|Snautsynth.DataType.ValueOptions}
         */
        getValueOptionsByCtrlTarget: function(ctrlTargetId) {}
    });
});