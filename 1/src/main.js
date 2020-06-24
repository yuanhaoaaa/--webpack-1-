import Vue from 'vue'
import Router from '@/router/config'
import Store from '@/store/config'
import App from './App.vue'

import 'view-design/dist/styles/iview.css'
import { Button, Table, Icon } from 'view-design'
Vue.component('Button', Button)
Vue.component('Table', Table)
Vue.component('Icon', Icon)

new Vue({
    el: '#root',
    router: Router,
    store: Store,
    render: h => h(App)
})
