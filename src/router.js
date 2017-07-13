import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/', component: {template: '<App></App>'},
      children: [
        {name: 'Home', path: '', component: {template: '<Home></Home>'}},
        {name: 'Update', path: 'update', component: {template: '<Update></Update>'}}
      ]
    }
  ]
});