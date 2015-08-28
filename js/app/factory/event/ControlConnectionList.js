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
                    var groupControlConnectionID = controlConnectionOptions.controlId;

                    controlConnectionObject[controlConnectionOptions.controlId] = [];

                    controlConnectionOptionsList.forEach(function(innerControlConnectionOptions) {
                        if (groupControlConnectionID == innerControlConnectionOptions.controlId) {
                            controlConnectionObject[controlConnectionOptions.controlId].push(
                                controlConnectionFactory.create(
                                    innerControlConnectionOptions
                                )
                            );
                        }
                    });
                });

                return controlConnectionObject;
            }
        });
    }
);
