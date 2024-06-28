// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue'; 
import PeliculasPage from './views/PeliculasPage.vue';
import LandingPage from './components/LandingPage.vue'; 
import MovieDetailsPage from './views/MovieDetailsPage.vue';
import GuardadosPage from './views/GuardadosPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/peliculas',
    name: 'PeliculasPage',
    component: PeliculasPage,
  },
  {
    path: '/landing',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path:'/movie/:id',
    name: 'MovieDetailsPage',
    component: MovieDetailsPage
  },
  {
    path: '/guardados', // Ruta para GuardadosPage.vue
    name: 'GuardadosPage',
    component: GuardadosPage
  }
  // Puedes agregar más rutas aquí
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
