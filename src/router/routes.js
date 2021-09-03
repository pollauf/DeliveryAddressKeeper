
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/cadUsuario',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/usuario/cadUsuario.vue') }
    ]
  },
  {
    path: '/conUsuario',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/usuario/conUsuario.vue') }
    ]
  },
  {
    path: '/cadCliente',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cliente/cadCliente.vue') }
    ]
  },
  {
    path: '/cadastro',
    component: () => import('layouts/ExtLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cliente/cadClienteExt.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
