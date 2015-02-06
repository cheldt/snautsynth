/**
 * Label module
 *
 * @module    app/control/layout/LayoutControl
 * @namespace Snautsynth.Control.Layout
 */
define(['dejavu', 'app/control/Control'], function(dejavu, Control) {
    var LayoutControl = dejavu.Class.declare({
        $name: 'LayoutControl',

        $extends: Control,

        /**
         * @constructor
         * @class Snautsynth.Control.Layout.LayoutControl
         * @extends Snautsynth.Control.Control
         *
         * @param {number} id
         * @param {Snautsynth.Util.Position} position
         * @param {Snautsynth.Canvas.CanvasState} canvasState
         */
        initialize: function(id, position, canvasState) {
            this.$super(id, position, canvasState);
        }
    });

    return LayoutControl;
});
