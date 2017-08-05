<template>
  <div>
    <button @click="update">Update</button>
    <router-link to="books" :disabled="$store.state.books.length === 0">Skip</router-link>

    <p>
      library progress: {{$store.state.progressLibrary}}
      <Progress :progress="$store.state.progressLibrary"></Progress>
    </p>

    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell" v-for="(progress, author) in $store.state.progressAuthors">
          <b>{{author}}</b>
          <Progress :progress="progress"></Progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      async update() {
        await this.$store.dispatch('update');
        this.$router.push('/books');
      }
    }
  }
</script>

<style lang="scss">
  @import '@material/layout-grid/mdc-layout-grid';
</style>
