import { createApp } from 'vue'
import App from './App.vue'
import { inject } from '@vercel/analytics'
import '@/assets/scripts/click'
import '@/assets/scripts/input'

createApp(App).mount('#app')

inject()
