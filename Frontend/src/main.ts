import { createPinia } from "pinia"
import { createApp } from 'vue'
import App from './App.vue'
import { createHead } from '@unhead/vue/client'
import router from './app/router'
import './shared/styles/appStyles.css'

const app = createApp(App)
const head = createHead()
app.use(createPinia())
app.use(router)
app.use(head)
app.mount('#app')
