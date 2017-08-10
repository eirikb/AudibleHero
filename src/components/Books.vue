<template>
  <div>
    <router-link to="/">Update</router-link>

    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"
             v-for="book in books">

          <div class="mdc-card">
            <section class="mdc-card__media">

              <img class="mdc-card__media-item mdc-card__media-item--2x"
                   :src="`https://images-na.ssl-images-amazon.com/images/I/${book.imageId}._SL160_.jpg`">

            </section>
            <section class="mdc-card__primary">
              <h1 class="mdc-card__title mdc-card__title--large" v-if="book.seriesBookIndex">
                {{book.seriesName}}
              </h1>
              <h1 class="mdc-card__title mdc-card__title--large">
                {{book.title}}
              </h1>
              <h2 class="mdc-card__subtitle">
                <span v-if="book.seriesBookIndex">
                {{book.seriesName}}<br>
                {{book.seriesBookIndex}} /
                {{book.seriesBookMaxIndex}}<br>
                Series in library: {{book.seriesInLibrary}}<br>
                </span>
                Authors: {{book.authors.join(',')}}<br>
                Released: {{book.releaseDate}}<br>
                Is released: {{book.released}}<br>
                Language: {{book.language}}<br>
                Rating: {{book.rating}}<br>
                Length: {{book.length}}<br>
              </h2>
            </section>
            <section class="mdc-card__actions">
              <a class="mdc-button mdc-button--compact mdc-card__action" target="_blank"
                 :href="`https://www.audible.com/pd/${book.id}`">
                Book
              </a>
              <a class="mdc-button mdc-button--compact mdc-card__action" target="_blank"
                 :href="`http://www.audible.com/series?asin=${book.seriesId}`">
                Series
              </a>
            </section>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import books from '../api/filter-books';

  export default {
    computed: {
      books() {
        return books(this.$store.state.books, {
          limit: 20,
          orderBy: 'releaseDate',
          desc: true,
          filter: {
            inLibrary: false,
            seriesInLibrary: true,
          }
        });
      }
    }
  };

</script>

<style lang="scss">
  @import '@material/card/mdc-card';
  @import '@material/layout-grid/mdc-layout-grid';
  @import '@material/button/mdc-button';
</style>
