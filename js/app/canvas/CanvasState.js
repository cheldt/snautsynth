define(['dejavu','app/event/CustomEvent', 'app/utils/MousePosition', 'kinetic'], function(dejavu, CustomEvent, MousePosition, Kinetic){


    var CanvasState = dejavu.Class.declare({
        $name: 'CanvasState',

        //$extends: CustomEvent,

        _baseLayer: null,

        _canvas: null,

        _canvasContext: null,

        _container: null,

        _controls: null,

        _height: null,

        _drawInterval: null,

        _lastMouseX: null,

        _lastMouseY: null,

        _lastValue: null,

        _pointerLocked: null,

        _scale: null,

        _stage: null,

        _width: null,

        getBaseLayer: function() {
            return this._baseLayer;
        },
        setBaseLayer: function(baseLayer) {
            this._baseLayer = baseLayer;
            return this;
        },

        getCanvas: function() {
            return this._canvas;
        },
        setCanvas: function(canvas) {
            this._canvas = canvas;
            return this;
        },

        getCanvasContext: function() {
            return this._canvasContext;
        },
        
        getContainer: function() {
            return this._container;
        },

        getLastMouseX: function() {
            return this._lastMouseX;
        },
        setLastMouseX: function(lastMouseX) {
            this._lastMouseX = lastMouseX;
        },

        getLastValue: function() {
            return this._lastValue;
        },
        setLastValue: function(lastValue) {
            this._lastValue = lastValue;
        },

        getLastMouseY: function() {
            return this._lastMouseY;
        },
        setLastMouseY: function(lastMouseY) {
            this._lastMouseY = lastMouseY;
        },

        getPointerLocked: function() {
            return this._pointerLocked;
        },
        setPointerLocked: function(pointerLocked) {
            this._pointerLocked = pointerLocked;
        },

        getScale: function() {
            return this._scale;
        },

        getStage: function() {
            return this._stage;
        },

        initialize: function(width, height, containerId) {


            // create canvas element
            //var canvas = document.createElement('canvas');
            //canvas.setAttribute('id','cvs');

            // append canvas into dom-tree
            //document.body.appendChild(canvas);

            this._stage = new Kinetic.Stage({
                container: containerId,
                width: width,
                height: height,
                scale: {x: 1, y: 1}
            });

            this._container = document.getElementById(containerId);

            // create base layer, which holds controls (shapes in layer) and other layers
            this._baseLayer = new Kinetic.Layer();

            // add layer to stage
            this._stage.add(this._baseLayer);
            
            this._drawInterval = 30;

            var myState = this;
            
            
            (function animloop(){
                window.requestAnimationFrame(animloop);
                myState.draw();
            })();
            
            //setInterval(function() { myState.draw(); }, 30);

            window.onresize = function () {
                myState.resize();
            }

            this._canvas = this._baseLayer.getCanvas()._canvas;

            //this._container.addEventListener('mouseup', function(e) {
               //myState.unlockPointer();
            //}, false);

            document.addEventListener('pointerlockchange', function() { myState.lockChangeCallback() }, false);
            document.addEventListener('mozpointerlockchange', function() { myState.lockChangeCallback() }, false);
            document.addEventListener('webkitpointerlockchange', function() { myState.lockChangeCallback() }, false);


            /*
            this._canvas = canvas;
            this._width = width;
            this._height = height;


            this._canvas.width = width;
            this._canvas.height = height;
            this._canvasContext = this._canvas.getContext("2d");

            this._controls = [];
            this._drawInterval = 30;
            this._scale = 1;

            this.resize();

            //fixes a problem where double clicking causes text to get selected on the canvas
            this._canvas.addEventListener('selectstart', function(e) {e.preventDefault(); return false; }, false);

            var myState = this;
            this._canvas.addEventListener('mousedown', function(e) {
                var mousePos = myState.getMousePosition(e);
                myState.setLastMouseDownEventTmstamp( new Date().getTime() );
                myState.fire("mousedown", myState, mousePos);
            },true);

            this._canvas.addEventListener('mousemove', function(e) {
                var mousePos = myState.getMousePosition(e);
                myState.fire("mousemove", myState,mousePos);
                myState.setLastMouseY(mousePos.getY());
            }, true)

            this._canvas.addEventListener('mouseup', function(e) {
                myState.fire("mouseup",myState, {});
            }, true);

            this._canvas.addEventListener('mouseout', function(e) {
                myState.fire("mouseout",myState, {});
            }, true),

            


            setInterval(function() { myState.draw(); }, myState.interval);

            */
        },

        addControl: function(control) {
            // add group to baseLayer of canvasState
            this.addNodeToBLayer(control.getKineticGroup());
        },

        addNodeToBLayer: function(kineticNode) {
            this._baseLayer.add(kineticNode);
        },

        clear: function() {
            this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
        },

        draw: function() {
            this._stage.clear();
            this._stage.draw();
        },

        findPosition: function() {
            var obj = this._canvas;
            var curleft = 0, curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                    obj = obj.offsetParent;
                } while (obj);
                return { x: curleft, y: curtop };
            }
            return undefined;
        },

        getValueByControlId: function(id) {
            var ctrCount = this._controls.length;
            for (var ctrIndex = 0; ctrIndex < ctrCount; ctrIndex++) {
                var ctrl = this._controls[ctrIndex];
                if(ctrl.getId() == id)
                    return ctrl.getValue();
            }
            return null;
        },

        /**
         * Returns mouse-delta or position depending on pointer-lock.
         * Position is calculated scaling
         * @param e
         * @returns {app.utils.MousePosition}
         */
        getMousePosition: function(e) {
            var mx, my;
            if(this._pointerLocked) {
                mx = e.movementX
                  || e.mozMovementX
                  || e.webkitMovementX
                  || 0;

                my = e.movementY
                  || e.mozMovementY
                  || e.webkitMovementY
                  || 0;
            } else {
                var pos = this.findPosition();
                mx = (e.pageX - pos.x) / this._stage.getScale();
                my = (e.pageY - pos.y) / this._stage.getScale();
            }

            return new MousePosition(mx, my);
        },

        /**
         * Called after mouse-pointer lock is achieved
         */
        lockChangeCallback: function() {
            if (document.pointerLockElement === this._container ||
                document.mozPointerLockElement === this._container ||
                document.webkitPointerLockElement === this._container) {
                this._pointerLocked = true;
            } else {
                this._pointerLocked = false
            }
        },

        /**
         * Try to lock mouse-pointer
         */
        lockPointer: function() {
            this._container.requestPointerLock = this._container.requestPointerLock ||
                this._container.mozRequestPointerLock ||
                this._container.webkitRequestPointerLock;
            // Ask the browser to lock the pointer
            this._container.requestPointerLock();
        },

        /**
         * Resize stage on viewport
         */
        resize: function () {
            // browser viewport size
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var stageWidth = this._stage.getWidth();
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
                this._stage.draw();
            }
        },

        unlockPointer: function() {
            if (this._pointerLocked) {
                document.exitPointerLock =  document.exitPointerLock ||
                    document.mozExitPointerLock ||
                    document.webkitExitPointerLock;

                document.exitPointerLock();
            }
        }

    });
    return CanvasState;
});