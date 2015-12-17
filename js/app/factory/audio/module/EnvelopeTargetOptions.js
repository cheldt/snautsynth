/**
 * @namespace Snautsynth.Factory.Audio.Module
 */
define(
    [
        'app/factory/datatype/RangeValueOptions',
        'app/audio/module/EnvelopeTargetOptions',
        'dejavu'
    ],
    function (
        RangeValueOptionsFactory,
        EnvelopeTargetOptions,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Audio.Module.EnvelopeOptions */
        return dejavu.Class.declare({
            $name: 'EnvelopeTargetOptions',

            /**
             * @memberof Snautsynth.Factory.Audio.Module.EnvelopeOptions
             * @instance
             *
             * @param  {Object} options
             *
             * @return {Snautsynth.Audio.Module.EnvelopeTargetOptions}
             */
            create: function(options) {
                var rangeValueOptionsFactory = new RangeValueOptionsFactory();
                var envelopeTargetOptions    = new EnvelopeTargetOptions();

                options.options.forEach(function(option) {
                    envelopeTargetOptions.setOptionsById(
                        option.targetId,
                        rangeValueOptionsFactory.create(option)
                    );
                });

                return envelopeTargetOptions;
            }
        });
    }
);
