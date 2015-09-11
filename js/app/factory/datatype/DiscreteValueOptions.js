/**
 * @namespace Snautsynth.Factory.DataType
 */
define(
    [
        'app/datatype/DiscreteValue',
        'app/datatype/DiscreteValueOptions',
        'dejavu'
    ],
    function(
        DiscreteValue,
        DiscreteValueOptions,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.DataType.DiscreteValueOptions */
        return dejavu.Class.declare({
            $name: 'DiscreteValueOptions',

            /**
             * @memberof Snautsynth.Factory.DataType.DiscreteValueOptions
             * @instance
             *
             * @param  {Object} options
             *
             * @return {Snautsynth.DataType.DiscreteValueOptions}
             */
            create: function(options) {
                var optionsList = [];

                options.discreteOptions.forEach(function(discreteValueOption) {
                    optionsList.push(
                        new DiscreteValue(discreteValueOption.name, discreteValueOption.value)
                    );
                });

                return new DiscreteValueOptions(optionsList);
            }
        });
    }
);
