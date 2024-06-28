<template>
  <section id="Peliculas">
    <div class="container text-center">
      <div class="seccion-buscador">
        <h2 class="text-center">Películas</h2>
        <div class="row mb-3 justify-content-center container-filtros">
          <div class="col-md-3">
            <label for="orden" class="barra-1">Orden:</label>
            <select
              v-model="orden"
              id="orden"
              class="form-select"
              @change="cargarPeliculas"
            >
              <option value="popularity.desc">Más Popular</option>
              <option value="popularity.asc">Menos Popular</option>
              <option value="release_date.desc">
                Lanzamiento (Más reciente)
              </option>
              <option value="release_date.asc">
                Lanzamiento (Más antigua)
              </option>
              <option value="title.asc">Título (A-Z)</option>
              <option value="title.desc">Título (Z-A)</option>
              <option value="vote_average.desc">
                Valoración (Mejor a Peor)
              </option>
              <option value="vote_average.asc">
                Valoración (Peor a Mejor)
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="busqueda" class="barra-1">Buscar:</label>
            <input
              v-model="busqueda"
              type="text"
              id="busqueda"
              class="form-control"
              placeholder="Buscar películas"
              @input="cargarPeliculas"
            />
          </div>
        </div>
      </div>
      <!-- Contenedor de películas -->
      <div id="movies-container" class="row">
        <div v-if="loading" class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <div v-else-if="error" class="alert alert-danger" role="alert">
          Ha ocurrido un error al cargar las películas. Por favor, inténtalo de
          nuevo más tarde.
        </div>
        <div v-else class="peliculas-contenedor">
          <!-- Iteración sobre las películas -->
          <div
            v-for="movie in movies"
            :key="movie.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <div class="card">
              <template v-if="movie.poster_path">
                <img
                  :src="getImagen(movie.poster_path)"
                  class="card-img-top"
                  :alt="movie.title"
                />
              </template>
              <template v-else>
                <div class="card-img-top no-poster-image">
                  <div class="no-poster-message">
                    Disculpe las molestias, no contamos con la portada de esa
                    película.
                  </div>
                </div>
              </template>
              <div class="card-body">
                <h5 class="card-title text-center">{{ movie.title }}</h5>
                <p class="card-text text-center">
                  Lanzamiento: {{ formatDate(movie.release_date) }}
                </p>
                <p class="card-text text-center">
                  Puntuación: {{ movie.vote_average }}
                </p>

                <!-- Componente StarRating para la calificación -->
                <star-rating
                  :movie-id="movie.id"
                  :initial-rating="getRating(movie.id)"
                  @rating-updated="setRating(movie.id, $event)"
                ></star-rating>

                <div class="contenedor-botones-pelicula">
                  <button class="btn btn-ver-mas" @click="verDetalle(movie.id)">
                    Ver +
                  </button>
                  <a
                    class="link-guardar"
                    title="Guardar"
                    @click="guardarPelicula(movie.id)"
                  >
                    <img
                      src="@/assets/icons/guardar.png"
                      alt="Guardar película"
                      class="icono-guardar"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- Botón Cargar más películas al final del contenedor -->
          <div
            v-if="!loading && !error && movies.length > 0"
            class="text-center mb-5"
          >
            <button
              class="btn btn-cargar-mas"
              @click.prevent="cargarMasPeliculas"
            >
              Cargar +
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import StarRating from "@/components/StarRating.vue";

