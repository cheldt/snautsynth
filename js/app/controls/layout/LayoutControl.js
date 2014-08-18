define(['dejavu', 'app/controls/Control'], function(dejavu, Control) {
    var LayoutControl = dejavu.Class.declare({
        $name: 'LayoutControl',

        $extends: Control,

        initialize: function(id, x, y, canvasState) {
            this.$super(id, x, y, canvasState);
        }
    });

    return LayoutControl;
});
