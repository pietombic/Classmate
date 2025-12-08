import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotesView from '../views/NotesView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import EventsView from '../views/EventsView.vue'
import SettingsView from '../views/SettingsView.vue'
import AccountView from '../views/AccountView.vue'
import LoginView from '../views/LoginView.vue'
import SignInView from '../views/SignInView.vue'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/notes',
      name: 'notes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: NotesView
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView
    },
    {
      path: '/signin',
      name: 'signin', //va cambiato in 'login'
      component: SignInView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not Found',
      component: NotFoundView
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (to.name !== 'signin')
  {
    let token = localStorage.getItem('token')
    var codice
    let autenticato = false

    await axios
      .get("http://localhost:3000", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      })
      .catch((err) => {
        codice = err.response.status
      })

      if (codice != 401) {
        autenticato = true
      }
    
      if (!autenticato) {
        return { name: 'signin' }
      }
      
  }
    //ora va, il problema è nel sign in probabilmente
});

export default router
