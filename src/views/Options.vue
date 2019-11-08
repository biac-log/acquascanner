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

		<v-dialog v-model="sendArticlesDialog" max-width="290">
			<v-card>
				<v-card-title class="headline">Envoi de l'inventaire</v-card-title>
				<v-card-text>Veuillez selectionner un utilisateur</v-card-text>
				<v-select
					class="ml-5 mr-5 mb-5"
					:items="usersApollo"
					v-model="userApolloSelected"
					item-text="UserName"
					label="Sélectionner l'utlisateur"
					:loading="loadUser"
					return-object
          :readonly="loadUser"
					solo
				></v-select>
				<v-alert :value="loadUserErrorMessage != ''" class="ma-0" type="warning" border="left">
					{{ loadUserErrorMessage }}
					<v-btn small color="primary" :loading="loadUser" @click="loadUsersApollo">
						<v-icon left>mdi-refresh</v-icon>Recharger
					</v-btn>
				</v-alert>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="green darken-1"
						text
						@click="sendArticle"
						:disabled="userApolloSelected === null"
					>Envoyer</v-btn>
					<v-btn color="red darken-1" text @click="sendArticlesDialog = false">Annuler</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
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
  @Action('sendArticlesScan', { namespace: 'articles' })
  private sendArticlesScan: any;
  @Action('displaySuccessMessage', { namespace: 'articles' })
  private actionDisplaySuccessMessage: any;

  @Getter('articlesScan', { namespace: 'articles' })
  private articlesScan!: Article[];
  @Getter('countArticles', { namespace: 'articles' })
  private countArticles!: number;
  @Getter('loading', { namespace: 'articles' })
  private loading!: boolean;
  @Getter('errorMessage', { namespace: 'articles' })
  private errorMessage!: string;
  @Getter('successMessage', { namespace: 'articles' })
  private successMessage!: string;
  @Getter('loadingSendArticleScan', { namespace: 'articles' })
  private loadingSendArticleScan!: boolean;

  private sendArticlesDialog = false;
  private usersApollo: UserApollo[] = [];
  private userApolloSelected: UserApollo | null = null;
  private loadUser: Boolean = false;
  private loadUserErrorMessage: string = '';

  get displaySuccessMessage() {
    return this.$store.state.articles.displaySuccessMessage;
  }
  set displaySuccessMessage(value: boolean) {
    this.actionDisplaySuccessMessage(value);
  }

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

  private clickSendArticlesListe() {
    this.sendArticlesDialog = true;
    this.loadUsersApollo();
  }

  private loadUsersApollo() {
    this.loadUser = true;
    axios
      .get<UserApollo[]>(process.env.VUE_APP_ApiAcQuaUrl + '/UserApollo/GetAll')
      .then((response) => {
        if (response.data) {
          this.usersApollo = response.data;
          this.loadUserErrorMessage = '';
        }
      })
      .catch((e) => {
        this.loadUserErrorMessage =
          'Erreur lors du chargement des utilisateurs : ' + e.message;
      })
      .finally(() => {
        this.loadUser = false;
      });
  }

  private sendArticle() {
    this.sendArticlesDialog = false;
    this.sendArticlesScan(this.userApolloSelected);
  }
}
</script>