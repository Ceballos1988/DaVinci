<!-- src/views/HomePage.vue -->
<template>
  <div>
    <LandingPage />
    <PeliculasPage />
  </div>
</template>

<script>
import LandingPage from '@/components/LandingPage.vue'; 
import PeliculasPage from '@/views/PeliculasPage.vue';

export default {
  name: 'HomePage',
  components: {
    LandingPage,
    PeliculasPage
  }
};
</script>

<style>
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
