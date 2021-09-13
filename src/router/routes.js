
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/cadastro-usuario',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/usuario/cadUsuario.vue') }
    ]
  },
  {
    path: '/consulta-usuarios',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/usuario/conUsuario.vue') }
    ]
  },
  {
    path: '/cadastro-cliente',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cliente/cadCliente.vue') }
    ]
  },
  {
    path: '/consulta-clientes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cliente/conCliente.vue') }
    ]
  },
  {
    path: '/:phone/consulta-clientes-ext',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/:tenantuser/cad-cliente',
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
