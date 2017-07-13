<template>
  <div>
    <h1>Updating!</h1>

    <p v-if="!$store.state.libraryLoaded">Loading library...</p>
    <p v-else>
      Library loaded!<br>
      You have {{$store.state.library.length}} books in your library.
    </p>

    <div>
      <span v-for="(author, name) in $store.state.authors">{{name}}: {{author.progress}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('loadLibrary')
        .then(() => this.$store.dispatch('loadAuthors'));
    }
  }
</script>
