import Vue from 'vue'
import Router from 'vue-router'
// import { domain, fromNow } from './filters'
import App from './components/App.vue'
import DefaultView from './components/DefaultView.vue'
import NewView from './components/NewView.vue'
import HelloWorld from './components/HelloWorld.vue'
// import UserView from './components/UserView.vue'

Vue.use(Router)

// register filters globally
// Vue.filter('fromNow', fromNow)
// Vue.filter('domain', domain)

// routing
var router = new Router()

router.map({
  '/': {
    component: DefaultView
  },
  '/hello': {
    component: HelloWorld
  },
  '/new': {
    component: NewView
  },
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.start(App, '#app')
