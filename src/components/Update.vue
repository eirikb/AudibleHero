<template>
  <div>
    <div v-if="!$store.state.progress">

      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">

          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
            <button class="mdc-button mdc-button--raised" @click="update">Update</button>
            <router-link to="books" class="mdc-button"
                         v-if="!($store.state.progress || $store.state.books.length === 0)">Skip
            </router-link>
          </div>

          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8"></div>

          <div v-if="$store.state.books.length > 0" class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
            <button class="mdc-button mdc-button--raised" @click="clearCache">Clear cache</button>
            {{$store.state.books.length}} books in cache
          </div>
        </div>
      </div>
    </div>

    <div v-if="$store.state.progress">
      <p>Note: Subsequent updates are incremental, i.e., much faster.</p>
      <div v-if="$store.state.progressLibrary < 100">
        <b>Loading library</b>
        <Progress :progress="$store.state.progressLibrary"></Progress>
      </div>
      <div class="mdc-layout-grid" v-else>
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
            <Progress :progress="$store.state.progressAllAuthors"></Progress>
          </div>
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2" v-for="author in authors">
            <b>{{author.name}}</b>
            <Progress :progress="author.progress"></Progress>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
          <h3>2017-09-08</h3>
          <p>A new and worse AudibleHero!</p>
          <p>
            I've had several issues lately with the extension, so I had to do a lot of fixes.<br>
            In the end I decided to re-write the extension, in order to make it easier
            to maintain and add new features.<br>
            This means some features are gone (until someone request them back), such
            as Incognito search.<br>
            Remember I'm making this extension mainly for myself, as I'm doing it in my spare time, for free.
          </p>
          <p>
            Noteworthy changes:
          </p>
          <ul>
            <li>New look.<br>Replaced Bootstrap with Material Design, so now everything looks worse, but that's probably because I don't know how to use it properly.
            </li>
            <li>Removed Incognito search.<br>I simply no longer bother to do the hack to get other books.</li>
            <li>Removed Ignore books.<br>Storing data on the Google account didn't work properly. All data is now stored on the computer.
            </li>
          </ul>
          <p>
            Please file all bugs and/or feature requests to the <a target="_blank"
                                                                   href="https://github.com/eirikb/audiblehero">GitHub Repository</a>.<br>
            If you don't have a GitHub account, and don't want one, you can e-mail me at <a
              href="mailto:eirikb@eirikb.no">eirikb@eirikb.no</a>.
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {clear, save} from '../api/cache';

  export default {
    computed: {
      authors() {
        return Object.entries(this.$store.state.progressAuthors)
          .map(([name, progress]) => ({name, progress}))
          .sort((a, b) => a.name.localeCompare(b.name));
      }
    },

    mounted() {
      this.$store.commit('resetProgress');
    },

    methods: {
      async update() {
        await this.$store.dispatch('update');
        this.$store.dispatch('getBooks');
        this.$router.push('/books');
      },

      clearCache() {
        clear();
        save();
        this.$store.dispatch('getBooks');
      }
    }
  }
</script>

<style lang="scss">
  @import '@material/layout-grid/mdc-layout-grid';
  @import '@material/button/mdc-button';
</style>
