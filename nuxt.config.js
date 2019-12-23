const env = require("./env.json");

export default {
    mode: 'universal',

    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    loading: { color: '#fff' },
    css: [
    ],
    plugins: [
    ],
    buildModules: [
    ],
    modules: [
    ],
    build: {
        extend (config, ctx) {
        }
    },
    server: {
        port: env.port || 3000,
    },
    env: {
        baseUrl: env.url ? env.url.replace(/\/+$/, "") : "http://localhost:3000",
    },
}
