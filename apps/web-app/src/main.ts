import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueClientRecaptcha from 'vue-client-recaptcha'

import App from './App.vue'
import router from './router'

import './assets/main.scss'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.component('VueClientRecaptcha', VueClientRecaptcha)

app.use(createPinia())
app.use(router)
app.mount('#app')
