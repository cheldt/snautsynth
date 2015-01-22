define(['app/canvas/CanvasState',
		'app/utils/formatter/NumberFormatter',
		'app/controls/ui/Knob',
		'src/Helper',
		'quickcheck',
		'app/datatypes/NumberRange'],
	function(CanvasState, NumberFormatter, Knob, TestHelper, QuickCheck, NumberRange) {
	'use strict';

	describe('Knob-Control', function() {
		var knob;

		beforeEach(function() {
			var canvasState     = new CanvasState(600, 550, 'syn');
			var numberFormatter = new NumberFormatter('#0');
			var valueRange      = new NumberRange(0, 100);

			knob = new Knob(1, 100, 100, 10, canvasState, 100, valueRange, 10, '#FFF', 10, 2, 5, numberFormatter);
		});

		it('Tests rad to deg and deg to rad convertion - calcRadToDeg() -> calcDegToRad()', function() {
			expect(function(randomRealValue) {
				var calculatedDeg = Knob.calcRadToDeg(randomRealValue);
				var calculatedRad = Knob.calcDegToRad(calculatedDeg);

				return TestHelper.roundTwoDecPlaces(randomRealValue) == TestHelper.roundTwoDecPlaces(calculatedRad);
			}).forAll(QuickCheck.real);
		});

		it(
			'Tests controller-value to radian and radian to controller-value convertion - calcRadFromValue() -> calcValueFromRad()',
			function() {
				expect(
					function(randomRealValue) {
						var calculatedRad  = Knob.calcRadFromValue(
							randomRealValue,
							knob.getPointerRadRange(),
							knob.getValueRange()
						);

						var calculatedValue = Knob.calcValueFromRad(
							calculatedRad,
							knob.getPointerRadRange(),
							knob.getValueRange()
						);

						return TestHelper.roundTwoDecPlaces(randomRealValue) == TestHelper.roundTwoDecPlaces(calculatedValue);
					}
				).forAll(QuickCheck.real);
			}
		);
	});
});