<template>
  <div>
    <button @click="update">Update</button>
    <router-link to="books" :disabled="$store.state.books.length === 0">Skip</router-link>

    <p>
      library progress: {{$store.state.progressLibrary}}
      <Progress :progress="$store.state.progressLibrary"></Progress>
    </p>

    <div v-for="(progress, author) in $store.state.progressAuthors">

      {{author}}: {{progress}}
      <Progress :progress="progress"></Progress>
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
