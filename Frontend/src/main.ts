import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './app/router'
import './shared/styles/appStyles.css'

export const createApp = ViteSSG(
    App,
    { routes },
    ({ app }) => {
        const pinia = createPinia()
        const head = createHead()

        app.use(pinia)
        app.use(head)
    }
)