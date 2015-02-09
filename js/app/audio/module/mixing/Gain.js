/**
 * @namespace Snautsynth.Audio.Module.Mixing
 */
define(
    [
        'dejavu',
        'app/audio/module/Module',
        'app/audio/module/IConnectable',
        'app/audio/module/IControlable'
    ],
    function(
        dejavu,
        Module,
        IConnectable,
        IConrolable
    ) {
        'use strict';

        var Gain = dejavu.Class.declare({
            $name: 'Gain',

            $extends: Module,

            $implements: [IConnectable, IConrolable],

            _gain: null
        });
    }
);