import Vue from 'vue'
import VueRouter from 'vue-router'
import UserActivity from '../components/UserActivity.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Meme from '../components/Meme.vue'
import CreateMeme from '../components/CreateMeme.vue'
import MemeDetail from '../components/MemeDetail.vue'
import MemeEdit from '../components/MemeEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/history/:userId',
    name: 'history',
    component: UserActivity
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
  },
  {
    path: '/meme/:memeId/edit',
    name: 'meme-edit',
    component: MemeEdit
  },
  {
    path: '*',
    redirect: 'meme'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
