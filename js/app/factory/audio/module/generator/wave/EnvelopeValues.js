/**
 * @namespace Snautsynth.Factory.Audio.Module.Generator.Wave.EnvelopeValues
 */
define(
    [
        'dejavu',
        'app/audio/module/generator/wave/EnvelopeValues'
    ],
    function(
        dejavu,
        EnvelopeValues
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Audio.Module.Generator.Wave.EnvelopeValues */
        return dejavu.Class.declare({
            $name: 'Wave',

            /**
             * @memberof Snautsynth.Factory.Audio.Module.Generator.Wave.EnvelopeValues
             * @instance
             *
             * @param {Object} options
             *
             * @return {Snautsynth.Audio.Module.Generator.Wave.EnvelopeValues}
             */
            create: function(options) {
                if (null == options) {
                    return null;
                }

                new EnvelopeValues(
                    options.attackGain,
                    options.attackTime,
                    options.decayGain,
                    options.decayTime,
                    options.releaseTime,
                    options.sustainTime
                );
            }
        });
    }
);