<template>
  <div>
    <button @click="update">Update</button>
    <router-link to="books" :disabled="$store.state.books.length === 0">Skip</router-link>

    <p>
      library progress: {{$store.state.progressLibrary}}
    </p>

    <div v-for="(progress, author) in $store.state.progressAuthors">

      {{author}}: {{progress}}
      <div role="progressbar" class="mdc-linear-progress">
        <div class="mdc-linear-progress__buffering-dots"></div>
        <div class="mdc-linear-progress__buffer"></div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    methods: {
      update() {
        this.$store.dispatch('update');
      }
    }
  }
</script>

<style lang="scss">
  @import '@material/linear-progress/mdc-linear-progress';
</style>
