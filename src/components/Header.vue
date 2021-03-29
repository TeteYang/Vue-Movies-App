<template>
  <header class="header">
    <div>
      <b-navbar class="navbar" type="dark" variant="dark">
        <b-container>
          <b-navbar-brand href="#">MovieDB</b-navbar-brand>
          <b-nav-form>
            <b-form-input
            class="mr-sm-2 search-input"
            placeholder="Search"
            v-model="serchValue"
            debounce="500"
            >
            </b-form-input>
          </b-nav-form>
        </b-container>
      </b-navbar>
</div>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Header",
  data: () => ({
    serchValue: '',
  }),
  watch: {
    serchValue: 'onSearchValueChange',
  },
  methods: {
    ...mapActions("movies", ["searchMovie", "fetchMovies", "toggleSearchState"]),
    onSearchValueChange(value) {
      if(value) {
        this.searchMovie(value);
        this.toggleSearchState(true);
      } else {
        this.fetchMovies();
        this.toggleSearchState(false);
      }
    }
  }
}
</script>

<style scoped>
  .header {
    margin-bottom: 30px;
  }
  .navbar {
    background-color: rgba(0, 0, 0, 0.7) !important;
  }
  .search-input {
    color: white;
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.6);
  }
  .search-input:focus {
    box-shadow: none;
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(0, 0, 0, 0.6);
    color: white;
  }
</style>
