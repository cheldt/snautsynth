/**
 * @namespace Snautsynth.Factory.Audio.Module.EnvelopeValues
 */
define(
    [
        'dejavu',
        '../../../audio/module/EnvelopeValues'
    ],
    function(
        dejavu,
        EnvelopeValues
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Audio.Module.EnvelopeValues */
        return dejavu.Class.declare({
            $name: 'Wave',

            /**
             * @memberof Snautsynth.Factory.Audio.Module.EnvelopeValues
             * @instance
             *
             * @param {Object} options
             *
             * @return {Snautsynth.Audio.Module.EnvelopeValues}
             */
            create: function(options) {

                if (null == options) {
                    return null;
                }

                return new EnvelopeValues(
                    options.attackGain,
                    options.attackTime,
                    options.decayGain,
                    options.decayTime,
                    options.sustainTime,
                    options.releaseTime
                );
            }
        });
    }
);