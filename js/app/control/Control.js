/**
 * @namespace Snautsynth.Control
 */
define(['dejavu', 'konva', 'app/util/Position'], function(dejavu, Konva, Position) {
    'use strict';

    return dejavu.Class.declare({
        $name: 'Control',

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @type {Snautsynth.Canvas.CanvasState}
         */
        _canvasState: null,

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @type {Array.<Snautsynth.Control.Control>}
         */
        _controls: null,

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @type {number}
         */
        _id: null,

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         * @type {Konva.Group}
         */
        _kineticGroup: null,

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @return {Snautsynth.Canvas.CanvasState}
         */
        getCanvasState: function() {
            return this._canvasState;
        },

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @return {Array.<Snautsynth.Control.Control>}
         */
        getControls: function() {
            return this._controls;
        },

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @return {number}
         */
        getId: function() {
            return this._id;
        },

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @param {number} id
         */
        setId: function(id) {
            this._id = id;
        },

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @return {Konva.Group}
         */
        getKonvaGroup: function() {
            return this._kineticGroup;
        },

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @return {Snautsynth.Util.Position}
         */
        getPosition: function() {
            return new Position(
                this._kineticGroup.getX(),
                this._kineticGroup.getY()
            );
        },

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @param {Snautsynth.Util.Position} position
         */
        setPosition: function(position) {
            this._kineticGroup.setX(position.getX());
            this._kineticGroup.setY(position.getY());
        },

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @return {number}
         */
        getX: function() {
            return this._kineticGroup.getX();
        },

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @param {number} x
         */
        setX: function(x) {
            this._kineticGroup.setX(x);
        },

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @return {number}
         */
        getY: function() {
            return this._kineticGroup.getY();
        },

        /**
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @param {number} y
         */
        setY: function(y) {
            this._kineticGroup.setY(y);
        },

        /**
         * @constructor
         * @class Snautsynth.Control.Control
         *
         * @param {number}                        id
         * @param {Snautsynth.Util.Position}      position
         * @param {Snautsynth.Canvas.CanvasState} canvasState
         */
        initialize: function(id, position, canvasState) {
            this._id           = id;
            this._canvasState  = canvasState;

            this._kineticGroup = new Konva.Group();

            this._kineticGroup.setX(position.getX());
            this._kineticGroup.setY(position.getY());
        },

        /**
         * Adds ui-control to control-list and adds kinetic-group of sub-control
         * to ui-controls kinetic-group
         *
         * @memberof Snautsynth.Control.Control
         * @instance
         *
         * @param {Snautsynth.Control.Control} control
         */
        addControl: function(control) {
            if (null === this._controls) {
                this._controls = [];
            }

            this._controls.push(control);
            this._kineticGroup.add(control.getKonvaGroup());
        },

        /**
         * Checks if subcontrols exist
         *
         * @return {boolean}
         */
        hasControls: function() {
            if (null === this._controls) {
                return false;
            }

            if (0 < this._controls.length) {
                return true;
            }

            return false;
        }
    });
});