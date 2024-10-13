import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')