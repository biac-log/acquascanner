<template>
  <v-card>
    <v-card-title class="headline">Envoi de l'inventaire</v-card-title>
    <v-card-text>Veuillez selectionner un utilisateur et une action</v-card-text>
    <v-select
      class="ml-5 mr-5 mb-5"
      :items="usersApollo"
      v-model="userApolloSelected"
      item-text="UserName"
      label="Sélectionner l'utilisateur"
      :loading="loadTypeFichier"
      :readonly="loadTypeFichier"
      return-object
      hide-details
      solo
    ></v-select>
    <v-select
      class="ml-5 mr-5 mb-5"
      :items="typesFichier"
      v-model="typesFichierSelected"
      item-text="Libelle"
      label="Sélectionner action"
      :loading="loadUser"
      :readonly="loadUser"
      return-object
      hide-details
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
        :disabled="userApolloSelected === null || typesFichierSelected === null"
        :loading="loadingSendArticleScan"
      >Envoyer</v-btn>
      <v-btn color="red darken-1" text @click="closeWindow">Annuler</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue, Emit } from "vue-property-decorator";
import { UserApollo } from "../data/UserApollo";
import { TypeFichier } from "../data/TypeFichier";
import axios from "axios";
import { ExportState } from "../store/articles/types";

@Component({})
export default class Options extends Vue {
  @Action("sendArticlesScan", { namespace: "articles" })
  private sendArticlesScan: any;
  @Action("displaySuccessMessage", { namespace: "articles" })
  private actionDisplaySuccessMessage: any;

  @Getter("loading", { namespace: "articles" })
  private loading!: boolean;
  @Getter("errorMessage", { namespace: "articles" })
  private errorMessage!: string;
  @Getter("successMessage", { namespace: "articles" })
  private successMessage!: string;
  @Getter("loadingSendArticleScan", { namespace: "articles" })
  private loadingSendArticleScan!: boolean;

  private usersApollo: UserApollo[] = [];
  private userApolloSelected: UserApollo | null = null;
  private loadUser: boolean = false;
  private loadUserErrorMessage: string = "";

  private typesFichier: TypeFichier[] = [];
  private typesFichierSelected: TypeFichier | null = null;
  private loadTypeFichier: boolean = false;
  private export: ExportState | null = null;

  private mounted() {
    this.loadUsersApollo();
    this.loadTypesFichier();
  }

  get displaySuccessMessage() {
    return this.$store.state.articles.displaySuccessMessage;
  }
  set displaySuccessMessage(value: boolean) {
    this.actionDisplaySuccessMessage(value);
  }

  private loadUsersApollo() {
    this.loadUser = true;
    axios
      .get<UserApollo[]>(process.env.VUE_APP_ApiAcQuaUrl + "/UserApollo/GetAll")
      .then(response => {
        if (response.data) {
          this.usersApollo = response.data;
          this.loadUserErrorMessage = "";
        }
      })
      .catch(e => {
        this.loadUserErrorMessage =
          "Erreur lors du chargement des utilisateurs : " + e.message;
      })
      .finally(() => {
        this.loadUser = false;
      });
  }

  private loadTypesFichier() {
    this.loadTypeFichier = true;
    axios
      .get<TypeFichier[]>(
        process.env.VUE_APP_ApiAcQuaUrl + "/Inventaire/TypesFichier"
      )
      .then(response => {
        if (response.data) {
          this.typesFichier = response.data;
          this.loadUserErrorMessage = "";
        }
      })
      .catch(e => {
        this.loadUserErrorMessage =
          "Erreur lors du chargement des types de fichier : " + e.message;
      })
      .finally(() => {
        this.loadTypeFichier = false;
      });
  }

  private sendArticle() {
    if (this.userApolloSelected != null && this.typesFichierSelected != null) {
      this.export = new ExportState();
      this.export.userNumeroSession = this.userApolloSelected.NumeroSession;
      this.export.typeFichierInventaireId = this.typesFichierSelected.Id;
      this.sendArticlesScan(this.export);
      this.$emit("showSendArticleDialog", false);
    }
  }

  private closeWindow() {
    this.$emit("showSendArticleDialog", false);
  }
}
</script>