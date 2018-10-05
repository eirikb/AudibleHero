<template>
  <div>
    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <router-link to="/" class="mdc-button">Update</router-link>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <button class="mdc-button" @click="clearFilter">
            Clear filter
          </button>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <button class="mdc-button" @click="defaultFilter">
            Default filter
          </button>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <button class="mdc-button" @click="libraryFilter">
            Library filter
          </button>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4"></div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <Dropdown v-model="inLibrary" text="Book located in library"
                    :items="[
                    {label:'In library',value:true},
                    {label:'Not in library',value:false}]"></Dropdown>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <Dropdown v-model="released" text="Released status"
                    :items="[
                    {label:'Is released',value:true},
                    {label:'Not yet released',value:false}]"></Dropdown>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <Dropdown v-model="seriesInLibrary" text="Series located in library"
                    :items="[
                    {label:'Series is in library',value:true},
                    {label:'Series is not in library',value:false}]"></Dropdown>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <Dropdown v-model="language" text="Language"
                    :items="[
                    {label:'English',value:'en'}]"></Dropdown>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <Dropdown v-model="seriesBookIndexInLibrary" text="Show with same series number"
                    :items="[
                    {label:'Hide with same series number',value:false}]"></Dropdown>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <Dropdown v-model="ignore" text="Show ignored books"
                    :items="[
                    {label:'Hide ignored books',value:false}]"></Dropdown>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <Dropdown v-model="orderBy" text="Series in library"
                    :items="[
                      {label:'Order by release date',value:'releaseDate'},
                      {label:'Order by length',value:'length'},
                      {label:'Order by rating',value:'rating'}]"></Dropdown>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <Dropdown v-model="desc" text="Series in library"
                    :items="[
                      {label:'Descending order',value:true},
                      {label:'Ascending order',value:false}]"></Dropdown>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <Dropdown v-model="limit" text="Limit"
                    :items="[
                      {label:'Show 10',value:10},
                      {label:'Show 50',value:50},
                      {label:'Show 100',value:100},
                      {label:'Show 200',value:200},
                      {label:'Show 500',value:500},
                      {label:'Show 1000',value:1000}]"></Dropdown>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <div class="mdc-textfield">
            <input v-model="text" type="text" class="mdc-textfield__input" placeholder="Search">
          </div>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4"></div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
          Showing total of {{books.slice(0, limit).length}} of total {{books.length}} books
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"
             v-for="book in books.slice(0, limit)">

          <div class="mdc-card">
            <section class="mdc-card__media">

              <img v-lazy class="mdc-card__media-item mdc-card__media-item--2x"
                   :data-src="`https://images-na.ssl-images-amazon.com/images/I/${book.imageId}._SL160_.jpg`">

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
                  <span title="Series books index (could be decimal-based)">{{book.seriesBookIndex}}</span> /
                  <span title="Series max book index (highest number, not amount)">{{book.seriesBookMaxIndex}}</span>
                  <span title="How many books in this series you have in your library">({{book.seriesInLibraryCount || 0}})</span>
                  <br>
                  <span v-if="!book.seriesInLibrary">
                    You don't have this series in your library<br>
                  </span>
                </span>
                <span v-if="book.inLibrary">Book is in your library<br></span>
                Authors: {{book.authors.join(',')}}<br>
                Release: {{book.releaseDate}}
                <span v-if="!book.released"> (not yet released)</span>
                <br>
                Language: {{book.language}}<br>
                Rating: {{book.rating}}<br>
                Length: {{length(book.length)}}<br>
              </h2>
            </section>
            <section class="mdc-card__actions">
              <a class="mdc-button mdc-button--compact mdc-card__action" target="_blank"
                 :href="`/pd/${book.id}`">
                Book
              </a>
              <a class="mdc-button mdc-button--compact mdc-card__action" target="_blank"
                 :href="`/series?asin=${book.seriesId}`"
                 v-if="book.seriesId">
                Series
              </a>
            </section>
            <section class="mdc-card__actions">
              <a class="mdc-button mdc-button--compact mdc-card__action" @click="ignoreBook(book)">
                Ignore
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

  const defaultFilter = {
    inLibrary: false,
    released: true,
    seriesInLibrary: true,
    language: 'en',
    orderBy: 'releaseDate',
    seriesBookIndexInLibrary: false,
    ignore: false,
    text: '',
    desc: true
  };

  export default {
    data() {
      return Object.assign({
        limit: 100,
        total: 0
      }, defaultFilter);
    },

    computed: {
      books() {
        return books(this.$store.state.books, {
          orderBy: this.orderBy,
          desc: this.desc,
          filter: {
            inLibrary: this.inLibrary,
            released: this.released,
            seriesInLibrary: this.seriesInLibrary,
            language: this.language,
            seriesBookIndexInLibrary: this.seriesBookIndexInLibrary,
            ignore: this.ignore
          },
          textFilter: this.text
        });
      }
    },

    methods: {
      clearFilter() {
        this.inLibrary = undefined;
        this.released = undefined;
        this.seriesInLibrary = undefined;
        this.language = undefined;
        this.orderBy = 'releaseDate';
        this.desc = true;
        this.seriesBookIndexInLibrary = false;
        this.ignore = false;
      },

      defaultFilter() {
        Object.assign(this, defaultFilter);
      },

      libraryFilter() {
        this.clearFilter();
        this.inLibrary = true;
      },

      length(length) {
        const hours = Math.floor(length / 60);
        const minutes = length - 60 * hours;
        return `${hours}h ${minutes}m`;
      },

      ignoreBook(book) {
        this.$store.commit('ignoreBook', book);
      }
    }
  };

</script>

<style lang="scss">
  @import '@material/card/mdc-card';
  @import '@material/layout-grid/mdc-layout-grid';
  @import '@material/button/mdc-button';
  @import '@material/textfield/mdc-textfield';
</style>
