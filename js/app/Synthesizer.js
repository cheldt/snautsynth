/**
 * @namespace Snautsynth.Synthesizer
 */
define(
    [
        'dejavu',
        'app/audio/module/IControllable',
        'app/factory/audio/module/ModuleList',
        'app/factory/event/ControlConnectionList',
        'app/factory/control/ControlList'
    ],
    function(
        dejavu,
        IControllable,
        AudioModuleListFactory,
        ControlConnectionListFactory,
        ControlListFactory
    ) {
        var Synthesizer = dejavu.Class.declare({
            $name: 'Synthesizer',

            /**
             * @memberof Snautsynth.Synthesizer
             * @protected
             *
             * @type {AudioContext}
             */
            _audioContext: null,

            /**
             * @memberof Snautsynth.Synthesizer
             * @protected
             *
             * @type {Array.<Snautsynth.Audio.Module.Module>}
             */
            _audioModuleList: null,

            /**
             * @memberof Snautsynth.Synthesizer
             * @protected
             *
             * @type {Snautsynth.Canvas.CanvasState}
             */
            _canvasState: null,

            /**
             * @memberof Snautsynth.Synthesizer
             * @protected
             *
             * @type {Object}
             */
            _controlConnectionList: null,

            /**
             * @constructor
             * @class Snautsynth.Synthesizer
             *
             * @param {AudioContext}                  audioContext
             * @param {Array.<Object>}                audioModuleOptionsList
             * @param {Snautsynth.Canvas.CanvasState} canvasState
             * @param {Array.<Object>}                controlConnectionOptionsList
             * @param {Array.<Object>}                controlOptionsList
             */
            initialize: function(
                audioContext,
                audioModuleOptionsList,
                canvasState,
                controlConnectionOptionsList,
                controlOptionsList
            ) {
                this._audioContext          = audioContext;
                this._audioModuleList       = [];
                this._controlConnectionList = {};
                this._canvasState           = canvasState;

                var controlConnectionListFactory = new ControlConnectionListFactory();
                this._controlConnectionList      = controlConnectionListFactory.create(controlConnectionOptionsList);

                var audioModuleListFactory = new AudioModuleListFactory();
                this._audioModuleList      = audioModuleListFactory.create(audioModuleOptionsList, audioContext);

                var controlListFactory = new ControlListFactory();
                controlListFactory.create(controlOptionsList, canvasState);

                this.setupControls();

                this.connectAudioModules();

                this.attachEventListeners();
            },

            /**
             * @memberof Snautsynth.Synthesizer
             * @instance
             */
            attachEventListeners: function() {
                var canvasState = this._canvasState;
                var me          = this;

                canvasState.getStage().on(
                    "dragmove",
                    function() {me.executeCallback();}
                );

                canvasState.getContainer().addEventListener(
                    "dblclick",
                    function() {me.executeCallback();}
                );

                canvasState.getContainer().addEventListener(
                    "mousemove",
                    function() {me.executeCallback();}
                );

                canvasState.getContainer().addEventListener(
                    "click",
                    function() {me.executeCallback();}
                );

                window.addEventListener(
                    "keyup",
                    function() {me.executeCallback();}
                );

                window.addEventListener(
                    "keydown",
                    function() {me.executeCallback();}
                );
            },

            /**
             * @memberof Snautsynth.Synthesizer
             * @instance
             */
            connectAudioModules: function() {
                var audioModuleList       = this._audioModuleList;
                var controlConnectionList = this._controlConnectionList;

                audioModuleList.forEach(function(audioModule) {
                    audioModule.setupModuleConnections(audioModuleList);

                    if (dejavu.instanceOf(audioModule, IControllable)) {
                        audioModule.connectToControls(controlConnectionList);
                    }
                });
            },

            /**
             * @memberof Snautsynth.Synthesizer
             * @instance
             */
            executeCallback: function() {
                var audioContext = this._audioContext;
                var canvasState  = this._canvasState;

                var now = audioContext.currentTime;
                var eventObject = canvasState.getBaseLayer().getAttr('event');

                canvasState.getBaseLayer().setAttr('event', null);

                if (typeof eventObject === 'undefined' || eventObject === null) {
                    return;
                }

                var eventValue = eventObject.getValue();
                var controlId  = eventObject.getControlId();

                var groupedControlConnections = this._controlConnectionList[controlId];

                groupedControlConnections.forEach(function(controlConnection) {
                    var callBackFunction = controlConnection.getCallback();
                    callBackFunction(eventValue, now);
                });
            },

            /**
             * @memberof Snautsynth.Synthesizer
             * @instance
             */
            setupControls: function() {
                var controlConnectionList = this._controlConnectionList;
                var audioModuleList       = this._audioModuleList;
                var canvasState           = this._canvasState;

                var controlConnectionKeys = Object.keys(controlConnectionList);
                var keyLength             = controlConnectionKeys.length;

                for (var index = 0; index < keyLength; index++) {
                    var groupedControlConnections = controlConnectionList[controlConnectionKeys[index]]

                    groupedControlConnections.forEach(function(controlConnection) {
                        controlConnection.setupControl(audioModuleList, canvasState.getControls());
                    });

                }
            }
        });

        return Synthesizer;
    }
);
