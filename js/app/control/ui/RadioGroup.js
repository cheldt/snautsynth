define(['dejavu', 'app/event/Event', 'app/control/ui/UIControl', 'app/control/ui/RadioButton'], function(dejavu, Event, UIControl, RadioButton){
    var RadioGroup = dejavu.Class.declare({
        $name: 'RadioGroup',

        $extends: UIControl,

        _lastRadioY: null,

        initialize: function (id, position, value, canvasState) {
            this.$super(id, position, value, canvasState);

            this._lastRadioY   = position.getY();

            this._controls = [];

            var myRadioGroup = this;

            this._kineticGroup.on('click', function(evt) {
                var eventObject =  myRadioGroup.getCanvasState().getBaseLayer().getAttr('event');
                if(typeof eventObject !== 'undefined') {
                    if (eventObject.getType() == Event.TYPE_CHECKED_CHANGED) {
                        var radioButtonList = myRadioGroup.getControls();
                        var ctrCount        = radioButtonList.length;

                        for (var ctrIndex = 0; ctrIndex < ctrCount; ctrIndex++) {
                            var radioButton = radioButtonList[ctrIndex];
                            radioButton.changeCheckedState(false);
                        }

                        for (var ctrIndex = 0; ctrIndex < ctrCount; ctrIndex++) {
                            var radioButton = radioButtonList[ctrIndex];

                            if( radioButton.getValue() == eventObject.getValue() ) {
                                radioButton.changeCheckedState(true);
                                myRadioGroup.setValue(radioButton.getValue());
                                myRadioGroup.getCanvasState().getBaseLayer().setAttr('event', new Event(
                                    myRadioGroup.getId(),
                                    myRadioGroup.getValue(),
                                    Event.TYPE_VALUE_CHANGED)
                                );
                            }
                        }
                    }
                }
            });
        },

        addControl: function(radioButton) {
            radioButton.setY(this._lastRadioY);

            this.$super(radioButton);

            if (radioButton.getValue() == this._value) {
                radioButton.changeCheckedState(true);
            }

            this._lastRadioY += radioButton.getRadius() * 2 + 5;
        }
    });

    return RadioGroup;
});
