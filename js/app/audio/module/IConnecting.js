/**
 * @namespace Snautsynth.Audio.Module
 */
define(['dejavu'], function(dejavu) {
    'use strict';

    /** @interface Snautsynth.Audio.Module.IConnecting */
    var IConnectable = dejavu.Interface.declare({
        $name: 'IConnecting'
    });
});