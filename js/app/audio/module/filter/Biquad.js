/**
 * @namespace Snautsynth.Audio.Module.Filter
 */
define(
    [
        'dejavu',
        'app/audio/module/Module',
        'app/audio/module/IConnectable',
        'app/audio/module/IConnecting',
        'app/audio/module/IControllable',
        'app/control/ui/SnapOptions',
        'app/datatype/DiscreteValue',
        'app/datatype/DiscreteValueOptions',
        'app/datatype/NumberRange',
        'app/datatype/RangeValueOptions',
        'app/util/formatter/NumberFormatter'
    ],
    function(
        dejavu,
        Module,
        IConnectable,
        IConnecting,
        IConrollable,
        SnapOptions,
        DiscreteValue,
        DiscreteValueOptions,
        NumberRange,
        RangeValueOptions,
        NumberFormatter
    ) {
        'use strict';

        var Biquad = dejavu.Class.declare({
            $name: 'Biquad',

            $extends: Module,

            $implements: [IConnectable, IConnecting, IConrollable],

            _filterNode: null,

            $constants: {
                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                FILTER_LOWPASS:      'lowpass',

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                FILTER_BANDPASS:     'bandpass',

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {string}
                 */
                FILTER_HIGHPASS:     'highpass',

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                FILTER_DEFAULT_FREQ: 22050,

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                FILTER_DEFAULT_RES:  0.0001,

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_FREQUENCY:      1,

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_QUALITY_FACTOR: 2,

                /**
                 * @memberof Snautsynth.Audio.Module.Filter.Biquad
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                CTRL_TARGET_TYPE:           3
            },

            /**
             * @constructor
             * @class      Snautsynth.Audio.Module.Filter.Biquad
             * @extends    Snautsynth.Audio.Module.Module
             * @implements Snautsynth.Audio.Module.IConnectable
             * @implements Snautsynth.Audio.Module.IConnecting
             * @implements Snautsynth.Audio.Module.IControllable
             *
             * @param {number}                                                  id
             * @param {AudioContext}                                            audioContext
             * @param {string}                                                  type
             * @param {number}                                                  frequency
             * @param {number}                                                  qualityFactor
             * @param {Array.<Snautsynth.Audio.Module.ModuleConnection>}        moduleConnectionList
             * @param {Snautsynth.Audio.Module.IControlTargetOptionsAccessable} controlTargetOptions
             */
            initialize: function(
                id,
                audioContext,
                type,
                frequency,
                qualityFactor,
                moduleConnectionList,
                controlTargetOptions
            ) {
                this.$super(id, audioContext, moduleConnectionList, controlTargetOptions);

                this._filterNode                  = audioContext.createBiquadFilter();
                this._filterNode.type             = type;
                this._filterNode.frequency.value  = frequency;
                this._filterNode.Q.value          = qualityFactor;
            },


            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @param {string} value
             * @param {number} time
             */
            changeFrequency: function(value, time) {
                this._filterNode.frequency.setValueAtTime(value, time);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @param {string} value
             * @param {number} time
             */
            changeQualityFactor: function(value, time) {
                this._filterNode.Q.setValueAtTime(value, time);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @param {string} value
             */
            changeType: function(value) {
                this._filterNode.type = value;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @param {Array.<Snautsynth.Event.ControlConnection>} controlConnectionList
             */
            connectToControls: function(controlConnectionList) {
                var module = this;

                for (var controlId in controlConnectionList) {
                    if (!controlConnectionList.hasOwnProperty(controlId)) {
                        continue;
                    }

                    var groupedControlConnections = controlConnectionList[controlId];

                    groupedControlConnections.forEach(function(controlConnection) {
                        if (module.getId() !== controlConnection.getModuleId()) {
                            return;
                        }

                        switch(controlConnection.getControlTarget()) {
                            case Biquad.CTRL_TARGET_FREQUENCY:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.changeFrequency(value, time);
                                    }
                                );
                                break;
                            case Biquad.CTRL_TARGET_QUALITY_FACTOR:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.changeQualityFactor(value, time);
                                    }
                                );
                                break;
                            case Biquad.CTRL_TARGET_TYPE:
                                controlConnection.setCallback(
                                    function(value, time) {
                                        module.changeType(value);
                                    }
                                );
                                break;
                        }

                    });
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @return {BiquadFilterNode}
             */
            getTargetNode: function() {
                return this._filterNode;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @return {BiquadFilterNode}
             */
            getSourceNode: function() {
                return this._filterNode;
            },

            /**
             * @memberof Snautsynth.Audio.Module.Filter.Biquad
             * @instance
             *
             * @param {number} ctrlTargetId
             *
             * @return {null|*}
             */
            getValueByCtrlTarget: function(ctrlTargetId) {
                switch (ctrlTargetId) {
                    case Biquad.CTRL_TARGET_FREQUENCY:
                        return this._filterNode.frequency.value;
                    case Biquad.CTRL_TARGET_QUALITY_FACTOR:
                        return this._filterNode.Q.value;
                    case Biquad.CTRL_TARGET_TYPE:
                        return this._filterNode.type;
                    default:
                        return null;
                }
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} ctrlTargetId
             *
             * @return {null|Snautsynth.DataType.ValueOptions|Snautsynth.DataType.DiscreteValueOptions}
             */
            getValueOptionsByCtrlTarget: function(ctrlTargetId) {
                switch (ctrlTargetId) {
                    case Biquad.CTRL_TARGET_FREQUENCY:
                        return new RangeValueOptions(
                            new NumberRange(0, this._filterNode.frequency.value),
                            new SnapOptions(0, 0, 0),
                            1,
                            new NumberFormatter('#0')
                        );
                    case Biquad.CTRL_TARGET_QUALITY_FACTOR:
                        return new RangeValueOptions(
                            new NumberRange(0, this._filterNode.Q.value),
                            new SnapOptions(0, 0, 0),
                            100,
                            new NumberFormatter('#0')
                        );
                    case Biquad.CTRL_TARGET_TYPE:
                        var discreteValueList = [];

                        discreteValueList.push(new DiscreteValue('Lowpass', Biquad.FILTER_LOWPASS));
                        discreteValueList.push(new DiscreteValue('Bandpass', Biquad.FILTER_BANDPASS));
                        discreteValueList.push(new DiscreteValue('Highpass', Biquad.FILTER_HIGHPASS));

                        return new DiscreteValueOptions(discreteValueList, null, null);
                    default:
                        return null;
                }
            }
        });

        return Biquad;
    }
);