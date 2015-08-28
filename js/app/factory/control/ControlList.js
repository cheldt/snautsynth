/**
 * @namespace Snautsynth.Factory.Control
 */
define(
    [
        'dejavu',
        'app/factory/control/layout/Label',
        'app/factory/control/ui/discretecontrol/RadioGroup',
        'app/factory/control/ui/discretecontrol/Keyboard',
        'app/factory/control/ui/envelope/Graph',
        'app/factory/control/ui/rangecontrol/Fader',
        'app/factory/control/ui/rangecontrol/Knob'
    ],
    function(
        dejavu,
        LabelFactory,
        RadioGroupFactory,
        KeyboardFactory,
        GraphFactory,
        FaderFactory,
        KnobFactory
    ) {
        'use strict';

        var ControlListFactory = dejavu.Class.declare({
            $name: 'ControlList',

            /**
             * @memberof Snautsynth.Factory.Control.ControlList
             * @instance
             *
             * @type {Object}
             */
            _factoryList: null,

            $constants: {
                CLASS_TYPE_CTRL_LABEL:      0,
                CLASS_TYPE_CTRL_RADIOGROUP: 1,
                CLASS_TYPE_CTRL_GRAPH:      2,
                CLASS_TYPE_CTRL_FADER:      3,
                CLASS_TYPE_CTRL_KEYBOARD:   4,
                CLASS_TYPE_CTRL_KNOB:       5

            },

            /**
             * @constructor
             * @class Snautsynth.Factory.Control.ControlList
             */
            initialize: function() {
                this._factoryList = {};
                this._factoryList[ControlListFactory.CLASS_TYPE_CTRL_LABEL]      = LabelFactory;
                this._factoryList[ControlListFactory.CLASS_TYPE_CTRL_RADIOGROUP] = RadioGroupFactory;
                this._factoryList[ControlListFactory.CLASS_TYPE_CTRL_GRAPH]      = GraphFactory;
                this._factoryList[ControlListFactory.CLASS_TYPE_CTRL_FADER]      = FaderFactory;
                this._factoryList[ControlListFactory.CLASS_TYPE_CTRL_KEYBOARD]   = KeyboardFactory;
                this._factoryList[ControlListFactory.CLASS_TYPE_CTRL_KNOB]       = KnobFactory;
            },

            /**
             * @memberof Snautsynth.Factory.Event.ControlConnectionList
             * @instance
             *
             * @param {Array}                         controlOptionsList
             * @param {Snautsynth.Canvas.CanvasState} canvasState
             */
            create: function(controlOptionsList, canvasState) {

                var factoryList = this._factoryList;

                controlOptionsList.forEach(function(controlOptions) {
                    if (factoryList.hasOwnProperty(controlOptions.type)) {
                        var factory = new factoryList[controlOptions.type]();
                        canvasState.addControl(factory.create(canvasState, controlOptions));
                    }
                });
            }
        });

        return ControlListFactory;
    }
);
