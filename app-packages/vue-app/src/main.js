import './App.css'

import { createApp } from 'vue'
import TodoApp from './App.vue'
import router from './router'

createApp(TodoApp).use(router).mount('#app')
