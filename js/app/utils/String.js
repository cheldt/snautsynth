define(['dejavu'], function(dejavu){
    var String = dejavu.Class.declare({
        $name: 'String',

        $statics: {
            multiReplace: function(stringValue,replacements) {
                return stringValue.replace(/%\w+%/g, function(all) {
                    return replacements[all] || all;
                });
            }
        }

    });
    return String;
});