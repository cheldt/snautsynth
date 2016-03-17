var allTestFiles = [
	'tests/spec/app/control/ui/KnobSpec'
];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  paths: {
                app:            'js/app',
                mout:           'js/vendor/mout/src',
                quickcheck:     'tests/lib/jasmine-quick-check',
		konva:          'js/vendor/konva/konva.min',
                src:            'tests/src',
  },

  packages: [
                {
                        name:     'dejavu',
                        location: 'js/vendor/dejavu/dist/amd/strict'
                }
        ],

  shim: {
        'konva' : {
            exports: 'Konva'
        },
				quickcheck: {
					exports: 'qc'
				},
    },


  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
