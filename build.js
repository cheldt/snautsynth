({
    paths: {
        kinetic : 'vendor/kinetic-v5.0.1.min',
        mout    : 'vendor/mout/src'
    },

    packages: [
        {
            name: 'dejavu',
            location: 'vendor/js-dejavu/dist/amd/strict'
        },
    ],

    baseUrl        : 'js',
    name           : 'app',
    out            : 'dist/app.js',
    removeCombined : false
})