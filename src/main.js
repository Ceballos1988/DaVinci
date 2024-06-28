// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de tener configurado tu router si es necesario
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

// Configuración global de Axios
axios.defaults.baseURL = 'https://api.themoviedb.org/3'; // URL base de la API TMDB o tu API

const app = createApp(App);

// Configurar Axios para ser accesible globalmente
app.config.globalProperties.$axios = axios;

app.use(router).mount('#app');
