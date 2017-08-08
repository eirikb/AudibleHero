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
              <h1 class="mdc-card__title mdc-card__title--large">
                <a target="_blank" :href="`https://www.audible.com/pd/${book.id}`">
                  {{book.title}}
                </a>
              </h1>
              <h2 class="mdc-card__subtitle">
                <span v-if="book.seriesBookIndex">
                {{book.seriesName}}<br>
                {{book.seriesBookIndex}} /
                {{book.seriesBookMaxIndex}}<br>
                Series in library: {{book.seriesInLibrary}}<br>
                </span>
                Authors: {{book.authors}}<br>
                Released: {{book.releaseDate}}<br>
                Is released: {{book.released}}<br>
                Language: {{book.language}}<br>
                Rating: {{book.rating}}<br>
                Length: {{book.length}}<br>
              </h2>
            </section>
            <section class="mdc-card__actions">
              <button class="mdc-button mdc-button--compact mdc-card__action">Action 1</button>
              <button class="mdc-button mdc-button--compact mdc-card__action">Action 2</button>
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
          inLibrary: false,
          seriesInLibrary: true,
          orderBy: 'releaseDate',
          desc: true
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
