/**
 * @namespace Snautsynth.Audio.Module.Output
 */
define(
    [
        'dejavu',
        'app/audio/module/Module',
        'app/audio/module/IConnectable'
    ],
    function(
        dejavu,
        Module,
        IConnectable
    ) {
        'use strict';

        return dejavu.Class.declare({
            $name: 'Destination',

            $extends: Module,

            $implements: [IConnectable],

            /**
             * @constructor
             * @class      Snautsynth.Audio.Module.Output.Destination
             * @extends    Snautsynth.Audio.Module.Module
             * @implements Snautsynth.Audio.Module.IConnectable
             *
             * @param {number}       id
             * @param {AudioContext} audioContext
             */
            initialize: function(id, audioContext) {
                this.$super(id, audioContext, null);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Output.Destination
             * @instance
             *
             * @return {AudioNode}
             */
            getTargetNode: function() {
                return this._audioContext.destination;
            }
        });
    }
);
