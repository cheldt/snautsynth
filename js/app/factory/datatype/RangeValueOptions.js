/**
 * @namespace Snautsynth.Factory.DataType
 */
define(
    [
        'app/control/ui/SnapOptions',
        'app/datatype/NumberRange',
        'app/datatype/RangeValueOptions',
        'app/util/formatter/NumberFormatter',
        'dejavu'
    ],
    function(
        SnapOptions,
        NumberRange,
        RangeValueOptions,
        NumberFormatter,
        dejavu
    ) {
        'use strict';

        /** @class Snautsynth.Factory.DataType.RangeValueOptions */
        return dejavu.Class.declare({
            $name: 'RangeValueOptions',

            /**
             * @memberof Snautsynth.Factory.DataType.RangeValueOptions
             * @instance
             *
             * @param  {Object} options
             *
             * @return {Snautsynth.DataType.RangeValueOptions}
             */
            create: function(options) {
                var valueRange  = new NumberRange(options.valueRange.min, options.valueRange.max);
                var formatter   = new NumberFormatter(options.numberFormat);
                var snapOptions = null;

                if (null !== options.snapOptions) {
                    snapOptions = new SnapOptions(
                        options.snapOptions.doubleClickSnapValue,
                        options.snapOptions.snapDistance,
                        options.snapOptions.snapStep
                    );
                }

                return new RangeValueOptions(
                    valueRange,
                    snapOptions,
                    options.valueDisplayMultiplier,
                    formatter
                );
            }
        });
    }
);