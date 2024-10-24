import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faSun, faCloudSunRain, faCloud, faCloudRain, faSnowflake, faSmog, faCloudSun, faCloudShowersHeavy, faCloudShowersWater, faCloudBolt } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faSun, faCloudSunRain, faCloud, faCloudRain, faSnowflake, faSmog, faCloudSun, faCloudShowersHeavy, faCloudShowersWater, faCloudBolt)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia())
app.use(router)
app.use(Antd)


app.mount('#app')
