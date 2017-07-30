import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/', component: {template: '<App></App>'},
      children: [
        {name: 'Update', path: '', component: {template: '<Update></Update>'}},
        {name: 'Books', path: 'books', component: {template: '<Books></Books>'}}
      ]
    }
  ]
});