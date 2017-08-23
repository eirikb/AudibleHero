import Vue from 'vue';

Vue.directive('lazy', {
  bind(el) {
    const src = el.src;

    el.src = '';
    el.__onScroll__ = () => {
      const rect = el.getBoundingClientRect();
      const height = el.height;

      const elementIsVisible = rect.top + height >= 0 && rect.bottom - height <= window.innerHeight;

      if (elementIsVisible) {
        el.src = src;
      }
    };
    document.addEventListener('scroll', el.__onScroll__);
  },

  inserted(el) {
    el.__onScroll__();
  },

  unbind(el) {
    document.removeEventListener('scroll', el.__onScroll__);
  }
});
