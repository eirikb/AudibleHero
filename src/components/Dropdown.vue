<template>
  <div>

    <div ref="select" class="mdc-select" role="listbox" tabindex="0">
      <span class="mdc-select__selected-text">{{text}}</span>
      <div class="mdc-simple-menu mdc-select__menu">
        <ul class="mdc-list mdc-simple-menu__items">
          <li class="mdc-list-item" role="option" :id="data[0].value" aria-disabled="true">
            {{text}}
          </li>
          <li class="mdc-list-item" role="option" :id="item.value" tabindex="0" v-for="item in data">
            {{item.label}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {MDCSelect} from '@material/select';

  export default {
    props: ['text', 'data'],

    mounted() {
      const select = new MDCSelect(this.$refs.select);
      select.listen('MDCSelect:change', () =>
        this.$emit('input', select.value)
      );

      new MDCSelect(this.$refs.select2);
    }
  }
</script>

<style lang="scss">
  @import '@material/select/mdc-select';
  @import '@material/menu/mdc-menu';
  @import '@material/list/mdc-list';
</style>
