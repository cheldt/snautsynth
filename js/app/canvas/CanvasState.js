define(['dejavu','app/event/CustomEvent', 'app/utils/MousePosition', 'kinetic'], function(dejavu, CustomEvent, MousePosition, Kinetic){


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

        _stage: null,

        _baseLayer: null,

        _width: null,
        _height: null,

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
        setPointerLocked: function(pointerLocked) {
            this._pointerLocked = pointerLocked;
        },

        addNodeToBLayer: function(kineticNode) {
            this._baseLayer.add(kineticNode);
        },

        initialize: function(width, height) {


            // create canvas element
            //var canvas = document.createElement('canvas');
            //canvas.setAttribute('id','cvs');

            // append canvas into dom-tree
            //document.body.appendChild(canvas);

            this._stage = new Kinetic.Stage({
                container: 'syn',
                width: width,
                height: height,
                scale: {x: 1, y: 1}
            });

            // create base layer, which holds controls (shapes in layer) and other layers
            this._baseLayer = new Kinetic.Layer();

            // add layer to stage
            this._stage.add(this._baseLayer);
            
            this._drawInterval = 30;

            var myState = this;
            
            setInterval(function() { myState.draw(); }, 30);

            window.onresize = function () {
                myState.resize();
            }
            //myState.draw();
            
            this._baseLayer.on('mouseout', function(evt) {
                myState.unlockPointer();    
            });
            
            this._canvas = this._baseLayer.getCanvas()._canvas;
            
            this._canvas.addEventListener('mouseup', function(e) {
               myState.unlockPointer();
            }, true);
            
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
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var stageWidth = this._stage.getWidth();
            var stageHeight = this._stage.getHeight();

            // check of stage fits in viewport => scale when viewport is to small
            if( windowWidth >= stageWidth && windowHeight >= stageHeight ) {
                this._stage.setScale({ x: 1, y: 1 });
            } else {
                // keep aspect ratio
                var scale = Math.min(windowWidth / this._stage.getWidth(), windowHeight / this._stage.getHeight());
                this._stage.setScale({ x: scale, y: scale });
                this._stage.draw();
            }


        },

        addControl: function(control) {
            //this._controls.push(control);
        },

        clear: function() {
            this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
        },

        draw: function() {
            this._stage.clear();
            this._stage.draw();
            /*
            //clear canvas
            this.clear();

            // ** Add stuff you want drawn in the background all the time here **
            // draw all controls
            var ctrCount = this._controls.length;
            for (var ctrIndex = 0; ctrIndex < ctrCount; ctrIndex++) {
                this._controls[ctrIndex].draw();
            }
            */
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
                mx = (e.pageX - pos.x) / this._stage.getScale();
                my = (e.pageY - pos.y) / this._stage.getScale();
            }

            // We return a simple javascript object with x and y defined
            return new MousePosition(mx, my);
        },

        lockPointer: function() {
            var canvas = this._baseLayer.getCanvas()._canvas;

            canvas.requestPointerLock = canvas.requestPointerLock ||
                canvas.mozRequestPointerLock ||
                canvas.webkitRequestPointerLock;

            // Ask the browser to lock the pointer
            canvas.requestPointerLock();
        },

        unlockPointer: function() {
            if (this._pointerLocked) {
                document.exitPointerLock = document.exitPointerLock ||
                    document.mozExitPointerLock ||
                    document.webkitExitPointerLock;
    
                document.exitPointerLock();
            }
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