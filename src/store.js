import Vue from 'vue'
import Vuex from 'vuex'
import {uniq, flatten, range} from 'lodash';
import {getBooks, updateFromLibrary, updateByAuthor} from './api';
import {save} from './api/cache';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    progress: false,
    progressLibrary: 0,
    progressAllAuthors: 0,
    progressAuthors: {}
  },

  mutations: {
    setBooks(state, books) {
      state.books = books;
    },

    resetProgress(state) {
      state.progressLibrary = 0;
      state.progressAllAuthors = 0;
      state.progressAuthors = {};
      state.progress = false;
    },

    progressLibrary(state, progress) {
      state.progressLibrary = progress;
    },

    progressAuthor(state, progress) {
      state.progressAuthors[progress.author] = progress.progress;
    },

    progressAllAuthors(state, progress) {
      state.progressAllAuthors = progress;
    },

    progressAuthors(state, authors) {
      state.progressAuthors = authors;
    },

    startProgress(state) {
      state.progress = true;
    }
  },

  actions: {
    getBooks({commit}) {
      const books = getBooks() || [];
      commit('setBooks', books);
    },

    update({commit}) {
      const p = (pos, tot) => Math.floor(pos / tot * 100);

      commit('resetProgress');
      commit('startProgress');
      return updateFromLibrary((pos, tot) => commit('progressLibrary', p(pos, tot))).then(async books => {
        commit('progressLibrary', 100);
        const authors = uniq(flatten(books.map(book => book.authors)));

        commit('progressAuthors', authors.reduce((res, author) => {
          res[author] = 0;
          return res;
        }, {}));

        let authorsDone = 0;
        const authorsCount = authors.length;
        await Promise.all(
          range(0, 10).map(async index => {
            let author;
            while (author = authors.pop()) {
              await updateByAuthor(author, (pos, tot) => commit('progressAuthor', {
                author,
                progress: p(pos, tot)
              }));
              authorsDone++;
              commit('progressAllAuthors', Math.floor(authorsDone / authorsCount * 100));
            }
          })
        );
        save();
      });
    }
  }
});