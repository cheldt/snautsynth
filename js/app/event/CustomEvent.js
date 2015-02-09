define(['dejavu'], function(dejavu){
    var CustomEvent = dejavu.Class.declare({
        $name: 'CustomEvent',

        _listeners: null,

        initialize: function() {
            this._listeners = {};
        },

        addListener: function(type, fn) {
            if (typeof this._listeners[type] == 'undefined') {
                this._listeners[type] = [];
            }
            this._listeners[type].push(fn);
        },

        fire: function(type, sender, eventArgs) {
            if (this._listeners[type] instanceof Array){
                var listeners = this._listeners[type];
                for (var i=0, len=listeners.length; i < len; i++){
                    listeners[i].call(sender, eventArgs);
                }
            }
        }
    });
    return CustomEvent;
});