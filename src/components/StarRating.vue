<template>
  <div class="rating">
    <span v-for="(star, index) in stars" :key="index" @click="rate(index + 1)">
      <i :class="starClass(index)" role="button" aria-label="Estrella"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    movieId: {
      type: Number,
      required: true
    },
    initialRating: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      rating: this.initialRating
    };
  },
  computed: {
    stars() {
      return [1, 2, 3, 4, 5]; // Número de estrellas
    }
  },
  methods: {
    rate(score) {
      this.rating = score; // Actualiza la calificación local
      this.$emit('rating-updated', this.rating); // Emite evento de calificación actualizada
    },
    starClass(index) {
      return {
        'bi bi-star-fill': index < this.rating, // Clase para estrella llena si el índice es menor que la calificación
        'bi bi-star': index >= this.rating // Clase para estrella vacía si el índice es mayor o igual que la calificación
      };
    }
  }
};
</script>

<style scoped>
.rating {
  text-align: center;
  margin-top: 20px; /* Ajusta el margen superior según necesites */
}

.rating span {
  margin: 0 5px; /* Ajusta el margen horizontal entre las estrellas */
}

.bi {
  font-size: 24px;
  cursor: pointer;
  color: #ccc; /* Color predeterminado de las estrellas vacías */
}

.bi.bi-star-fill {
  color: gold; /* Color de las estrellas llenas */
}

</style>
