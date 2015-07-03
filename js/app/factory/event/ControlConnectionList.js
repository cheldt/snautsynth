/**
 * @namespace Snautsynth.Factory.Event
 */
define(
    [
        'dejavu',
        'app/factory/event/ControlConnection'
    ],
    function(
        dejavu,
        ControlConnectionFactory
    ) {
        'use strict';

        /** @class Snautsynth.Factory.Event.ControlConnectionList */
        return dejavu.Class.declare({
            $name: 'String',

            /**
             * @memberof Snautsynth.Factory.Event.ControlConnectionList
             * @instance
             *
             * @param {Array} controlConnectionOptionsList
             *
             * @return {Object}
             */
            create: function(controlConnectionOptionsList) {

                var controlConnectionFactory = new ControlConnectionFactory();
                var controlConnectionObject  = {};

                controlConnectionOptionsList.forEach(function(controlConnectionOptions) {
                    controlConnectionObject[controlConnectionOptions.controlId] = controlConnectionFactory.create(
                        controlConnectionOptions
                    );
                });

                return controlConnectionObject;
            }
        });
    }
);
