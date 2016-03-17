define(['app/canvas/CanvasState',
		'app/util/formatter/NumberFormatter',
		'app/control/ui/rangecontrol/Knob',
		'src/Helper',
		'quickcheck',
		'app/datatype/NumberRange',
		'app/util/Position'],
	function(CanvasState, NumberFormatter, Knob, TestHelper, QuickCheck, NumberRange, Position) {
	'use strict';

	describe('Knob-Control', function() {
		var knob;

		beforeEach(function() {
		spyOn(document, 'getElementById').and.callFake(
			function() {
					var div = document.createElement("div");
					return div;
				}
		);

			knob = new Knob(
				1,
				new Position(100, 100),
				10,
				new CanvasState(600, 550, 'syn'),
				100,
				10,
				'#FFF'
			);
		});

		it('Tests rad to deg and deg to rad convertion - calcRadToDeg() -> calcDegToRad()', function() {
			expect(function(randomRealValue) {
				var calculatedDeg = Knob.calcRadToDeg(randomRealValue);
				var calculatedRad = Knob.calcDegToRad(calculatedDeg);

				return TestHelper.roundTwoDecPlaces(randomRealValue) == TestHelper.roundTwoDecPlaces(calculatedRad);
			}).forAll(QuickCheck.real);
		});


      });	
});
