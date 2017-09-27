<template>
  <div class="mdc-typography">
    <router-view></router-view>
  </div>
</template>


<script>
  export default {
    created() {
      this.$store.dispatch('getBooks');
    }
  }
</script>

<style lang="scss">
  @import '~@material/typography/mdc-typography';
</style>
