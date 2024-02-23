import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
import Tooltip from 'primevue/tooltip'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.directive('tooltip', Tooltip);
app.mount('#app')