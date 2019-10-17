<template>
  <v-container>
    <v-alert :value="errorMessage != ''" type="warning" border="left">{{ errorMessage }}</v-alert>
    <v-btn
      block
      color="success"
      class="mt-5"
      @click="clickSendArticlesListe"
      :loading="loadingSendArticleScan"
      :disabled="articlesScan.length === 0"
      dismissible
    >Envoyer les articles scannés</v-btn>
    <v-btn
      block
      class="mt-5"
      color="primary"
      @click="refreshAllArticles()"
      :loading="loading"
      dark
    >Charger tous les articles</v-btn>
    <p class="ma-5">Articles chargés : {{ countArticles }}</p>
    <v-btn block color="error" @click="clearData()" dark class="d-flex align-end">Réinitialiser</v-btn>
    <v-snackbar v-model="displaySuccessMessage" color="success" :timeout="10000">
      {{ successMessage }}
      <v-btn dark text @click="displaySuccessMessage = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue, Emit } from "vue-property-decorator";
import { Article } from "../data/Article";

@Component({})
export default class Options extends Vue {
  @Action("clearAll", { namespace: "articles" })
  private clearAll: any;
  @Action("refreshArticles", { namespace: "articles" })
  private refreshArticles: any;
  @Action("sendArticlesScan", { namespace: "articles" })
  private sendArticlesScan: any;
  @Action("displaySuccessMessage", { namespace: "articles" })
  private actionDisplaySuccessMessage: any;

  @Getter("articlesScan", { namespace: "articles" })
  private articlesScan!: Article[];
  @Getter("countArticles", { namespace: "articles" })
  private countArticles!: number;
  @Getter("loading", { namespace: "articles" })
  private loading!: boolean;
  @Getter("errorMessage", { namespace: "articles" })
  private errorMessage!: string;
  @Getter("successMessage", { namespace: "articles" })
  private successMessage!: string;
  @Getter("loadingSendArticleScan", { namespace: "articles" })
  private loadingSendArticleScan!: boolean;

  get displaySuccessMessage() {
    return this.$store.state.articles.displaySuccessMessage;
  }
  set displaySuccessMessage(value: boolean) {
    this.actionDisplaySuccessMessage(value);
  }

  private clearData() {
    if (
      confirm(
        "Voulez-vous réinitialiser l'application ? toutes les données seront perdues."
      )
    ) {
      this.clearAll();
    }
  }

  private refreshAllArticles() {
    this.refreshArticles();
  }

  private clickSendArticlesListe() {
    if (
      confirm(
        "Assurez vous d'avoir une bonne connexion réseau avant d'envoyer la liste des articles. Voulez-vous continuer ?"
      )
    ) {
      this.sendArticlesScan();
    }
  }
}
</script>