define(['app/canvas/CanvasState',
		'app/utils/formatter/NumberFormatter',
		'app/controls/ui/Knob',
		'src/Helper',
		'quickcheck'],
	function(CanvasState, NumberFormatter, Knob, TestHelper, QuickCheck) {
	'use strict';

	describe('Knob-Control', function() {
		var knob;

		beforeEach(function() {
			var canvasState     = new CanvasState(600, 550, 'syn');
			var numberFormatter = new NumberFormatter('#0');

			knob = new Knob(1, 100, 100, 10, canvasState, 100, 0, 100, 10, '#FFF', 10, 2, 5, numberFormatter);
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
						var minRad = knob.getMinPointerRad();
						var maxRad = knob.getMaxPointerRad();
						var minValue = knob.getMinValue();
						var maxValue = knob.getMaxValue();

						var calculatedRad  = Knob.calcRadFromValue(
							randomRealValue,
							minRad,
							maxRad,
							minValue,
							maxValue
						);

						var calculatedValue = Knob.calcValueFromRad(
							calculatedRad,
							minRad,
							maxRad,
							minValue,
							maxValue
						);

						return TestHelper.roundTwoDecPlaces(randomRealValue) == TestHelper.roundTwoDecPlaces(calculatedValue);
					}
				).forAll(QuickCheck.real);
			}
		);
	});
});