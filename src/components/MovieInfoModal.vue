<template>
<div class="movie-info-wrap">
  <header class="movie-info-header">
    <!-- {{infoModal}} -->
    <div>{{infoModal.Title}}</div>
    <div>{{infoModal.Year}}</div>
    <div>{{infoModal.Released}}</div>
    <div>{{infoModal.Runtime}}</div>
    <div>{{infoModal.Genre}}</div>
    <div>{{infoModal.Writer}}</div>
    <div>{{infoModal.Actors}}</div>
    <div>{{infoModal.Plot}}</div>
    <div>{{infoModal.Country}}</div>
  </header>
</div>
</template>

<script>
export default {
  name: "MovieInfoModal",
  props: {
    infoModal: {
      type: Object,
      default: () => ({}),
      required: true,
    }
  },
}
</script>

<style scoped>

</style>
