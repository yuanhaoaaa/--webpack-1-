import Vue from 'vue'
import Router from '@/router/config'
import Store from '@/store/config'
import App from './App.vue'

new Vue({
  el: '#root',
  router: Router,
  store: Store,
  render: h => h(App)
})
