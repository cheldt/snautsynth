/**
 * @namespace Snautsynth.Canvas
 */
define(
    [
        'dejavu',
        'app/util/Position',
        'konva',
        'app/util/MouseMovement'
    ],
    function(
        dejavu,
        Position,
        Konva,
        MouseMovement
    ) {
    var CanvasState = dejavu.Class.declare({
        $name: 'CanvasState',

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {Konva.Layer}
         */
        _baseLayer: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {Konva.Canvas}
         */
        _canvas: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {Konva.Context}
         */
        _canvasContext: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {Object}
         */
        _container: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {Array.<*>}
         */
        _controls: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {number}
         */
        _height: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {number}
         */
        _drawInterval: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {*}
         */
        _lastValue: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @type {Snautsynth.Util.MouseMovement}
         */
        _mouseMovement: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {boolean}
         */
        _pointerLocked: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {number}
         */
        _scale: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {Konva.Stage}
         */
        _stage: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @type {number}
         */
        _width: null,

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @return {Konva.Layer}
         */
        getBaseLayer: function() {
            return this._baseLayer;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @param {Konva.Layer} baseLayer
         */
        setBaseLayer: function(baseLayer) {
            this._baseLayer = baseLayer;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @return {Konva.Canvas}
         */
        getCanvas: function() {
            return this._canvas;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @param {Konva.Canvas} canvas
         */
        setCanvas: function(canvas) {
            this._canvas = canvas;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @return {Konva.Context}
         */
        getCanvasContext: function() {
            return this._canvasContext;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @return {Object}
         */
        getContainer: function() {
            return this._container;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @return {Array.<Snautsynth.Control.Control>}
         *
         */
        getControls: function() {
            return this._controls;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @return {*}
         */
        getLastValue: function() {
            return this._lastValue;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @param {*} lastValue
         */
        setLastValue: function(lastValue) {
            this._lastValue = lastValue;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @return {boolean}
         */
        getPointerLocked: function() {
            return this._pointerLocked;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @param {boolean} pointerLocked
         */
        setPointerLocked: function(pointerLocked) {
            this._pointerLocked = pointerLocked;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @return {Object}
         */
        getScale: function() {
            return this._stage.getScale();
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @return {Konva.Stage}
         */
        getStage: function() {
            return this._stage;
        },

        /**
         * @constructor
         * @class Snautsynth.Canvas.CanvasState
         *
         * @param {number} width
         * @param {number} height
         * @param {string} containerId
         */
        initialize: function(width, height, containerId) {
            this._stage = new Konva.Stage({
                container: containerId,
                width:     width,
                height:    height,
                scale: {x: 1, y: 1}
            });

            this._container = document.getElementById(containerId);

            // create base layer, which holds controls (shapes in layer) and other layers
            this._baseLayer = new Konva.Layer();

            // add layer to stage
            this._stage.add(this._baseLayer);

            var period = 2000;

            var myState = this;

            var anim = new Konva.Animation(
                function(frame) {

                },
                this._baseLayer
            );

            //anim.start();

            window.onresize = function () {
                myState.resize();
            };

            this._canvas = this._baseLayer.getCanvas()._canvas;

            this._mouseMovement = new MouseMovement();

            document.addEventListener('pointerlockchange', function() { myState.lockChangeCallback() }, false);
            document.addEventListener('mozpointerlockchange', function() { myState.lockChangeCallback() }, false);
            document.addEventListener('webkitpointerlockchange', function() { myState.lockChangeCallback() }, false);

            this._controls = [];
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @param {Snautsynth.Control.Control} control
         */
        addControl: function(control) {
            // add group to baseLayer of canvasState
            this._controls.push(control);
            this.addNodeToBaseLayer(control.getKonvaGroup());
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @param {Konva.Node} kineticNode
         */
        addNodeToBaseLayer: function(kineticNode) {
            this._baseLayer.add(kineticNode);
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         */
        clear: function() {
            //this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         */
        draw: function() {
            this._stage.clear();
            this._stage.draw();
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         *
         * @return {undefined|Snautsynth.Util.Position}
         */
        findPosition: function() {
            var obj     = this._canvas;
            var curleft = 0, curtop = 0;

            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop  += obj.offsetTop;
                    obj = obj.offsetParent;
                } while (obj);
                return new Position(curleft, curtop);
            }
            return undefined;
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @function
         *
         * @param {number} id
         *
         * @return {null|*}
         */
        getValueByControlId: function(id) {
            for (var controlIndex = 0; 0 < this._controls.length; controlIndex++) {
                var control = this._controls[controlIndex];

                if (control.getId() === id) {
                    return control.getValue();
                }
            }

            return null;
        },

        /**
         * Returns mouse-delta or position depending on pointer-lock.
         * Position is calculated scaling
         *
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @function
         *
         * @param {Object} e
         *
         * @return {Snautsynth.Util.MouseMovement}
         */
        getMouseMovement: function(e) {
            this._mouseMovement.calcMovement(e, this._pointerLocked);
            return this._mouseMovement;
        },

        /**
         * Called after mouse-pointer lock is achieved
         *
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @function
         */
        lockChangeCallback: function() {
            if (document.pointerLockElement === this._container ||
                document.mozPointerLockElement === this._container ||
                document.webkitPointerLockElement === this._container) {
                this._pointerLocked = true;
            } else {
                this._pointerLocked = false;
            }
        },

        /**
         * Try to lock mouse-pointer
         *
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @function
         */
        lockPointer: function() {
            this._container.requestPointerLock = this._container.requestPointerLock ||
                this._container.mozRequestPointerLock ||
                this._container.webkitRequestPointerLock;
            // Ask the browser to lock the pointer
            //this._container.requestPointerLock();
            this._lastY = 0;
        },

        /**
         * Resize stage on viewport
         *
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @function
         */
        resize: function () {
            // browser viewport size
            var windowWidth  = window.innerWidth;
            var windowHeight = window.innerHeight;

            var stageWidth  = this._stage.getWidth();
            var stageHeight = this._stage.getHeight();

            // check of stage fits in viewport => scale when viewport is to small
            if( windowWidth >= stageWidth && windowHeight >= stageHeight ) {
                this._scale = 1;
                this._stage.setScale({ x: 1, y: 1 });
            } else {
                // keep aspect ratio
                var scale   = Math.min(windowWidth / this._stage.getWidth(), windowHeight / this._stage.getHeight());
                this._scale = scale;

                this._stage.setScale({ x: scale, y: scale });
            }
        },

        /**
         * @memberof Snautsynth.Canvas.CanvasState
         * @instance
         * @function
         */
        unlockPointer: function() {
            if (this._pointerLocked) {
                document.exitPointerLock =  document.exitPointerLock ||
                    document.mozExitPointerLock ||
                    document.webkitExitPointerLock;

                //document.exitPointerLock();
            }
        }

    });
    return CanvasState;
});
