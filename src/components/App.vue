<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">AudibleHero!</span>
      <nav class="mdl-navigation">
        <router-link to="/" class="mdl-navigation__link">Home</router-link>
        <router-link to="/update" class="mdl-navigation__link">Update</router-link>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style lang="sass">
  @import "~material-design-lite/material.css";
</style>
