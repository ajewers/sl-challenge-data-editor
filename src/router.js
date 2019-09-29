import Vue from 'vue';
import Router from 'vue-router';
import Upload from './views/Upload.vue';
import Editor from './views/Editor.vue';
import Json from './views/Json.vue';
import About from './views/About.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/json',
      name: 'json',
      component: Json
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/',
      redirect: '/about'
    }
  ]
});

export default router;
