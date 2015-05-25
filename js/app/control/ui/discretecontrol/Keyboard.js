/**
 * @namespace Snautsynth.Control.UI.DiscreteControl
 */
define(
    [
        'app/event/Event',
        'app/control/ui/discretecontrol/DiscreteControl',
        'dejavu',
        'app/control/ui/discretecontrol/KeyValue',
        'app/util/GlobalConstants'
    ],
    function(
        Event,
        DiscreteControl,
        dejavu,
        KeyValue,
        GlobalConstants
    ) {
        'use strict';

        var Keyboard = dejavu.Class.declare({
            $name: 'Keyboard',

            $extends: DiscreteControl,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.Keyboard
             * @instance
             * @protected
             *
             * @type {Object}
             */
            _keyCodeNoteMapping: null,

            /**
             * @memberof Snautsynth.Control.UI.DiscreteControl.Keyboard
             * @instance
             * @protected
             *
             * @type {Konva.Text}
             */
            _noteDisplay: null,

            $constants: {
                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.Keyboard
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                BUTTON_RADIUS:           10,

                /**
                 * @memberof Snautsynth.Control.UI.DiscreteControl.Keyboard
                 * @constant
                 * @default
                 *
                 * @type {number}
                 */
                LABEL_DISPLAY_FONT_SIZE: 18
            },

            /**
             * @constructor
             * @class   Snautsynth.Control.UI.DiscreteControl.Keyboard
             * @extends Snautsynth.Control.UI.DiscreteControl
             *
             * @param {number}                                   id
             * @param {Snautsynth.Canvas.CanvasState}            canvasState
             * @param {Snautsynth.Util.Position}                 position
             * @param {Snautsynth.DataType.DiscreteValueOptions} discreteValueOptions
             */
            initialize: function(id, canvasState, position, discreteValueOptions) {
                this.$super(id, position, null, canvasState, discreteValueOptions);

                var myKeyboard = this;

                this._keyCodeNoteMapping = {};

                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_A] = ['C-5', GlobalConstants.NOTE_C_5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_W] = ['C#5', GlobalConstants.NOTE_Cis5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_S] = ['D-5', GlobalConstants.NOTE_D_5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_E] = ['D#5', GlobalConstants.NOTE_Dis5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_D] = ['E-5', GlobalConstants.NOTE_E_5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_F] = ['F-5', GlobalConstants.NOTE_F_5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_T] = ['F#5', GlobalConstants.NOTE_Fis5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_G] = ['G-5', GlobalConstants.NOTE_G_5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_Z] = ['G#5', GlobalConstants.NOTE_Gis5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_H] = ['A-5', GlobalConstants.NOTE_A_5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_U] = ['A#5', GlobalConstants.NOTE_Ais5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_J] = ['B-5', GlobalConstants.NOTE_B_5];
                this._keyCodeNoteMapping[GlobalConstants.KEY_CODE_K] = ['C-6', GlobalConstants.NOTE_C_6];

                this._noteDisplay = new Konva.Text({
                    fill: '#000',
                    fontSize: Keyboard.LABEL_DISPLAY_FONT_SIZE
                });

                this._kineticGroup.add(this._noteDisplay);

                window.addEventListener("keyup", function (e) {
                    var keyValue = myKeyboard.retrieveKeyValueByKeyCode(e.keyCode, KeyValue.KEY_STATE_UP);

                    if (null === keyValue) {
                        return;
                    }

                    myKeyboard.updateNoteDisplay(keyValue.getNoteName());

                    myKeyboard.getCanvasState().getBaseLayer().setAttr(
                        'event',
                        new Event(
                            myKeyboard.getId(),
                            keyValue,
                            Event.TYPE_VALUE_CHANGED
                        )
                    );
                });

                window.addEventListener("keydown", function (e) {
                    var keyValue = myKeyboard.retrieveKeyValueByKeyCode(e.keyCode, KeyValue.KEY_STATE_DOWN);

                    if (null === keyValue) {
                        return;
                    }

                    myKeyboard.updateNoteDisplay(keyValue.getNoteName());

                    myKeyboard.getCanvasState().getBaseLayer().setAttr(
                        'event',
                        new Event(
                            myKeyboard.getId(),
                            keyValue,
                            Event.TYPE_VALUE_CHANGED
                        )
                    );
                });
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {number} keyCode
             * @param {number} keyState
             *
             * @return {Snautsynth.Control.UI.DiscreteControl.KeyValue}
             */
            retrieveKeyValueByKeyCode: function(keyCode, keyState) {
                if (!this._keyCodeNoteMapping.hasOwnProperty(keyCode)) {
                    return null;
                }

                return new KeyValue(
                    this._keyCodeNoteMapping[keyCode][1],
                    keyState,
                    this._keyCodeNoteMapping[keyCode][0]
                );
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             * @param {string} noteName
             */
            updateNoteDisplay: function(noteName) {
                this._noteDisplay.setText(noteName);
            },

            /**
             * @memberof Snautsynth.Audio.Module.Generator.Wave
             * @instance
             *
             */
            setUp: function() {

            }
        });

        return Keyboard;
    }
);
