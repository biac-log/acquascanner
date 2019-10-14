<template>
  <v-container>
    <v-btn block class="mt-5" color="primary" @click="refreshAllArticles()" :loading="loading" dark>Charger tous les articles</v-btn>
    <p class="ma-5">Articles chargés : {{ countArticles }}</p>
    <v-btn block color="error" @click="clearData()" dark>Réinitialiser</v-btn>
  </v-container>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({})
export default class Options extends Vue {
  @Action("clearAll", { namespace: "articles" })
  private clearAll: any;
  @Action("refreshArticles", { namespace: "articles" })
  private refreshArticles: any;
  @Getter("countArticles", { namespace: "articles" })
  private countArticles!: number;
  @Getter("loading", {namespace : "articles"})
  private loading!: boolean;

  private clearData() {
    if (
      confirm(
        "Voulez réinitialiser l'application ? toutes les données seront perdues. "
      )
    ) {
      this.clearAll();
    }
  }

  private refreshAllArticles() {
    this.refreshArticles();
  }
}
</script>