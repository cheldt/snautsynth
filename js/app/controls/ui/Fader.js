define(['dejavu', 'app/controls/ui/UiControl',  'app/utils/String'], function(dejavu, UiControl, StringUtils){
    var Fader = dejavu.Class.declare({
        $name: 'Fader',

        $extends: UiControl,
        initialize: function (id, x, y, value, canvasState, label, valueDspMult, minValue, maxValue, length, color, snapStep, snapDistance, doubleClickSnapValue) {
            this.$super(id, x, y, value, canvasState, label);

        }

    });
    return Fader;
});
