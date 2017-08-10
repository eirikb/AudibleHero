<template>
  <div>
    <div v-if="!$store.state.progress">
      <button @click="update">Update</button>
      <router-link to="books" :disabled="$store.state.progress || $store.state.books.length === 0">Skip</router-link>

      <div v-if="$store.state.books.length > 0">
        {{$store.state.books.length}} books in cache<br>
        <button @click="clearCache">Clear cache</button>
      </div>
    </div>

    <div v-if="$store.state.progress">
      <div v-if="$store.state.progressLibrary < 100">
        <b>Loading library</b>
        <Progress :progress="$store.state.progressLibrary"></Progress>
      </div>
      <div class="mdc-layout-grid" v-else>
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
            <Progress :progress="$store.state.progressAllAuthors"></Progress>
          </div>
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2" v-for="author in authors">
            <b>{{author.name}}</b>
            <Progress :progress="author.progress"></Progress>
          </div>
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

    mounted() {
      this.$store.commit('resetProgress');
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
