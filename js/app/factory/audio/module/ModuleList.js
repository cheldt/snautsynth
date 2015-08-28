/**
 * @namespace Snautsynth.Factory.Audio.Module
 */
define(
    [
        'dejavu',
        'app/factory/audio/module/output/Destination',
        'app/factory/audio/module/mixing/Gain',
        'app/factory/audio/module/generator/Wave'
    ],
    function(
        dejavu,
        DestinationFactory,
        GainFactory,
        WaveFactory
    ) {
        'use strict';

        var ModuleListFactory = dejavu.Class.declare({
            $name: 'ModuleList',

            /**
             * @memberof Snautsynth.Factory.Audio.Module.ModuleList
             * @instance
             *
             * @type {Object}
             */
            _factoryList: null,

            $constants: {
                CLASS_TYPE_BIQUAD_FILTER: 0,
                CLASS_TYPE_AMOD_DESTINATION:   1,
                CLASS_TYPE_AMOD_GAIN:          2,
                CLASS_TYPE_AMOD_WAVE:          3
            },

            /**
             * @constructor
             * @class Snautsynth.Factory.Audio.Module.ModuleList
             */
            initialize: function() {
                this._factoryList = {};
                this._factoryList[ModuleListFactory.CLASS_TYPE_BIQUAD_FILTER] = null;
                this._factoryList[ModuleListFactory.CLASS_TYPE_AMOD_DESTINATION]   = DestinationFactory;
                this._factoryList[ModuleListFactory.CLASS_TYPE_AMOD_GAIN]          = GainFactory;
                this._factoryList[ModuleListFactory.CLASS_TYPE_AMOD_WAVE]          = WaveFactory;
            },

            /**
             * @memberof Snautsynth.Factory.Audio.Module.Module
             * @instance
             *
             * @param {Object} audioModuleOptionsList
             * @param {Object} audioContext
             *
             * @return {Array.<Snautsynth.Audio.Module.Module>}
             */
            create: function(audioModuleOptionsList, audioContext) {
                var factoryList = this._factoryList;

                var audioModuleList = [];

                audioModuleOptionsList.forEach(function(audioModuleOptions) {

                    if (factoryList.hasOwnProperty(audioModuleOptions.type)) {
                        var factory = new factoryList[audioModuleOptions.type]();
                        audioModuleList.push(factory.create(audioContext, audioModuleOptions));
                    }
                });

                return audioModuleList;
            }
        });

        return ModuleListFactory;
    }
);