define(['app/canvas/CanvasState',
		'app/util/formatter/NumberFormatter',
		'app/control/ui/rangecontrol/Knob',
		'src/Helper',
		'quickcheck',
		'app/datatype/NumberRange',
		'app/util/Position',],
	function(CanvasState, NumberFormatter, Knob, TestHelper, QuickCheck, NumberRange, Position) {
	'use strict';

	describe('Knob-Control', function() {
		var knob;

		beforeEach(function() {
			knob = new Knob(
				1,
				new Position(100, 100),
				10,
				new CanvasState(600, 550, 'syn'),
				100,
				new NumberRange(0, 100),
				10,
				'#FFF',
				10,
				2,
				5,
				new NumberFormatter('#0')
			);
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