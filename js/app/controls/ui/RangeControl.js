define(['dejavu', 'app/controls/ui/UIControl'], function(dejavu, UIControl){
    var RangeControl = dejavu.Class.declare({
        $name: 'RangeControl',

        $extends: UIControl,

        _valueDspMult: null,

        _minValue: null,
        _maxValue: null,

        _snapStep: null,
        _snapDistance: null,

        _doubleClickSnapValue: null,

        initialize: function (id, x, y, value, canvasState, label, valueDspMult,  minValue, maxValue, snapStep, snapDistance, doubleClickSnapValue) {
            this.$super(id, x, y, value, canvasState, label);

            this._valueDspMult         = valueDspMult;

            this._minValue             = minValue;
            this._maxValue             = maxValue;

            this._snapStep             = snapStep;
            this._snapDistance         = snapDistance;

            this._doubleClickSnapValue = doubleClickSnapValue;
        }

    });
    return RangeControl;
});
