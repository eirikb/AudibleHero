<template>
  <div>
    Update!

    <div v-if="state === 1">Loading library...</div>
    <div v-else-if="state === 2">Mapping books...</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        state: 0
      }
    },

    created() {
      this.state = 1;
      this.$store.dispatch('loadLibrary').then(() => this.state = 2);
    }
  };
</script>
