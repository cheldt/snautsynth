/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /**
     * @class Snautsynth.Audio.Module.IControlTargetOptionsAccessable
     * @interface
     */
    return dejavu.Interface.declare({
        $name: 'IControlTargetOptionsAccessible',

        /**
         * @memberof Snautsynth.Audio.Module.IControlTargetOptionsAccessable
         * @abstract
         * @instance
         *
         * @param {number} ctrlTargetId
         *
         * @return {Snautsynth.DataType.ValueOptions}
         */
        getOptionsById: function (ctrlTargetId) {},

        /**
         * @memberof Snautsynth.Audio.Module.IControlTargetOptionsAccessable
         * @abstract
         * @instance
         *
         * @param {number}                           ctrlTargetId
         * @param {Snautsynth.DataType.ValueOptions} valueOptions
         */
        setOptionsById: function (ctrlTargetId, valueOptions) {}
    });
});
