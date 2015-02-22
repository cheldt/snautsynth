/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu', 'app/audio/module/IConnectable'], function(dejavu, IConnectable) {
    'use strict';

    return dejavu.Class.declare({
        $name: 'ChannelConnection',

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         * @protected
         *
         * @type {number}
         */
        _id: null,

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         * @protected
         *
         * @type {boolean}
         */
        _isConnected: null,

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         * @protected
         *
         * @type {number}
         */
        _sourceChannelNumber: null,

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         * @protected
         *
         * @type {AudioNode}
         */
        _sourceNode: null,

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         * @protected
         *
         * @type {number}
         */
        _targetChannelNumber: null,

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         * @protected
         *
         * @type {AudioNode}
         */
        _targetNode: null,

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         *
         * @return {number}
         */
        getId: function() {
           return this._id;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         *
         * @param {number} id
         */
        setId: function(id) {
            this._id = id;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         *
         * @return {boolean}
         */
        getIsConnected: function() {
            return this._isConnected;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         *
         * @param isConnected
         */
        setIsConnected: function(isConnected) {
            this._isConnected = isConnected;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         *
         * @return {number}
         */
        getSourceChannelNumber: function() {
            return this._sourceChannelNumber;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         *
         * @return {AudioNode}
         */
        getSourceNode: function() {
            return this._sourceNode;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         *
         * @param {AudioNode} sourceNode
         */
        setSourceNode: function(sourceNode) {
            this._sourceNode = sourceNode;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         *
         * @return {number}
         */
        getTargetChannelNumber: function() {
            return this._targetChannelNumber;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         *
         * @return {AudioNode}
         */
        getTargetNode: function() {
            return this._targetNode;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         *
         * @param {AudioNode} targetNode
         */
        setTargetNode: function(targetNode) {
            this._targetNode = targetNode;
        },

        /**
         * @constructor
         * @class Snautsynth.Audio.Module.ChannelConnection
         *
         * @param {number} sourceChannelNumber
         * @param {number} targetChannelNumber
         */
        initialize: function(sourceChannelNumber, targetChannelNumber) {
            this._sourceChannelNumber = sourceChannelNumber;
            this._targetChannelNumber = targetChannelNumber;
        },

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         */
        connectNodes: function() {
            this._isConnected = true;
            this._sourceNode.connect(this._targetNode, this._sourceChannelNumber, this._targetChannelNumber);
        },

        /**
         * @memberof Snautsynth.Audio.Module.ChannelConnection
         * @instance
         */
        disconnectNodes:function() {
            this._isConnected = false;
            this._sourceNode.disconnect(this._sourceChannelNumber);
        }
    });
});