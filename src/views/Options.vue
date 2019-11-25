<template>
	<v-container>
		<!-- <v-btn
			block
			color="success"
			class="mt-5"
			@click="clickSendArticlesListe"
			:loading="loadingSendArticleScan"
			:disabled="articlesScan.length === 0"
			dismissible
		>Envoyer les articles scannés</v-btn> -->
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
	</v-container>
</template>

<script lang="ts">
import { State, Action, Getter } from 'vuex-class';
import { Component, Vue, Emit } from 'vue-property-decorator';
import { Article } from '../data/Article';
import { UserApollo } from '../data/UserApollo';
import axios from 'axios';

@Component({})
export default class Options extends Vue {
  @Action('clearAll', { namespace: 'articles' })
  private clearAll: any;
  @Action('refreshArticles', { namespace: 'articles' })
  private refreshArticles: any;
  // @Action('sendArticlesScan', { namespace: 'articles' })
  // private sendArticlesScan: any;
  // @Action('displaySuccessMessage', { namespace: 'articles' })
  // private actionDisplaySuccessMessage: any;

  // @Getter('articlesScan', { namespace: 'articles' })
  // private articlesScan!: Article[];
  @Getter('countArticles', { namespace: 'articles' })
  private countArticles!: number;
  @Getter('loading', { namespace: 'articles' })
  private loading!: boolean;

  //private usersApollo: UserApollo[] = [];
  //private userApolloSelected: UserApollo | null = null;
  //private loadUser: Boolean = false;
  //private loadUserErrorMessage: string = '';

  private clearData() {
    if (
      confirm(
        'Voulez-vous réinitialiser l\'application ? toutes les données seront perdues.',
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