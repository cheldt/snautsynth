define(['dejavu','app/event/CustomEvent', 'app/utils/MousePosition'], function(dejavu, CustomEvent, MousePosition){


    var CanvasState = dejavu.Class.declare({
        $name: 'CanvasState',

        $extends: CustomEvent,

        _lastValue: null,
        _lastMouseX: null,
        _lastMouseY: null,
        _lastMouseDownEventTmstamp: null,
        _canvas: null,
        _canvasContext: null,
        _controls: null,
        _drawInterval: null,

        _width: null,
        _height: null,

        _scale: null,

        _pointerLocked: null,

        getLastValue: function() {
            return this._lastValue;
        },
        setLastValue: function(lastValue) {
            this._lastValue = lastValue;
        },

        getLastMouseX: function() {
            return this._lastMouseX;
        },
        setLastMouseX: function(lastMouseX) {
            this._lastMouseX = lastMouseX;
        },

        getLastMouseY: function() {
            return this._lastMouseY;
        },
        setLastMouseY: function(lastMouseY) {
            this._lastMouseY = lastMouseY;
        },


        getLastMouseDownEventTmstamp: function() {
            return this._lastMouseDownEventTmstamp;
        },
        setLastMouseDownEventTmstamp: function(lastMouseDownEventTmstamp) {
            this._lastMouseDownEventTmstamp = lastMouseDownEventTmstamp;
        },


        getCanvas: function() {
            return this._canvas;
        },
        setCanvas: function(canvas) {
            this._canvas = canvas;
        },

        getScale: function() {
            return this._scale;
        },

        getCanvasContext: function() {
            return this._canvasContext;
        },

        getPointerLocked: function() {
            return this._pointerLocked;
        },

        initialize: function(canvas, width, height) {
            this.$super();

            this._canvas = canvas;
            this._width = width;
            this._height = height;

            this._canvasContext = canvas.getContext("2d");

            this._canvas.width = width;
            this._canvas.height = height;

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

            document.addEventListener('pointerlockchange', function() { myState.lockChangeCallback() }, false);
            document.addEventListener('mozpointerlockchange', function() { myState.lockChangeCallback() }, false);
            document.addEventListener('webkitpointerlockchange', function() { myState.lockChangeCallback() }, false);

            window.onresize = function () {
                myState.resize();
            },
            setInterval(function() { myState.draw(); }, myState.interval);
        },

        lockChangeCallback: function() {
            if (document.pointerLockElement === this._canvas ||
                document.mozPointerLockElement === this._canvas ||
                document.webkitPointerLockElement === this._canvas) {
                this._pointerLocked = true;
            } else {
                this._pointerLocked = false
            }
        },

        resize: function () {
            // browser viewport size
            var w = window.innerWidth;
            var h = window.innerHeight;

            /*
            var dpr = window.devicePixelRatio || 1;
            var bsr = this._canvasContext.webkitBackingStorePixelRatio ||
                this._canvasContext.mozBackingStorePixelRatio ||
                this._canvasContext.msBackingStorePixelRatio ||
                this._canvasContext.oBackingStorePixelRatio ||
                this._canvasContext.backingStorePixelRatio || 1;

            var pixelRatio = dpr / bsr;
            */

            // keep aspect ratio
            var scale = Math.min(w / this._width, h / this._height);
            this._scale = scale;

            // adjust canvas size
            this._canvas.width = this._width * scale;
            this._canvas.height = this._height * scale;
            this._canvas.style.width = this._canvas.width + "px";
            this._canvas.style.height = this._canvas.height + "px";
            this._canvasContext.scale(scale,scale);
            //context.translate(canvas.width / 2, canvas.height / 2);

            this.draw();
        },

        addControl: function(control) {
            this._controls.push(control);
        },

        clear: function() {
            this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
        },

        draw: function() {
            //clear canvas
            this.clear();

            // ** Add stuff you want drawn in the background all the time here **
            // draw all controls
            var ctrCount = this._controls.length;
            for (var ctrIndex = 0; ctrIndex < ctrCount; ctrIndex++) {
                this._controls[ctrIndex].draw();
            }
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

        getMousePosition: function(e) {
            var mx, my;
            if(this._pointerLocked) {
                mx = e.movementX ||
                    e.mozMovementX          ||
                    e.webkitMovementX       ||
                    0;

                my = e.movementY ||
                    e.mozMovementY      ||
                    e.webkitMovementY   ||
                    0;
            } else {
                var pos = this.findPosition();
                mx = (e.pageX - pos.x) / this._scale;
                my = (e.pageY - pos.y) / this._scale;
            }

            // We return a simple javascript object (a hash) with x and y defined
            return new MousePosition(mx, my);
        },

        lockPointer: function() {

            this._canvas.requestPointerLock = this._canvas.requestPointerLock ||
                this._canvas.mozRequestPointerLock ||
                this._canvas.webkitRequestPointerLock;

            // Ask the browser to lock the pointer)
            this._canvas.requestPointerLock();
        },

        unlockPointer: function() {
            document.exitPointerLock = document.exitPointerLock ||
                document.mozExitPointerLock ||
                document.webkitExitPointerLock;

            document.exitPointerLock();
        },

        getValueByControlId: function(id) {
            var ctrCount = this._controls.length;
            for (var ctrIndex = 0; ctrIndex < ctrCount; ctrIndex++) {
                var ctrl = this._controls[ctrIndex];
                if(ctrl.getId() == id)
                    return ctrl.getValue();
            }
            return null;
        }

    });
    return CanvasState;
});