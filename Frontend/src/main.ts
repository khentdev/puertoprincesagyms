import { VueQueryPlugin } from '@tanstack/vue-query'
import { createThumbmarkPlugin } from '@thumbmarkjs/vue'
import { createPinia } from "pinia"
import { createApp } from 'vue'
import App from './App.vue'
import router from './app/router'
import './shared/styles/appStyles.css'

const app = createApp(App)
app.use(VueQueryPlugin)
app.use(createPinia())
app.use(router)
app.use(createThumbmarkPlugin({
    options: {
        logging: false,
        exclude: [
            'audio',
            'canvas',
            'webgl',
            'system.browser.version',
            'screen',
            'permissions',
            'plugins',
            'locales.timezone',
            'system.useragent',
            'system.browser',
            'system.mobile',
            'system.cookieEnabled',
            'system.applePayVersion',
            'math',
            'system.hardwareConcurrency',
            'hardware.deviceMemory',
            'hardware.jsHeapSizeLimit',
        ],
    }
}))
app.mount('#app')