export default {
  name: "PeliculasPage",
  components: {
    StarRating,
  },
  data() {
    return {
      movies: [],
      orden: "popularity.desc",
      busqueda: "",
      loading: false,
      error: null,
      page: 1,
    };
  },
  mounted() {
    this.cargarPeliculas();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    getImagen(posterPath) {
      return posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : "no-image-available.jpg";
    },
    async cargarPeliculas() {
      this.loading = true;
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=e91c47009a810141f2bf0020105973d8&language=es-AR&sort_by=${this.orden}&include_adult=false&include_video=false&page=1&with_genres=27,53,9648`;

        if (this.busqueda !== "") {
          url = `https://api.themoviedb.org/3/search/movie?api_key=e91c47009a810141f2bf0020105973d8&language=es-AR&query=${this.busqueda}&page=1`;
        }

        const response = await this.$axios.get(url);
        this.movies = response.data.results;
        this.loading = false;
        this.page = 1; // Reiniciar la página al cargar nuevas películas
      } catch (error) {
        console.error("Error al cargar películas:", error);
        this.error =
          "Ha ocurrido un error al cargar las películas. Por favor, inténtalo de nuevo más tarde.";
        this.loading = false;
      }
    },

    async cargarMasPeliculas() {
  // Guarda la posición de desplazamiento horizontal del contenedor
  const scrollContainer = document.getElementById('movies-container');
  const scrollPosition = scrollContainer.scrollLeft;

  this.loading = true;
  try {
    this.page++; // Incrementar la página para cargar más películas
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=e91c47009a810141f2bf0020105973d8&language=es-AR&sort_by=${this.orden}&include_adult=false&include_video=false&page=${this.page}&with_genres=27,53,9648`;

    if (this.busqueda !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=e91c47009a810141f2bf0020105973d8&language=es-AR&query=${this.busqueda}&page=${this.page}`;
    }

    const response = await this.$axios.get(url);
    // Concatenar las nuevas películas al final del array existente
    this.movies = [...this.movies, ...response.data.results];
    this.loading = false;

    // Restaurar la posición de desplazamiento horizontal
    this.$nextTick(() => {
      scrollContainer.scrollLeft = scrollPosition;
    });
  } catch (error) {
    console.error("Error al cargar más películas:", error);
    this.loading = false;
  }
},




    async guardarPelicula(movieId) {
      try {
        const response = await this.$axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=e91c47009a810141f2bf0020105973d8&language=es-AR`
        );
        const movie = response.data;
        const peliculasGuardadas =
          JSON.parse(localStorage.getItem("peliculasGuardadas")) || [];
        const peliculaExistente = peliculasGuardadas.find(
          (pelicula) => pelicula.id === movie.id
        );

        if (!peliculaExistente) {
          peliculasGuardadas.push(movie);
          localStorage.setItem(
            "peliculasGuardadas",
            JSON.stringify(peliculasGuardadas)
          );
          alert(`La película "${movie.title}" ha sido guardada exitosamente.`);
        } else {
          alert(`La película "${movie.title}" ya está guardada.`);
        }
      } catch (error) {
        console.error("Error al guardar película:", error);
        alert(
          "No se pudo guardar la película. Por favor, inténtalo de nuevo más tarde."
        );
      }
    },

    // Método para obtener la calificación almacenada en localStorage
    getRating(movieId) {
      const storedRatings =
        JSON.parse(localStorage.getItem("peliculasRatings")) || {};
      return storedRatings[movieId] || 0;
    },
    // Método para establecer la valoración y guardarla en localStorage
    setRating(movieId, rating) {
      let storedRatings =
        JSON.parse(localStorage.getItem("peliculasRatings")) || {};
      storedRatings = { ...storedRatings, [movieId]: rating };
      localStorage.setItem("peliculasRatings", JSON.stringify(storedRatings));
    },
    verDetalle(movieId) {
      this.$router.push({ name: "MovieDetailsPage", params: { id: movieId } });
    },
  },
};
</script>

<style scoped>
#Peliculas {
  padding: 25px 0;
}

.seccion-buscador {
  position: relative;
  overflow: hidden;
  padding-bottom: 50px;
}

.seccion-buscador::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/imagenes/tela-araña-01.png");
  -webkit-mask-image: linear-gradient(
    rgba(0, 0, 0, 0),
    white,
    rgba(0, 0, 0, 0)
  );
  mask-image: linear-gradient(rgba(0, 0, 0, 0), white, rgba(0, 0, 0, 0));
  background-size: cover;
  background-position: right top;
  z-index: -1;
}

#Peliculas label {
  color: #fff;
  font-family: "Lato", sans-serif;
}

#Peliculas h2 {
  font-family: "Space Grotesk", sans-serif;
  font-size: 2.5rem;
  color: #ff0000;
  text-align: center;
  margin-bottom: 30px;
}

.peliculas-contenedor {
  display: flex;
 
}

#movies-container {
  display: flex;
  flex-wrap: nowrap; /* Evita que las tarjetas se envuelvan */
  overflow-x: auto; /* Agrega desplazamiento horizontal */
  padding: 20px 0; /* Ajusta el padding superior e inferior */
  scrollbar-width: thin; /* Ancho del scrollbar */
  scrollbar-color: #ff0000 #222; /* Color del scrollbar */
}

#movies-container::-webkit-scrollbar {
  width: 8px; /* Ancho del scrollbar para navegadores WebKit */
}

#movies-container::-webkit-scrollbar-track {
  background: #f9f8f8; /* Color de fondo del track */
}

#movies-container::-webkit-scrollbar-thumb {
  background-color: #ff0000; /* Color del thumb (barra deslizante) */
  border-radius: 4px; /* Borde redondeado */
  border: 2px solid #f9f8f8; /* Borde del thumb */
}

#movies-container .card {
  flex: 1 0 100%; /* Ajustar el tamaño de las tarjetas */
  max-width: 100%;
  margin: 10px; /* Añadir espacio entre las tarjetas */
}

.card:last-child {
  margin-right: 0; /* Elimina el margen derecho de la última tarjeta */
}

#movies-container .card:hover {
  box-shadow: 0 4px 25px rgba(216, 5, 5, 0.769);
}

#movies-container .card-img-top {
  width: 100%;
  height: 400px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  object-fit: cover;
}

#movies-container .card-body {
  padding: 10px;
  background-image: radial-gradient(
    circle farthest-corner at 32.7% 82.7%,
    rgb(27, 1, 6) 8.3%,
    rgb(1, 9, 19) 79.4%
  );
  max-width: 100%;
}

#movies-container .card-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #ff0000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#movies-container .card-text {
  font-size: 1rem;
  margin-bottom: 10px;
  color: white;
}

.contenedor-botones-pelicula {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-ver-mas {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.link-guardar {
  display: inline-block;
}

.icono-guardar {
  width: 25px;
  height: 25px;
}

.btn-cargar-mas {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 550px;
  width: 150px;
}

.btn-cargar-mas:hover {
  background-color: #f9f8f8;
  color: #d40505; /* Color de fondo al pasar el mouse */
}
.btn-ver-mas:hover {
  background-color: #f9f8f8;
  color: #d40505; /* Color de fondo al pasar el mouse */
}
.no-poster-image {
  background-color: #000;
  color: #d40505;
  height: 400px;
  display: flex;
  font-family: "Space Grotesk", sans-serif;

  justify-content: center;
  align-items: center;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.no-poster-message {
  padding: 10px;
  font-size: 1rem;
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
  background-image: url("@/assets/imagenes/arriba.png");
  background-size: cover;
  background-position: center;
  filter: drop-shadow(5px 5px 10px red);
}

#btnSubir span {
  visibility: hidden;

}

@media (min-width: 577px) and (max-width: 1400px) {

 


}

@media (max-width: 576px) {
  #movies-container .card {
    flex: 1 0 80%; /* Las tarjetas ocuparán todo el ancho en dispositivos muy pequeños */
    max-width: 80%;
    height: 380px;
    
  }
  #movies-container  {
   height: 650px;

  }
  #btnSubir span {
  visibility: hidden;
 
}

}
</style>
