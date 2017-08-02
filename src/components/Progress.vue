<template>
  <div ref="progressbar" role="progressbar" class="mdc-linear-progress">
    <div class="mdc-linear-progress__buffering-dots"></div>
    <div class="mdc-linear-progress__buffer"></div>
    <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
      <span class="mdc-linear-progress__bar-inner"></span>
    </div>
    <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
      <span class="mdc-linear-progress__bar-inner"></span>
    </div>
  </div>
</template>

<script>
  import {MDCLinearProgress} from '@material/linear-progress';

  export default {
    props: ['progress'],

    mounted() {
      this.mdc = new MDCLinearProgress(this.$refs.progressbar);
      this.setProgress();
    },

    methods: {
      setProgress() {
        this.mdc.progress = parseInt(this.progress) / 100;
      }
    },

    watch: {
      progress() {
        this.setProgress();
      }
    },

    destroyed() {
      this.mdc.destroy();
    }
  }
</script>