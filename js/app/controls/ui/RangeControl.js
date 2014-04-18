define(['dejavu', 'app/controls/ui/UIControl'], function(dejavu, UIControl){
    var RangeControl = dejavu.Class.declare({
        $name: 'RangeControl',

        $extends: UIControl,
	
	_doubleClickSnapValue: null,
	
	_formatter: null,
	
	_maxValue: null,
	
	_minValue: null,
	
	_snapDistance: null,
	
	_snapStep: null,
        
        _valueDspMult: null,

        getDoubleClickSnapValue: function() {
           return this._doubleClickSnapValue;
        },
	
	getFormatter: function() {
	    return this._formatter;
	},

        initialize: function (id, x, y,
			      value, canvasState,
			      label, valueDspMult,
			      minValue, maxValue,
			      snapStep, snapDistance,
			      doubleClickSnapValue,
			      formatter) {
            this.$super(id, x, y, value, canvasState, label);

            this._valueDspMult         = valueDspMult;

            this._minValue             = minValue;
            this._maxValue             = maxValue;

            this._snapStep             = snapStep;
            this._snapDistance         = snapDistance;

            this._doubleClickSnapValue = doubleClickSnapValue;
	    
	    this._formatter            = formatter;
        }

    });
    return RangeControl;
});
