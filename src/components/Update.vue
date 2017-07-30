<template>
  <div>
    <button @click="update">Update</button>
    <router-link to="books" :disabled="$store.state.books.length === 0">Skip</router-link>

    <p>
      library progress: {{$store.state.progressLibrary}}
    </p>
    <p v-for="(progress, author) in $store.state.progressAuthors">{{author}}: {{progress}}</p>

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
