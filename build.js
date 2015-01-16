({
    paths: {
        kinetic    : 'vendor/kinetic/kinetic.min',
        mout       : 'vendor/mout/src',
        requireLib : 'vendor/requirejs/require'
    },

    include : ['requireLib'],
    wrap    : true,

    packages: [
        {
            name: 'dejavu',
            location: 'vendor/dejavu/dist/amd/loose'
        },
    ],

    baseUrl        : 'js',
    name           : 'app',
    out            : 'dist/app.js',
    removeCombined : false
})