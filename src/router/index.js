import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Large = () => import('@/views/Large')
const Reference = () => import('@/views/Reference')

const APItest = () => import('@/views/Future/APItest')
const Table = () => import('@/views/Future/Table')



Vue.use(Router)

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/Dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'Dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'Large',
          name: 'Large',
          component: Large
        },

        {
          path: 'Reference',
          name: 'Reference',
          component: Reference
        },

        {
          path: 'Future',
          redirect: '/Future',
          name: 'Future',

          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'APItest',
              name: 'APItest',
              component: APItest
            },

            {
              path: 'Table',
              name: 'Table',
              component: Table
            },




          ]
        },


      ]
    }
  ]
}

export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
