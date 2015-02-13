/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /** @interface Snautsynth.Audio.Module.IConnectable */
    var IConnectable = dejavu.Interface.declare({
        $name: 'IConnectable',

        /**
         * @memberof Snautsynth.Audio.Module.IConnectable
         * @abstract
         * @instance
         *
         * @return {AudioNode}
         */
        getTargetNode: function () {},

        /**
         * @memberof Snautsynth.Audio.Module.IConnectable
         * @instance
         *
         * @param {Array.<Snautsynth.Audio.Module.Module>} moduleList
         */
        registerInputNodes: function (moduleList) {
            var currentModuleId = this._id;
            var targetNode      = this.getTargetNode();

            moduleList.forEach(function (module) {
                if (!dejavu.instanceOf(module, IConnecting)) {
                    return;
                }

                module.getModuleConnectionList().forEach(function (moduleConnection) {
                    if (moduleConnection.getTargetModuleId() !== currentModuleId) {
                        return;
                    }

                    moduleConnection.getNodeConnectionList().forEach(function (nodeConnection) {
                        nodeConnection.setTargetNode(targetNode);
                    });
                });
            });
        }
    });
});