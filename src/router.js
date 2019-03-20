import Vue from 'vue'
import Router from 'vue-router'
import Clients from '@/components/admin/Clients'
import Events from '@/components/admin/Events'
import Albums from '@/components/admin/Albums'
import AlbumNew from '@/components/admin/AlbumNew'
import AlbumShow from '@/components/admin/AlbumShow'

import ClientAlbums from '@/components/Albums'
import ClientAlbumShow from '@/components/AlbumShow'

import PhotosEvent from '@/components/Events'

import Signin from '@/components/auth/Signin'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      path: '*',
      redirect: '/signin'
    },
    {
      path: '/',
      redirect: '/signin',
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/photos',
      component: PhotosEvent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/client/:client_id/events/:event_id/albums',
      component: ClientAlbums
    },
    {
      path: '/client/:client_id/events/:event_id/albums/:album_id',
      component: ClientAlbumShow
    },
    {
      path: '/admin',
      component: {
        render: h => h('router-view')
      },
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'clients',
          component: Clients
        },
        {
          path: 'client/:client_id/events',
          component: Events
        },
        {
          path: 'client/:client_id/events/:event_id/albums',
          component: Albums
        },
        {
          path: 'client/:client_id/events/:event_id/albums/new',
          component: AlbumNew
        },
        {
          path: 'client/:client_id/events/:event_id/albums/:album_id',
          component: AlbumShow
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  console.log(requiresAuth, localStorage.getItem('logged'));
  if (requiresAuth && !localStorage.getItem('logged')) {
    next('/signin')
  } else if (requiresAuth && localStorage.getItem('logged')) {
    next()
  } else {
    next()
  }
})

export default router
