import Vue from 'vue'
import Vuex from 'vuex'
import {uniq, flatten, chunk} from 'lodash';
import {getBooks, updateFromLibrary, updateByAuthor} from './api';
import {save} from './api/cache';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    progressLibrary: 0,
    progressAuthors: {}
  },

  mutations: {
    setBooks(state, books) {
      state.books = books;
    },

    resetProgress(state) {
      state.progressLibrary = 0;
      state.progressAuthors = {};
    },

    progressLibrary(state, progress) {
      state.progressLibrary = progress;
    },

    progressAuthor(state, progress) {
      state.progressAuthors[progress.author] = progress.progress;
    },

    progressAuthors(state, authors) {
      state.progressAuthors = authors;
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
      updateFromLibrary((pos, tot) => commit('progressLibrary', p(pos, tot))).then(async books => {
        commit('progressLibrary', 100);
        const authors = uniq(flatten(books.map(book => book.authors)));
        const chunkSize = authors.length / 10;
        const authorsChunked = chunk(authors, chunkSize);

        commit('progressAuthors', authors.reduce((res, author) => {
          res[author] = 0;
          return res;
        }, {}));

        await Promise.all(authorsChunked.map(async (authors) => {
          for (const author of authors) {
            const books = await updateByAuthor(author, (pos, tot) => commit('progressAuthor', {
              author,
              progress: p(pos, tot)
            }));
          }
        }));
        save();
      });
    }
  }
});