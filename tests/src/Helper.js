define(['dejavu'], function(dejavu){
	var Helper = dejavu.Class.declare({
		$name: 'Helper',

		$statics: {

			/**
			 * Rounds value to two decimal places
			 *
 			 * @param {Number} value - Value to be rounded
			 */
			roundTwoDecPlaces: function(value) {
				return Math.round(value * 100) / 100;
			}
		}
	});

	return Helper;
});