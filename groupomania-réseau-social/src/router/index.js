import { createRouter, createWebHistory } from 'vue-router'
import Connection from '../views/Connection.vue'
import store from '../store/index.js'

const routes = [
	{
		path: '/',
		redirect: '/login',
		name: 'Connection',
		component: Connection
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue')
	},
	{
		path: '/signup',
		name: 'Signup',
		component: () => import('../views/Signup.vue')
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/modify-post/:id',
		name: 'Modify-Post',
		component: () => import('../views/Modify-Post.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/membres',
		name: 'Membres',
		component: () => import('../views/Membres.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('../views/Profile.vue'),
		meta: { requiresAuth: true }
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

/* vérifions si l'user est connecté en appelant le state.user (depuis le store) sinon on redirige vers /login */
router.beforeEach((to, from, next) => {
	const isLogged = store.state.isLogged
	if ((to.name !== 'Login' && !isLogged) && (to.name !== 'Signup' && !isLogged)) next({ name: 'Login' })
	else next()
})

export default router