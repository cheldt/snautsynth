/**
 * @module    app/control/ui/UIControl
 * @namespace Snautsynth.Control.UI
 */
define(
    [
        'dejavu',
        'app/control/Control'
    ],
    function(
        dejavu,
        Control
    ) {
        return dejavu.Class.declare({
                $name: 'UIControl',

                $extends: Control,

                /**
                 * @memberof Snautsynth.Control.UI.UIControl
                 * @instance
                 * @protected
                 *
                 * @type {*}
                 */
                _value: null,

                /**
                 * @memberof Snautsynth.Control.UI.UIControl
                 * @instance
                 * @protected
                 *
                 * @type {boolean}
                 */
                _selected: null,

                /**
                 * @memberof Snautsynth.Control.UI.UIControl
                 * @instance
                 *
                 * @return {*}
                 */
                getValue: function() {
                    return this._value;
                },

                /**
                 * @memberof Snautsynth.Control.UI.UIControl
                 * @instance
                 *
                 * @param {*} value
                 */
                setValue: function(value) {
                    this._value = value;
                },

                /**
                 * @memberof Snautsynth.Control.UI.UIControl
                 * @instance
                 *
                 * @return {boolean}
                 */
                getSelected: function() {
                    return this._selected;
                },

                /**
                 * @memberof Snautsynth.Control.UI.UIControl
                 * @instance
                 *
                 * @param {boolean} selected
                 */
                setSelected: function(selected) {
                    this._selected = selected;
                },

                /**
                 * @constructor
                 * @class Snautsynth.Control.UI.UIControl
                 *
                 * @param {number}                        id
                 * @param {Snautsynth.Util.Position}      position
                 * @param {*}                             value
                 * @param {Snautsynth.Canvas.CanvasState} canvasState
                 */
                initialize: function(id, position, value, canvasState) {
                    this.$super(id, position, canvasState);
                    this._value    = value;
                    this._selected = false;
                }
            }
        );
    }
);
