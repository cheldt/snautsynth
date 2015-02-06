/**
 * String module
 *
 * @module    app/util/String
 * @namespace Snautsynth.Util
 */
define(
    ['dejavu'],
    function(dejavu) {
        /** @class Snautsynth.Util.String */
        return dejavu.Class.declare({
                $name: 'String',

                $statics: {
                    /**
                     * @memberof Snautsynth.Util.String
                     * @static
                     *
                     * @param {string} stringValue
                     * @param {Array.<*>} replacements
                     *
                     * @return {string}
                     */
                    multiReplace: function(stringValue, replacements) {
                        return stringValue.replace(/%\w+%/g, function(all) {
                            return replacements[all] || all;
                        });
                    }
                }
            }
        );
    }
);