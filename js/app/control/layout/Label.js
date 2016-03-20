/**
 * @namespace Snautsynth.Control.Layout
 */
define(['dejavu', 'app/control/layout/LayoutControl'], function(dejavu, LayoutControl) {
    'use strict';

    return dejavu.Class.declare({
        $name: 'Label',

        $extends: LayoutControl,

        /**
         * @memberof Snautsynth.Control.Layout.Label
         * @instance
         *
         * @type {string}
         */
        __color: null,

        /**
         * @memberof Snautsynth.Control.Layout.Label
         * @instance
         *
         * @type {string}
         */
        _text: null,

        /**
         * @memberof Snautsynth.Control.Layout.Label
         * @instance
         * @function
         *
         * @return {string}
         */
        getColor: function() {
            return this.__color;
        },

        /**
         * @memberof Snautsynth.Control.Layout.Label
         * @instance
         * @function
         *
         * @param {string} color
         */
        setColor: function(color) {
            this.__color = color;
        },

        /**
         * @memberof Snautsynth.Control.Layout.Label
         * @instance
         * @function
         *
         * @return {string}
         */
        getText: function() {
            return this._text;
        },

        /**
         * @memberof Snautsynth.Control.Layout.Label
         *
         * @instance
         * @function
         *
         * @param {string} text
         */
        setText: function(text) {
            this._text = text;
        },

        /**
         * @constructor
         * @class Snautsynth.Control.Layout.Label
         * @extends Snautsynth.Control.Layout.LayoutControl
         *
         * @param {number} id
         * @param {Snautsynth.Util.Position} position
         * @param {Snautsynth.Canvas.CanvasState} canvasState
         * @param {string} color
         * @param {string} text
         */
        initialize: function(id, position, canvasState, color, text) {
            this.$super(id, position, canvasState);

            this.__color = color;
            this._text  = text;

            var textContainer = new Konva.Text({
                fill:             color,
                fontSize:         16,
                text:             text,
                listening:        false,
                strokeHitEnabled: false
            });

            this._kineticGroup.add(textContainer);
        }

    });
});
