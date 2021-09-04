
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
    path: '/conCliente',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cliente/conCliente.vue') }
    ]
  },
  {
    path: '/cadastro-cliente',
    component: () => import('layouts/ExtLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cliente/cadClienteExt.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayoutSimple.vue'),
    children: [
      { path: '', component: () => import('pages/login/login.vue') }
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
