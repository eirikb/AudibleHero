import 'babel-polyfill';
import Vue from 'vue'
import store from './store'
import router from './router'
import 'material-design-lite'

const req = require.context('./components/', true, /\.(js|vue)$/i);
req.keys().map(key => {
  const name = key.match(/\w+/)[0];
  return Vue.component(name, req(key))
});

Vue.mixin({
  mounted() {
    if (!this.$el || !this.$el.querySelectorAll) return;
    componentHandler.upgradeElement(this.$el);

    for (const el of this.$el.querySelectorAll('[class*=mdl-js-]')) {
      if (!el.dataset.upgraded) {
        componentHandler.upgradeElement(el);
      }
    }
  }
});

// Vue.directive('dialog', {
//   inserted: el => {
//     const dialog = el.querySelector('dialog');
//     const open = el.querySelector('.open');
//     const close = el.querySelector('.close');
//     registerDialog(dialog);
//     open.addEventListener('click', () => dialog.showModal());
//     close.addEventListener('click', () => dialog.close());
//   }
// });

new Vue({
  el: '#app',
  store,
  router
});
