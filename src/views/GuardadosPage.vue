<template>
  <div>
    <section class="d-flex flex-column justify-content-center flex-wrap align-items-center">
      <h2 class="text-center">Tus películas guardadas</h2>

      <div id="movies-container-guardado">
        <div v-if="peliculasGuardadas.length === 0" class="text-center">
          <p>No hay películas guardadas.</p>
        </div>

        <div v-else v-for="(movie, index) in peliculasGuardadas" :key="movie.id">
          <div class="card mb-3">
            <img :src="getImageUrl(movie.poster_path)" class="card-img-top" :alt="movie.title">
            <div class="card-body">
              <h5 class="card-title text-center">{{ movie.title }}</h5>
              <p class="card-text text-center">Lanzamiento: {{ formatDate(movie.release_date) }}</p>
              <p class="card-text text-center">Puntuación: {{ movie.vote_average }}</p>
              <div class="d-flex flex-column align-items-center">
                <button class="btn btn-ver-mas mt-4" @click="verDetalle(movie.id)">Ver detalle</button>
                <button class="btn btn-eliminar mt-2" @click="eliminarPelicula(index)">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <button id="btnSubir" class="btn btn-primary d-block" @click="subirArriba">
      <span class="material-icons-outlined">keyboard_arrow_up</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'GuardadosPage',
  data() {
    return {
      peliculasGuardadas: []
    };
  },
  mounted() {
    this.cargarPeliculasGuardadas();
  },
  methods: {
    cargarPeliculasGuardadas() {
      const peliculasGuardadas = JSON.parse(localStorage.getItem('peliculasGuardadas')) || [];
      this.peliculasGuardadas = peliculasGuardadas;
    },
    eliminarPelicula(index) {
      this.peliculasGuardadas.splice(index, 1);
      localStorage.setItem('peliculasGuardadas', JSON.stringify(this.peliculasGuardadas));
    },
    verDetalle(movieId) {
      // Redirige a la página de detalles con el ID de la película
      this.$router.push({ name: 'MovieDetailsPage', params: { id: movieId } });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    getImageUrl(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'no-image-available.jpg';
    },
    subirArriba() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
#btnSubir {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 50px;
  text-align: center;
  color: #ff0000;
  text-shadow: 1px 1px 25px rgba(227, 17, 17, 0.908);
}

#movies-container-guardado {
  max-width: 1500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 10px;
}

#movies-container-guardado .card {
  color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  width: 300px;
  flex: 0 0 auto;
  margin-bottom: 20px;
  border: #222;
}

#movies-container-guardado .card:hover {
  box-shadow: 0 4px 35px rgba(216, 5, 5, 0.769);
}

#movies-container-guardado .card-img-top {
  width: 100%;
  height: 400px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  object-fit: cover;
}

#movies-container-guardado .card-body {
  max-width: 100%;
  background-image: radial-gradient(circle farthest-corner at 32.7% 82.7%, rgb(27, 1, 6) 8.3%, rgb(1, 9, 19) 79.4%) !important;
  padding: 10px;
}

#movies-container-guardado .card-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #ff0000;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#movies-container-guardado .card-text {
  font-size: 1rem;
  margin-bottom: 10px;
  text-align: center;
}

.btn-ver-mas,
.btn-eliminar {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-ver-mas:hover,
.btn-eliminar:hover {
  background-color: #f9f8f8;
  color: #d40505; /* Color de fondo al pasar el mouse */
}

.text-center {
  text-align: center;
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
