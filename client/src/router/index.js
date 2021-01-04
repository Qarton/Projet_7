import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Meme from '../components/Meme.vue'
import CreateMeme from '../components/CreateMeme.vue'
import MemeDetail from '../components/MemeDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/meme',
    name: 'meme',
    component: Meme
  },
  {
    path: '/meme/create',
    name: 'meme-create',
    component: CreateMeme
  },
  {
    path: '/meme/:memeId',
    name: 'meme-detail',
    component: MemeDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
