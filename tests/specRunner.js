require.config({
	//urlArgs: 'cb=' + Math.random(),
	paths: {
		app:            '../js/app',
		mout:           '../js/vendor/mout/src',
		kinetic:        '../js/vendor/kinetic.min',
		jasmine:        'lib/jasmine/jasmine',
		'jasmine-html': 'lib/jasmine/jasmine-html',
		boot:           'lib/jasmine/boot',
		quickcheck:     'lib/jasmine-quick-check',
		src:            'src'
	},

	packages: [
		{
			name:     'dejavu',
			location: '../js/vendor/js-dejavu/dist/amd/strict'
		}
	],

	shim: {
		jasmine: {
			exports: 'window.jasmineRequire'
		},
		'jasmine-html': {
			deps: ['jasmine'],
			exports: 'window.jasmineRequire'
		},
		boot: {
			deps: ['jasmine', 'jasmine-html'],
			exports: 'window.jasmineRequire'
		},
		quickcheck: {
			exports: 'qc'
		},
		'kinetic' : {
			exports: 'Kinetic'
		}
	}
});

var specs = [
	'spec/app/controls/ui/KnobSpec'
];


// Load Jasmine - This will still create all of the normal Jasmine browser globals unless `boot.js` is re-written to use the
// AMD or UMD specs. `boot.js` will do a bunch of configuration and attach it's initializers to `window.onload()`. Because
// we are using RequireJS `window.onload()` has already been triggered so we have to manually call it again. This will
// initialize the HTML Reporter and execute the environment.
require(['boot'], function() {

	// Load the specs
	require(specs, function () {
		// Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
		window.onload();
	});
});
