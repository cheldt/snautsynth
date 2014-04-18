define(['dejavu'], function(dejavu, UIControl){
    var Formatter = dejavu.AbstractClass.declare({
	$name: 'Formatter',

	$abstracts: {
            format: function(value) {}
        }
    })
    
    return Formatter;
});
