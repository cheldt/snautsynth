define(
    [
        'app/control/ui/rangecontrol/Knob',
        'app/control/ui/rangecontrol/SnapOptions',
        'app/datatype/NumberRange',
        'app/utils/formatter/NumberFormatter',
        'app/utils/Position',
        'dejavu',

    ]
    , function(
        Knob,
        SnapOptions,
        NumberRange,
        NumberFormatter,
        Position,
        dejavu
    ) {
        var KnobFactory = dejavu.Class.declare({
                $name: 'Knob',

                /**
                 * @param {Object} canvasState
                 * @param {Object} options
                 * @return {Object}
                 */
                create: function(canvasState, options) {
                    var position    = new Position(options.position.x, options.position.y);
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

                    return new Knob(
                        options.id,
                        position,
                        options.value,
                        canvasState,
                        options.valueDisplayMultiplier,
                        valueRange,
                        options.radius,
                        options.color,
                        snapOptions,
                        formatter
                    );
                }
            }
        );

        return KnobFactory;
    }
);