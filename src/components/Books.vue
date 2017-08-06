<template>
  <div class="mdc-layout-grid">
    <div class="mdc-layout-grid__inner">


      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2"
           v-for="book in $store.state.books.slice(0, 30)">


        <div class="mdc-card">
          <section class="mdc-card__media">

            <img class="mdc-card__media-item mdc-card__media-item--2x"
                 :src="`https://images-na.ssl-images-amazon.com/images/I/${book.imageId}._SL160_.jpg`">

          </section>
          <section class="mdc-card__primary">
            <h1 class="mdc-card__title mdc-card__title--large">{{book.title}}</h1>
            <h2 class="mdc-card__subtitle"></h2>
          </section>
          <section class="mdc-card__actions">
            <button class="mdc-button mdc-button--compact mdc-card__action">Action 1</button>
            <button class="mdc-button mdc-button--compact mdc-card__action">Action 2</button>
          </section>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@material/card/mdc-card';
  @import '@material/layout-grid/mdc-layout-grid';
  @import '@material/button/mdc-button';
</style>
