<template>
  <div class="movie-item mb-3">
    <div class="movie-item-poster" :style="posterBG">
    <div class="movie-info-wrap">
    <div class="movie-item-info">
      <h3 class="movie-title">{{ movie.Title }}</h3>
      <span class="movie-year"> {{ movie.Year }}</span>
    </div>
    <div class="movie-item-controls row no-gutters">
      <div class="col">
        <b-button @click="emitInfoEvent" size="md" block variant="outline-light">
          Info
        </b-button>
      </div>
      <div class="col">
        <b-button  @click="removeItem" size="md" block variant="outline-danger">
          Remove
          </b-button>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeItem() {
      this.$emit('removeItem', { id: this.movie.imdbID, title: this.movie.Title });
    },
    emitInfoEvent() {
      this.$emit("showModal", this.movie.imdbID);
    }
  },
  computed: {
    posterBG() {
      return {
        'background-image': `url(${this.movie.Poster})`
      }
    }
  }
}
</script>

<style scoped>
  .movie-item {
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.2s ease;
    height: 400px;
    background-size: cover;
    background-position: center;
  }
  .movie-item:hover {
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
  }
  .movie-item-poster {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
  }
  .movie-info-wrap {
    padding: 20px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    opacity: 0;
    transition: all 0.2 ease;
  }
  .movie-item:hover .movie-info-wrap {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .movie-title {
    font-size: 20px;
    color: white;
  }
  .movie-year {
    font-size: 18px;
    color: white;
    text-align: center;
  }
</style>