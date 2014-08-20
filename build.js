({
    paths: {
        kinetic    : 'vendor/kinetic-v5.0.1.min',
        mout       : 'vendor/mout/src',
        requireLib : 'vendor/require'
    },

    include : ['requireLib'],
    wrap    : true,

    packages: [
        {
            name: 'dejavu',
            location: 'vendor/js-dejavu/dist/amd/loose'
        },
    ],

    baseUrl        : 'js',
    name           : 'app',
    out            : 'dist/app.js',
    removeCombined : false
})