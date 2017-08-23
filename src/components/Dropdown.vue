<template>
  <div ref="select" class="mdc-select" role="listbox">
    <span class="mdc-select__selected-text">{{text}}</span>
    <div class="mdc-simple-menu mdc-select__menu">
      <ul class="mdc-list mdc-simple-menu__items">
        <li class="mdc-list-item" role="option" aria-disabled="true">
          {{text}}
        </li>
        <li class="mdc-list-item" role="option" v-for="item in items">
          {{item.label}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {MDCSelect} from '@material/select';

  export default {
    props: ['value', 'text', 'items'],

    mounted() {
      const select = new MDCSelect(this.$refs.select);
      select.selectedIndex = this.items.findIndex(item => item.value === this.value) + 1;
      select.listen('MDCSelect:change', () =>
        this.$emit('input', this.items[select.selectedIndex - 1].value)
      );
    }
  }
</script>

<style lang="scss">
  @import '@material/select/mdc-select';
  @import '@material/menu/mdc-menu';
  @import '@material/list/mdc-list';
</style>
