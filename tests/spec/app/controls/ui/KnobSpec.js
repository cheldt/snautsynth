define(['app/canvas/CanvasState',
		'app/utils/formatter/NumberFormatter',
		'app/controls/ui/Knob',
		'quickcheck'],
	function(CanvasState, NumberFormatter, Knob, qc) {
	'use strict';

	describe('Knob-Control', function() {
		var knob;

		beforeEach(function() {
			var canvasState     = new CanvasState(600, 550, 'syn');
			var numberFormatter = new NumberFormatter('#0');

			knob = new Knob(1, 100, 100, 10, canvasState, 100, 0, 100, 10, '#FFF', 10, 2, 5, numberFormatter);
		});

		it('Tests rad to deg and deg to rad convertion - calcRadToDeg() -> calcDegToRad()', function() {
			var expectedRadValue = Math.random();

			var calculatedDeg = Knob.calcRadToDeg(expectedRadValue);
			var calculatedRad = Knob.calcDegToRad(calculatedDeg);

			expect(expectedRadValue).toBe(calculatedRad);
		});

		/*
		it('Tests rad to deg and deg to rad convertion - calcRadToDeg() -> calcDegToRad()', function() {
			expect(function(randomRadValue) {
				var calculatedDeg = Knob.calcRadToDeg(randomRadValue);
				var calculatedRad = Knob.calcDegToRad(calculatedDeg);

				console.log(randomRadValue);
				console.log(calculatedRad);

				return randomRadValue == calculatedRad;
			}).forAll(qc.int);
		});
		*/
	});
});