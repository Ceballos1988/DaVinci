<template>
  <header id="header">
    <img src="@/assets/imagenes/cementerio.png" alt="" id="background-img">
    <div class="container-1">
      <div class="row align-items-center">
        <div class="col-lg-3 order-1 row">
          <div class="logo">
            <img src="@/assets/imagenes/logo-blanco.png" class="d-none d-lg-block" width="90%" alt="Logo Grande">
            <img src="@/assets/imagenes/logo-blanco-celular.png" class="d-lg-none" alt="Logo Pequeño">
          </div>
        </div>
        <div class="col-lg-9 order-2">
          <nav class="navbar navbar-expand-lg navbar-light">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link class="nav-link icon-link" to="/guardados">
                    <img src="@/assets/icons/guardar.png" class="icon" alt="Icono Guardados">
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link text-white" to="/">Inicio</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link text-white" to="/">Películas</router-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { RouterLink } from 'vue-router'; // Importa el componente RouterLink

export default {
  name: 'HeaderPage',
  components: {
    RouterLink, // Registra el componente RouterLink en tu componente Header.vue
  },
};
</script>

<style>

.logo {
    width: 500px;
  }
  
  /* Imagen de la luna */
  #background-img {
    position: absolute;
    border-radius: 10px;
    right: 0;
    top: 0;
    width: 30vw; /* Ajusta el ancho según necesites */
  }
  
  /* Fondo */
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle farthest-corner at 32.7% 82.7%, rgb(27, 1, 6) 8.3%, rgb(1, 9, 19) 79.4%);
    z-index: -2;
  }
  
  /* Encabezado */
  header {
    padding-top: 30px;
    padding-bottom: 50px;
  }
  
  header .row {
    justify-content: end;
  }
  
  header .container-1 {
    margin: 0 auto;
    max-width: 1300px;
    padding-bottom: 50px;
  }
  
  header h1 {
    color: #ffffff;
  }
  
  /* Estilos para la barra de navegación */
  nav ul {
    display: flex;
    list-style: none;
    padding: 0;
  }
  
  nav ul li {
    margin-right: 10px;
    margin-left: 10px;
  }
  
  nav ul li a {
    color: #ffffff !important;
    text-decoration: none;
    font-family: "Bangers", system-ui;
    font-style: normal;
    font-size: 1.8rem !important;
  }
  
  ::placeholder {
    font-family: "Bangers", system-ui;
  }
  
  nav ul li a:hover {
    color: #ff0000 !important;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
  
  /* Ajuste de la posición del botón de hamburguesa */
  .navbar-toggler {
    border: none;
    
  }
  
  /* Ajuste de la posición de los elementos del menú */
  .navbar-nav {
    justify-content: flex-end;
  }
  
  .dropdown-menu {
    background-color: #4b0418 !important;
    border: 50px !important;
  }
  
  .dropdown-menu a {
    font-size: 1.2rem !important;
    text-align: left;
  }
  
  .dropdown-menu {
    --bs-dropdown-link-hover-bg: none !important;
  }
  
  /* Iconos en la barra de navegación */
  .navbar-nav .icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    vertical-align: middle;
  }
  
  .nav-item .icon-link {
    display: inline-block;
  }
  
  .nav-item .icon {
    transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  }
  
  .nav-item .icon-link:hover .icon {
    transform: scale(1.1); /* Aumenta ligeramente el tamaño del icono */
    filter: drop-shadow(2px 2px 2px #ff0000);
  }
  
 
  /* Estilos para pantallas medianas*/
@media (min-width: 577px) and (max-width: 1000px){
    
        
      .logo{
      width: 100vw;
      justify-content: center;
      align-items: center;
      display: flex;
      padding-top: 30px;
      padding-bottom: 50px;
      }   
      /*imagen de la luna*/
      #background-img {
        display: flex;
        width: 40vh; 
      }
          
      header{
      padding-top: 5px;
      }
      
      .navbar-toggler {
     
      background-color: white !important;
      }     
      nav ul li a {
      font-size: 1rem !important;
      }
      
      .navbar{
      display: flex;
      align-items: center !important;  
      justify-content: center !important;
      margin-top: 15px;
      margin-left: 15px;
  
      }
      
      .navbar-nav{
        display: flex;
        align-items: center !important;  
      justify-content: center !important;
      margin-top: 15px;
      
  
      }
      .navbar-toggler:hover{
        box-shadow: 0 4px 35px rgba(216, 5, 5, 0.769);
      }
      .navbar-toggler-icon {
      width: 1em !important;
      height: 1em!important;
      display: flex;
        align-items: center !important;  
      justify-content: center !important;
      
      }
      .navbar-toggler:focus {
        text-decoration: none;
        outline: 0;
        box-shadow: 0 0 0 var(--bs-navbar-toggler-focus-width)!important;
        box-shadow: 0 4px 35px rgba(216, 5, 5, 0.769);
  
    }
    
   
  }
  
  
  

  
  @media (max-width: 576px){
  .logo{
    width: 100vw;
    justify-content: center;
    align-items: center;
    display: flex;
    padding-top: 30px;
    padding-bottom: 50px;
    
    }
  
  /*imagen de la luna*/
  #background-img {
    display: flex;
    width: 40vh; 
  }
  
  
  header{
    padding-top: 5px;
    }
    
    .navbar-toggler {
   
    background-color: white !important;
    }
    
    nav ul li a {
    font-size: 1rem !important;
    }
    
    .navbar{
    display: flex;
    align-items: center !important;  
    justify-content: center !important;
    margin-top: 15px;
    margin-left: 15px;
  
    }
    
    .navbar-nav{
      display: flex;
      align-items: center !important;  
    justify-content: center !important;
    margin-top: 15px;
    
  
    }
    .navbar-toggler:hover{
      box-shadow: 0 4px 35px rgba(216, 5, 5, 0.769);
    }
    .navbar-toggler-icon {
    width: 1em !important;
    height: 1em!important;
    display: flex;
      align-items: center !important;  
    justify-content: center !important;
    
    }
    .navbar-toggler:focus {
      text-decoration: none;
      outline: 0;
      box-shadow: 0 0 0 var(--bs-navbar-toggler-focus-width)!important;
      box-shadow: 0 4px 35px rgba(216, 5, 5, 0.769);
      
  }
  }
  
  #btnSubir {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    width: 80px;
    height: 100px;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    background: none;
    background-image: url('@/assets/imagenes/arriba.png');
    background-size: cover;
    background-position: center;
    filter: drop-shadow(5px 5px 10px red);
  }
  
  #btnSubir span {
    visibility: hidden;
  }
</style>
