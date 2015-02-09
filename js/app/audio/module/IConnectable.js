/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /** @interface Snautsynth.Audio.Module.IConnectable */
    var IConnectable = dejavu.Interface.declare({
        $name: 'IConnectable',

        /**
         * @memberof Snautsynth.Audio.Module.IConnectable
         * @abstract
         * @instance
         *
         * @param {Array.<AudioNode>} nodeList
         */
        connectToNodes: function (nodeList) {}
    });
});