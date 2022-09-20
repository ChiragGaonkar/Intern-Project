
const routes = [
  {
    path: '/',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('components/Login.vue'),
        meta: {
          checkRedirect: true
        }
      },
      {
        path: '/login',
        name:'login',
        component: () => import('components/Login.vue')
      }
    ]
  },
  {
    path: '/theHub',
    component: () => import('layouts/AppLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'landingPage',
        component: () => import('components/LandingPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/nucleus',
        name: 'viewCommunicationDashboard',
        meta: {
          requiresAuth: true
        },
        component: () => import('src/nucleus/ViewCommunicationDashboard.vue')
      },
      {
        path: '/view/:CommunicationId',
        name: 'viewIn',
        meta: {
          requiresAuth: true
        },
        component: () => import('components/ViewIn.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  })
}

export default routes
