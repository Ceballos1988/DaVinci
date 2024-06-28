<template>
  <div>
    <section class="d-flex flex-column justify-content-center flex-wrap align-items-center">
      <div v-if="movieDetails" id="detalle-pelicula">
        <h2 class="text-center">Detalle de Película</h2>
        <div class="container-detalle">
          <div class="row">
            <div class="col-md-4">
              <img v-if="imageSrc" :src="imageSrc" :alt="imageAlt" class="img-fluid">
              <div v-else class="img-error-container">
                <p class="text-white">Imagen no disponible</p>
              </div>
            </div>
            <div class="col-md-8">
              <h3>{{ movieDetails.title }}</h3>
              <p class="text-white mt-5 text-center"><strong>Año de Lanzamiento:</strong> {{ formattedReleaseDate }}</p>
              <p class="text-white mt-5 text-center"><strong>Puntuación:</strong> {{ movieDetails.vote_average }}</p>
              <p class="text-white mt-5 text-center fs-5">{{ movieDetails.overview }}</p>
              <div v-html="providersHtml"></div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-5">
          <router-link to="/" class="btn-volver-inicio">Ir a sección películas</router-link>
        </div>
      </div>
      <div v-else>
        <div class="container-error">
          <p>No se pudo encontrar la información de la película.</p>
        </div>
      </div>
    </section>
    <button id="btnSubir" class="btn btn-primary d-block" @click="subirArriba">
      <span class="material-icons-outlined">keyboard_arrow_up</span>
    </button>
    <div class="background"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'MovieDetailsPage',
  setup() {
    const route = useRoute();
    const movieId = route.params.id;
    const movieDetails = ref(null);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const fetchMovieDetails = async (id) => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=e91c47009a810141f2bf0020105973d8&language=es-AR&append_to_response=watch/providers`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        movieDetails.value = data;
      } catch (error) {
        console.error("Error al cargar los detalles de la película:", error);
      }
    };

    onMounted(() => {
      if (movieId) {
        fetchMovieDetails(movieId);
      }
    });

    const subirArriba = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
      movieDetails,
      subirArriba,
      formatDate,
      get imageSrc() {
        return movieDetails.value?.poster_path
          ? `https://image.tmdb.org/t/p/w500${movieDetails.value.poster_path}`
          : null;
      },
      get imageAlt() {
        return movieDetails.value?.poster_path
          ? movieDetails.value.title
          : "Disculpe, no poseemos la imagen de la película";
      },
      get formattedReleaseDate() {
        return movieDetails.value ? formatDate(movieDetails.value.release_date) : '';
      },
      get providersHtml() {
  if (!movieDetails.value || !movieDetails.value["watch/providers"]) {
    return `<p class="text-white text-center mt-5"><strong>Dónde ver:</strong></p><p class="text-danger text-center mt-5">No se encontraron opciones de visualización disponibles.</p>`;
  }
  const providers = movieDetails.value["watch/providers"].results?.US?.flatrate || [];
  if (providers.length === 0) {
    return `<p class="text-white text-center mt-5 mb-5"><strong>Dónde ver:</strong></p><p class="text-danger text-center mt-5 mb-5">No se encontraron opciones de visualización disponibles.</p>`;
  }
  let html = `
  <p class="text-white text-center mt-5 mb-5"><strong>Dónde ver:</strong></p>
  <div class="platform-icons-container mt-4 d-flex justify-content-around">
              `;
  providers.forEach(provider => {
    html += `<img src="https://image.tmdb.org/t/p/original${provider.logo_path}" alt="${provider.provider_name}" style="border-radius: 5px;" width=11% title="${provider.provider_name}">`;
  });
  html += `</div>`;
  return html;
}
    };
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

/* Contenedor para los detalles de la película */
.container-detalle {
  max-width: 1200px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 20px;
}

.container-detalle .col-md-4 {
  width: 40%;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 100px;
  text-align: center;
  color: #ff0000;
  text-shadow: 1px 1px 25px rgba(227, 17, 17, 0.908);
}

h3 {
  font-size: 2.5rem;
  margin-bottom: 50px;
  text-align: center;
  color: #ff0000;
  text-shadow: 1px 1px 25px rgba(227, 17, 17, 0.908);
}
.container-detalle .col-md-4 img {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 40px rgba(216, 8, 8, 0.46);
}

.container-detalle .col-md-8 {
  width: 58%;
}

.container-detalle h2 {
  font-size: 3rem;
  margin-bottom: 5px;
  text-align: center;
  color: #ff0000;
  text-shadow: 1px 1px 25px rgba(227, 17, 17, 0.908);
}

.container-detalle p {
  margin-bottom: 5px;
  font-family: "Lato", sans-serif;
  color: black;
  font-size: 1rem;
  padding-top: 5px;
}


.btn-volver-inicio {
  background-color: #ff0000;
  border: none;
  margin-top: 10px;
  font-family: "Lato", sans-serif;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none; /* Elimina el subrayado del texto */
}

.btn-volver-inicio:hover {
  background-color: white;
  color: #ff0000;
}
.img-error-container {
  text-align: center;
  margin-top: 20px;
}

.img-error-container p {
  color: white;
  font-size: 1.5rem;
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

  @media (min-width: 577px) and (max-width: 1000px){
 }

  @media (max-width: 576px){

 /* SECTOR DETALLE  */
      
 .container-detalle {
    flex-direction: column; 
    padding: 10px; 
    justify-content: center;
  }
  
  .container-detalle .col-md-4 {
    width: 80vw!important; 
    margin-bottom: 20px;
    margin: 0 auto 20px;
  }
  
  /* Detalles de la película */
  .container-detalle .col-md-8 {
    width: 100%; 

  }
  
 h2 {
    font-size: 2.5rem; 
    margin-bottom: 10px;
  }

    
 h3 {
    font-size: 1.5rem; 
    margin-bottom: 10px;
  }
  
  
   p {
    font-size: 1rem!important; 
    margin-bottom: 5px!important; 
    margin-top: 10px!important; 
    padding-top: 5px!important; 
  }
  
.btn-volver-inicio {
    margin-top: 20px; 
    font-size: 1rem; 
    display: flex;
    justify-content: center;
    
  }
 
 }

</style>
