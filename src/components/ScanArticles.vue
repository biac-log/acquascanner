<template>
  <v-container fluid>
    <v-text-field
      label="Code article"
      class="mb-n5"
      v-model="codeArticle"
      @keyup.enter="checkCodeArticle"
      solo
      single-line
      ref="codeArticleElement"
      autofocus
      :loading="loadingCode"
      :readonly="loadingCode"
      @keyup="triggerCheck"
      maxlength="13"
      clearable
    >
      <v-btn
        slot="append"
        outlined
        color="success"
        :disabled="!this.codeIsValid()"
        @click="checkCodeArticle"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-text-field>
    <!-- <v-alert
      :value="errorMessage != ''"
      class="mt-n5 mb-2"
      type="warning"
      border="left"
    >{{ errorMessage }}</v-alert>-->
    <v-data-table
      :footer-props="{
				'items-per-page-options': [10, 25, 50, -1],
				'items-per-page-text': '',
				'items-per-page-all-text': 'All'
			}"
      :items-per-page="10"
      :headers="headers"
      :items="articles"
      @click:row="editArticle"
      class="elevation-1"
      no-data-text="La liste est vide"
      hide-default-header
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Articles : {{ articles.length }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-btn @click="openSearchArticleDialog()" text>
            <v-icon>mdi-magnify-plus-outline</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
    </v-data-table>

    <v-layout justify-center>
      <v-dialog
        v-model="articleDialog"
        eager
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="articleDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Article</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <ScanArticle @actionPerform="closeArticleWindow" ref="ScanArticleWindow" />
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="searchArticleDialog"
        eager
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="closeSearchArticleDialog()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Recherche d'articles</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="refreshArticles()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-toolbar>
          <SearchArticles @elementClick="editArticleFromSearch" />
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ScanArticle from "@/components/ScanArticle.vue";
import SearchArticles from "@/components/SearchArticles.vue";
import { Article } from "../data/Article";
import axios from "axios";
const namespace: string = "articles";

@Component({ components: { ScanArticle, SearchArticles } })
export default class ScanArticles extends Vue {
  private articleDialog: boolean = false;
  private searchArticleDialog: boolean = false;
  private codeArticle: string = "";
  private isReadonly: boolean = false;
  private loadingCode: boolean = false;
  private showError: boolean = false;
  // private errorMessage: string = "";
  private headers = [
    { text: "EAN", value: "CodeEAN" },
    { text: "Libelle", value: "Libelle" },
    { text: "Quantité", value: "Quantite" }
  ];

  @Getter("articlesScan", { namespace })
  private articles!: Article[];
  @Action("refreshArticles", { namespace })
  private refreshArticles: any;

  public mounted() {
    document.addEventListener("keydown", event => {
      if (!this.articleDialog && !this.searchArticleDialog) {
        this.$nextTick(() =>
          (this.$refs.codeArticleElement as HTMLInputElement).focus()
        );
      }
    });
  }

  private codeIsValid(): boolean {
    return this.codeArticle.length <= 13 && this.codeArticle.length >= 1;
  }

  private triggerCheck() {
    if (this.codeArticle.length >= 11 && this.codeArticle.length <= 13) {
      this.checkCodeArticle();
    }
  }

  private checkCodeArticle() {
    if (this.codeIsValid()) {
      const pad = "0000000000000";
      const trueCodeArticle =
        pad.substring(0, pad.length - this.codeArticle.length) +
        this.codeArticle;
      const article: Article = this.$store.getters[
        "articles/getArticleByCodeEAN"
      ](trueCodeArticle);
      if (article) {
        this.$store.commit("articles/setErrorMessage", "");
        this.editArticle(article);
        this.articleDialog = true;
      } else {
        this.loadingCode = true;
        axios
          .get<Article>(
            process.env.VUE_APP_ApiArticle +
              "/Article/GetArticleByCodeEAN?code=" +
              trueCodeArticle
          )
          .then(response => {
            if (response.data) {
              this.articleDialog = true;
              this.editArticle(response.data);
            } else {
              this.showError = true;
              this.$store.commit(
                "articles/setErrorMessage",
                "L'article " + this.codeArticle + " n'existe pas"
              );
            }
          })
          .catch(e => {
            this.showError = true;
            this.$store.commit("articles/setErrorMessage", e.message);
          })
          .finally(() => {
            this.loadingCode = false;
            // if (this.codeArticle.length >= 13)
            this.codeArticle = "";
          });
      }
    }
  }

  private editArticle(article: Article) {
    this.articleDialog = true;
    this.codeArticle = "";
    (this.$refs.ScanArticleWindow as ScanArticle).editArticle(article);
    window.scrollTo(0, 0);
    this.$nextTick(() =>
      (this.$refs.ScanArticleWindow as ScanArticle).focusQuantite()
    );
  }

  private editArticleFromSearch(article: Article) {
    this.closeSearchArticleDialog;
    const art: Article = this.$store.getters["articles/getArticleScanByCode"](
      article.CodeEAN
    );
    if (art) {
      this.editArticle(art);
    } else {
      this.editArticle(article);
    }
  }

  private openSearchArticleDialog() {
    this.searchArticleDialog = true;
    document.documentElement.style.overflow = "hidden";
  }
  private closeSearchArticleDialog() {
    this.searchArticleDialog = false;
    document.documentElement.style.overflow = "auto";
  }
  private closeArticleWindow() {
    window.scrollTo(0, 0);
    this.articleDialog = false;
  }
}
</script>