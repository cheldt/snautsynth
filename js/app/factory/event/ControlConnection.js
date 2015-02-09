/**
 * @namespace Snautsynth.Factory.Event
 */
define(['dejavu','app/event/ControlConnection'], function(dejavu, ControlConnection) {
    'use strict';

    return dejavu.Class.declare({
        $name: 'ControlConnection',

        /**
         * @memberof Snautsynth.Factory.Event.ControlConnection
         * @instance
         *
         * @param  {Object} options
         *
         * @return {Snautsynth.Event.ControlConnection}
         */
        create: function(options) {
            return new ControlConnection(options.controlId, options.moduleId, options.valueTarget);
        }
    });
});