<template>
  <b-container>
    <!-- {{list}} -->
    <h3 class="list-title pb-3"> {{ listTitle }}</h3>
    <b-row>
      <template v-if="isNotFull">
        <b-col cols="3"
        v-for="(movie, key) in list" :key="key">
        <MovieItem :movie="movie"
        @mouseover.native="onMouseOver(movie.Poster)"
        @removeItem="onRemoveItem"
        @showModal="onShowMovieInfo"
        />
        </b-col>
      </template>
      <template v-else>
        <div>Empty list</div>
      </template>
    </b-row>
      <b-modal id="modal-1">
        <MovieInfoModal :infoModal="selectedMovie"/>
      </b-modal>
  </b-container>
</template>

<script>
import MovieItem from "./MovieItem";
import MovieInfoModal from "./MovieInfoModal";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      default: () => ({}),
    }
  },
  data: () => ({
    boxTwo: '',
    selectedMovieId: {},
  }),
  components: {
    MovieItem,
    MovieInfoModal,
  },
  computed: {
    ...mapGetters("movies", ["isSearch"]),
    isNotFull() {
      return Boolean(Object.keys(this.list).length)
    },
    listTitle() {
      return this.isSearch ? "Search result" : "IMDB Top 250"
    },
    selectedMovie() {
      return this.selectedMovieId ? this.list[this.selectedMovieId] : null
    }
  },
  methods: {
    ...mapActions("movies", ["removeMovie"]),
    ...mapActions(["shownotyfy"]),
    onMouseOver(poster) {
      this.$emit('changePoster', poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed =
      await this.$bvModal.msgBoxConfirm(`Please confirm that you want to delete ${title}`, {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        });
      if(isConfirmed) {
        this.removeMovie(id);
        this.shownotyfy({
          msg: "Movie delited succesful",
          variant: "success",
          title: "Success"
        });
      }
    },
    onShowMovieInfo(id) {
      this.selectedMovieId = id;
      this.$bvModal.show("modal-1");
    }
  }
}
</script>

<style scoped>
  .modal-header {
    background-color: #AB47BC;
    color: white;
  }
</style>
