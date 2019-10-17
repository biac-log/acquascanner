<template>
  <v-app class="noscroll">
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" black>
          <span>AcQua</span>
          <span class="font-weight-light">Scanner</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <router-link to="/options" black>
        <v-icon>mdi-menu</v-icon>
      </router-link>
    </v-app-bar>

    <v-content>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import ScanArticles from "./components/ScanArticles.vue";

export default Vue.extend({
  name: "App",
  components: {
    ScanArticles
  },
  data: () => ({
    snackbar: false,
  })
});
</script>

<style>
a {
  color: black !important; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
</style>