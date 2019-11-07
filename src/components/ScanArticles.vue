<template>
	<v-container fluid>
		<v-text-field
			label="Code article"
			class="ma-0 pa-0"
			v-model="codeArticle"
			@keyup.enter="checkCodeArticle"
			solo
			single-line
			ref="codeArticleElement"
			autofocus
			:loading="loadingCode"
			:readonly="loadingCode"
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
		<v-alert
			:value="errorMessage != ''"
			class="mt-n5 mb-5"
			type="warning"
			border="left"
		>{{ errorMessage }}</v-alert>
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
			class="elevation-1 mt-n3"
			no-data-text="La liste est vide"
			hide-default-header
			dense
		>
			<template v-slot:top>
				<v-toolbar flat color="white">
					<v-toolbar-title>Articles : {{ articles.length }}</v-toolbar-title>
					<div class="flex-grow-1"></div>
					<v-btn @click="searchArticleDialog = true" text>
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
						<v-btn icon dark @click="searchArticleDialog = false">
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
import { State, Action, Getter } from 'vuex-class';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ScanArticle from '@/components/ScanArticle.vue';
import SearchArticles from '@/components/SearchArticles.vue';
import { Article } from '../data/Article';
import axios from 'axios';
const namespace: string = 'articles';

@Component({ components: { ScanArticle, SearchArticles } })
export default class ScanArticles extends Vue {
  private articleDialog: boolean = false;
  private searchArticleDialog: boolean = false;
  private codeArticle: string = '';
  private isReadonly: boolean = false;
  private loadingCode: boolean = false;
  private showError: boolean = false;
  private errorMessage: string = '';
  private headers = [
    { text: 'EAN', value: 'CodeEAN' },
    { text: 'Libelle', value: 'Libelle' },
    { text: 'Quantité', value: 'Quantite' },
  ];

  @Getter('articlesScan', { namespace })
  private articles!: Article[];
  @Action('initialiseArticleScan', { namespace })
  private initialiseArticleScan: any;
  @Action('initAllArticlesFromLocalStorage', { namespace })
  private initAllArticlesFromLocalStorage: any;
  @Action('refreshArticles', { namespace })
  private refreshArticles: any;

  public mounted() {
    // Recupére les données sauvegardé en locale
    this.initialiseArticleScan();
    this.initAllArticlesFromLocalStorage();

    document.addEventListener('keydown', (event) => {
      if (!this.articleDialog && !this.searchArticleDialog) {
        this.$nextTick(() =>
          (this.$refs.codeArticleElement as HTMLInputElement).focus(),
        );
      }
    });
  }

  private codeIsValid(): boolean {
    return (
      this.codeArticle.length === 8 ||
      this.codeArticle.length === 13 ||
      this.codeArticle.length === 15 ||
      this.codeArticle.length === 18
    );
  }

  private checkCodeArticle() {
    if (this.codeIsValid()) {
      const article: Article = this.$store.getters[
        'articles/getArticleByCodeEAN'
      ](this.codeArticle);
      if (article) {
        this.errorMessage = '';
        this.editArticle(article);
        this.articleDialog = true;
      } else {
        this.loadingCode = true;
        axios
          .get<Article>(
            process.env.VUE_APP_ApiAcQuaUrl +
              '/Article/GetArticleByCodeEAN?code=' +
              this.codeArticle +
              '&typeAcces=' +
              process.env.VUE_APP_ApiAcQuaTypeAccess,
          )
          .then((response) => {
            if (response.data) {
              this.articleDialog = true;
              this.editArticle(response.data);
            } else {
              this.showError = true;
              this.errorMessage =
                'L\'article ' + this.codeArticle + ' n\'existe pas';
            }
          })
          .catch((e) => {
            this.showError = true;
            this.errorMessage = e.message;
          })
          .finally(() => {
            this.loadingCode = false;
            this.codeArticle = '';
          });
      }
    }
  }

  private editArticle(article: Article) {
    this.articleDialog = true;
    this.codeArticle = '';
    (this.$refs.ScanArticleWindow as ScanArticle).editArticle(article);
    window.scrollTo(0, 0);
    this.$nextTick(() =>
      (this.$refs.ScanArticleWindow as ScanArticle).focusQuantite(),
    );
  }

  private editArticleFromSearch(article: Article) {
    this.searchArticleDialog = false;
    const art: Article = this.$store.getters['articles/getArticleScanByCode'](
      article.CodeEAN,
    );
    if (art) {
      this.editArticle(art);
    } else {
      this.editArticle(article);
    }
  }

  private closeArticleWindow() {
    window.scrollTo(0, 0);
    this.articleDialog = false;
  }
}
</script>