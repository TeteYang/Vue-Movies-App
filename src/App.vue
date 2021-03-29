<template>
  <div id="app">
    <Loader />
    <PosterPG :poster="posterBG"/>
    <Header />
    <Notification />
    <MoviesList :list="moviesList" @changePoster="onchangePoster"/>
    <MoviesPagination
      :per-page="moviesPerPage"
      :current-page="currentPage"
      :total="moviesLength"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "@/components/MoviesList.vue";
import PosterPG from "@/components/PosterPG.vue";
import MoviesPagination from "@/components/MoviesPagination.vue";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Notification from "@/components/Notification";

export default {
  name: "app",
  components: {
    MoviesList,
    PosterPG,
    MoviesPagination,
    Loader,
    Header,
    Notification,
  },
  data: () => ({
    posterBG: '',
  }),
  computed: {
    ...mapGetters("movies", ["moviesList", "currentPage", "moviesPerPage", "moviesLength"])
  },
  methods: {
    ...mapActions("movies", ["changeCurrentPage"]),
    onchangePoster(poster) {
      this.posterBG = poster;
    },
    onPageChanged(page) {
      // console.log(this.$route);
      this.$router.push({query: {page}});
      this.changeCurrentPage(page);
    },
  },
    created() {
      if(this.$route.query.page) {
         this.changeCurrentPage(Number(this.$route.query.page));
      }
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  text-align: center;
  color: white;
  /* padding: 60px 0 0 0; */
}
</style>
