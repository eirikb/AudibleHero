import Vue from 'vue'
import Vuex from 'vuex'
import {uniq, flatten} from 'lodash';

import loadLibrary from './api/library';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    libraryLoaded: false,
    library: [],
    authors: {}
  },

  mutations: {
    setLibrary(state, books) {
      state.libraryLoaded = true;
      state.library = books;
      state.authors = uniq(flatten(books.map(book => book.authors)))
        .reduce((res, name) => {
          res[name] = {progress: 0};
          return res;
        }, {});
    }
  },

  actions: {
    loadLibrary({commit}) {
      return loadLibrary().then(books =>
        commit('setLibrary', books)
      );
    },

    loadAuthors({commit}) {
    }
  }
});