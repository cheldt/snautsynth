/**
 * @namespace Snautsynth.Factory.Audio.Module
 */
define(
    [
        'app/factory/datatype/DiscreteValueOptions',
        'app/factory/datatype/RangeValueOptions',
        'dejavu'
    ],
    function (
        DiscreteValueOptionsFactory,
        RangeValueOptionsFactory,
        dejavu
    ) {
        'use strict';

        var ControlTargetOptionsFactory = dejavu.Class.declare({
            $name: 'ControlTargetOptions',

            /**
             * @memberof Snautsynth.Factory.Audio.Module.ControlTargetOptions
             * @instance
             *
             * @type {Object}
             */
            _factoryList: null,

            $constants: {
                CLASS_TYPE_DISCRETEVALUEOPTIONS: 0,
                CLASS_TYPE_RANGEVALUEOPTIONS:    1
            },

            /**
             * @constructor
             * @class Snautsynth.Factory.Audio.Module.ControlTargetOptions
             */
            initialize: function() {
                this._factoryList = {};
                this._factoryList[ControlTargetOptionsFactory.CLASS_TYPE_DISCRETEVALUEOPTIONS]
                    = DiscreteValueOptionsFactory;
                this._factoryList[ControlTargetOptionsFactory.CLASS_TYPE_RANGEVALUEOPTIONS]
                    = RangeValueOptionsFactory;
            },

            /**
             * @param {Array}                                                   options
             * @param {Snautsynth.Audio.Module.IControlTargetOptionsAccessable} controlTargetOptions
             * @protected
             */
            _setOptionsById: function(options, controlTargetOptions) {
                var factoryList = this._factoryList;

                options.forEach(function(option) {
                    var factory = new factoryList[audioModuleOptions.type]();
                    controlTargetOptions.setOptionsById(
                        option.targetId,
                        factory.create(option)
                    );
                });
            }
        });

        return ControlTargetOptionsFactory;
    }
);
