<template>
  <section id="Landing" class="d-flex justify-content-center">
  <div class="landing">
    <div class="landing-content">
      <div class="landing-image">
        <img id="fadeImage" src="@/assets/imagenes/Fondo-3.png" alt="Mano">
      </div>
      <div class="landing-text">
        <h1 class="text-white">¡Bienvenidos a TerrorFlix!</h1>
        <p class="text-white">
          El portal definitivo para los amantes del cine de terror y suspenso.<br>
          Te presentamos una plataforma web dedicada exclusivamente a proporcionar información detallada sobre películas de
          <strong style="color: crimson;">terror y suspenso</strong>.<br>
          Desde clásicos del género hasta las últimas producciones, TerrorFlix tiene todo lo que necesitas para sumergirte en el mundo del horror cinematográfico.
        </p>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>

.landing {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  flex-direction: column; /* Alinea los elementos en columna */
  max-width: 1200px;
  padding-top: 50px;
  padding-bottom: 50px;
}

.landing-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: stretch;
}

.landing-image {
  text-align: center;
}

.landing-image img {
  max-width: 150%;
  animation: slideRight 1s ease-in-out;
}

.landing-text {
  opacity: 0;
  animation: slideDown 1s ease-in-out forwards;
}

@keyframes slideRight {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.landing h1 {
  font-family: Nosifer;
  padding-bottom: 40px;
  padding-top: 30px;
  font-size: 1.8rem;
  text-align: center;
}

.landing-text p {
  font-size: 1.2rem;
  font-family: "Lato", sans-serif;
  text-align: center;
  text-shadow: 1px 1px 5px rgba(1, 1, 1, 0.908);
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



  @media (max-width: 576px){








.landing-content {
  position: relative;
  padding-bottom: 110px; /* Establece una posición relativa para poder posicionar absolutamente los elementos internos */
}

.landing-text {
  position: absolute;
  top:0; /* Posiciona el texto en la mitad superior */
  left: 0; /* Lo centra horizontalmente */
  z-index: 1; /* Asegura que el texto esté encima de la imagen */
  width: 100%; /* Ocupa todo el ancho del contenedor */
}

.landing-text h1{
  font-size: 1.5rem!important;
margin-bottom: 50px;
margin-top: -100px;
}
.landing-text p{
padding-top: 60px!important;
font-size: 1rem!important;
padding-left: 10px;
padding-right: 10px;
padding-bottom: 250px;
}
.landing-image {
  position: relative; 
  opacity: 0.5;
  
}

.landing-image img {
  max-width: 100vw; /* Ajusta la imagen al tamaño máximo del contenedor */
  display: block; /* Asegura que la imagen se comporte como bloque */
  margin: auto; /* Centra la imagen horizontalmente */
}

/*seccion descarga*/
h2{
  padding-top: 50px;
  font-size: 1.5rem!important;
}
}


@media (min-width: 577px) and (max-width: 1000px){
  .landing-content {
    position: relative; /* Establece una posición relativa para poder posicionar absolutamente los elementos internos */
}

.landing-text {
    position: absolute;
    top:0; /* Posiciona el texto en la mitad superior */
    left: 0; /* Lo centra horizontalmente */
    z-index: 1; /* Asegura que el texto esté encima de la imagen */
    width: 100%; /* Ocupa todo el ancho del contenedor */
}

.landing-text h1{
  margin-bottom: 50px;
  margin-top: -50px;
}
.landing-text p{
  margin-top: 10px;
}
.landing-image {
    position: relative; 
    opacity: 0.5;
    
}

.landing-image img {
    max-width: 100vw; /* Ajusta la imagen al tamaño máximo del contenedor */
    display: block; /* Asegura que la imagen se comporte como bloque */
    margin: auto; /* Centra la imagen horizontalmente */
}



    h2{
      padding-top: 20px;
      font-size: 1.2rem;
    }
 }

</style>


