import { createApp } from 'vue'

import 'normalize.css'
import './assets/css/index.less'
import App from '@/views/app.vue'
import router from './router'
import store from './store'
import icons from './global/registry-icons'

const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)
app.mount('#app')
