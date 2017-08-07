<template>
  <div>
    <button @click="update">Update</button>
    <router-link to="books" :disabled="$store.state.books.length === 0">Skip</router-link>

    <div v-if="$store.state.books.length > 0">
      {{$store.state.books.length}} books in cache<br>
      <button @click="clearCache">Clear cache</button>
    </div>


    <p>
      library progress: {{$store.state.progressLibrary}}
      <Progress :progress="$store.state.progressLibrary"></Progress>
    </p>

    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2" v-for="author in authors">
          <b>{{author.name}}</b>
          <Progress :progress="author.progress"></Progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {clear, save} from '../api/cache';

  export default {
    computed: {
      authors() {
        return Object.entries(this.$store.state.progressAuthors)
          .map(([name, progress]) => ({name, progress}))
          .sort((a, b) => a.name.localeCompare(b.name));
      }
    },

    methods: {
      async update() {
        await this.$store.dispatch('update');
        this.$store.dispatch('getBooks');
        this.$router.push('/books');
      },

      clearCache() {
        clear();
        save();
        this.$store.dispatch('getBooks');
      }
    }
  }
</script>

<style lang="scss">
  @import '@material/layout-grid/mdc-layout-grid';
</style>
