define(
    [
        'dejavu',
        'app/control/ui/rangecontrol/Knob',
        'app/utils/formatter/NumberFormatter'
    ]
    , function(
        dejavu,
        Knob
    ) {
        var KnobFactory = dejavu.Class.declare({
                $statics: {
                    create: function(options) {



                        //new Knob();

                    }
                }
            }
        );

        return KnobFactory;
    }
);