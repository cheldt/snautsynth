define(['dejavu', 'app/control/Control'], function(dejavu, Control) {
    var LayoutControl = dejavu.Class.declare({
        $name: 'LayoutControl',

        $extends: Control,

        initialize: function(id, position, canvasState) {
            this.$super(id, position, canvasState);
        }
    });

    return LayoutControl;
});
