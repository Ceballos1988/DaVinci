<template>
  <div id="app">
    <HeaderPage />
    <router-view></router-view>
    <FooterPage />
    <button id="btnSubir" class="btn btn-primary d-block" @click="subirArriba">
      <span class="material-icons-outlined">keyboard_arrow_up</span>
    </button>
    <div class="background"></div>
  </div>
</template>

<script>
import HeaderPage from './components/HeaderPage.vue';
import FooterPage from './components/FooterPage.vue';

export default {
  name: 'App',
  components: {
    HeaderPage,
    FooterPage
  },
  methods: {
    subirArriba() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<style>


</style>
