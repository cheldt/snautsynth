define(['dejavu', 'app/event/Event', 'app/controls/ui/UIControl', 'app/controls/ui/RadioButton'], function(dejavu, Event, UIControl, RadioButton){
    var RadioGroup = dejavu.Class.declare({
        $name: 'RadioGroup',

        $extends: UIControl,

        _radioButtons: null,

        _lastRadioY: null,

        getRadioButtons: function() {
            return this._radioButtons;
        },

        initialize: function (id, x, y, value, canvasState) {
            this.$super(id, x, y, value, canvasState);

            this._lastRadioY   = y;

            this._maxRadius    = 0;

            this._radioButtons = [];

            var myRadioGroup = this;

            this._isFirstButton = true;

            this._kineticGroup.on('click', function(evt) {
                var eventObject =  myRadioGroup.getCanvasState().getBaseLayer().getAttr('event');
                if(typeof eventObject !== 'undefined') {
                    if (eventObject.getType() == Event.TYPE_CHECKED_CHANGED) {
                        var radioButtonList = myRadioGroup.getRadioButtons();
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

        addButton: function(radioButton) {
            radioButton.setY(this._lastRadioY)

            this._radioButtons.push(radioButton);
            this._kineticGroup.add(radioButton.getKineticGroup());
            if (radioButton.getValue() == this._value) {
                radioButton.changeCheckedState(true);
            }

            this._lastRadioY += radioButton.getRadius() * 2 + 5;
        }
    });

    return RadioGroup;
});
