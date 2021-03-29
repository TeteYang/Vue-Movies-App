import axios from "@/plugins/axios";
import IDs from "@/store/mock/imdb_top250";
import mutations from "@/store/mutations";

function serializedMovie(movie) {
  console.log(movie);
  return movie.reduce((acc, film) => {
    acc[film.imdbID] = film;
    return acc;
  }, {});
}

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE, ISSEARCH } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
    isSearch: false,
  },
  getters: {
    moviesList: ({movies}) => movies,
    slicedIDs: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesLength:({ top250IDs }) => Object.keys(top250IDs).length,
    isSearch: ({isSearch}) => isSearch,
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [REMOVE_MOVIE](state, index) {
      state.top250IDs.splice(index, 1);
    },
    [ISSEARCH](state, bool) {
      state.isSearch = bool;
    },
  },
  actions: {
    // initMoviesStore: {
    //   handler({ dispatch }) {
    //     dispatch("fetchMovies")
    //   },
    //   root: true,
    // },
    async fetchMovies({ getters, commit, dispatch }) {
      try {
      dispatch("toggleLoader", true, {root: true}); //вызов прелодера
      const { currentPage, moviesPerPage, slicedIDs } = getters;
      const from = currentPage * moviesPerPage - moviesPerPage;
      const to = currentPage * moviesPerPage;
      const moviesToFetch = slicedIDs(from, to);
      const request = moviesToFetch.map(id => axios.get(`/?i=${id}`));
      console.log(request);
      const responses = await Promise.all(request);
      console.log(responses);
      const movies = serializedMovie(responses);
      commit(MOVIES, movies);
      } catch(err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, {root: true});
      }
    },
    changeCurrentPage({commit, dispatch}, page) {
      commit(CURRENT_PAGE, page);
      dispatch("fetchMovies");
    },
    removeMovie({commit, dispatch, state}, id) {
      const index = state.top250IDs.findIndex(item => item == id);
      if(index !== -1) {
        commit(REMOVE_MOVIE, index);
        dispatch("fetchMovies");
      }
    },
    async searchMovie({commit, dispatch}, query) {
      try {
        dispatch("toggleLoader", true, {root: true});
        const response = await axios.get(`?s=${query}`);
        if(response.Error) {
          throw Error(response.Error);
        }
        const movies = serializedMovie(response.Search);
        commit(MOVIES, movies);
      } catch(err) {
        console.log(err.message);
        dispatch("shownotyfy", {
          msg: err.message,
          title: "Error",
          variant: "danger"
        }, {root: true});
      } finally {
        dispatch("toggleLoader", false, {root: true});
      } //остановка прелодера
    },
    toggleSearchState({commit}, bool) {
      commit(ISSEARCH, bool);
    }
  }
};

export default moviesStore;
