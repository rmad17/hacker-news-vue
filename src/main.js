
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ItemList from './components/ItemList.vue'
import ItemView from './components/ItemView.vue'

Vue.use(VueRouter)
const router =  new VueRouter({
	routes: [
		{ path: '/top', component: ItemList },
		//{ path: '/top/:page(\\d+)?', component: ItemList },
		// { path: '/new/:page(\\d+)?', component: createListView('new') },
		// { path: '/show/:page(\\d+)?', component: createListView('show') },
		// { path: '/ask/:page(\\d+)?', component: createListView('ask') },
		// { path: '/job/:page(\\d+)?', component: createListView('job') },
		{ path: '/item/:id(\\d+)', component: ItemView },
		{ path: '/', redirect: '/top' }
  ]});

new Vue({
	el: "#app",
  router,
	render: h => h(App)
})
