<template>
  <v-app>
    <v-app-bar app v-if="this.$route.name === 'Main'">
      <v-btn @click="logout" icon>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="text-uppercase" short>
        <span>AcQua</span>
        <span class="font-weight-light">Scanner</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon to="/options">
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar app v-else-if="modeIsDefined" :color="modeColor" dark>
      <router-link to="/">
        <v-btn icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <v-spacer />
      <v-toolbar-title short v-if="modeLibelle === 'Commande'" name="Commande" dark>
        <router-link class="router-link-white" to="ChoixFournisseur">
          <div class="font-weight text-center headline">{{modeLibelle}}</div>
          <div class="subtitle-2 text-center">{{fournisseurName}}</div>
        </router-link>
      </v-toolbar-title>
      <v-toolbar-title name="other" short v-else>
        <div class="font-weight text-center headline">{{modeLibelle}}</div>
      </v-toolbar-title>
      <v-spacer />
      <div
        v-if="modeLibelle!='Commande' && modeLibelle!='Etiquettes' && modeLibelle!='ChoixFournisseur'"
      >
        <v-btn
          icon
          @click.stop="sendArticlesDialog = !sendArticlesDialog"
          :disabled="articlesScan.length === 0"
          :loading="loadingSendArticleScan"
        >
          <v-icon>mdi-file-document-box-check-outline</v-icon>
        </v-btn>
      </div>
      <div v-else-if="modeLibelle =='ChoixFournisseur'">
        <v-btn icon @click="refreshFournisseurs()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </div>
      <div v-else-if="modeLibelle =='Commande'">
        <v-btn
          icon
          @click.stop="sendArticlesCommande()"
          :disabled="articlesScan.length === 0"
          :loading="loadingSendArticleScan"
        >
          <v-icon>mdi-truck</v-icon>
        </v-btn>
      </div>
      <div v-else-if="modeLibelle === 'Etiquettes'">
        <v-btn
          icon
          @click.stop="printEtiquettes"
          :disabled="articlesScan.length === 0"
          :loading="loadingSendArticleScan"
        >
          <v-icon>mdi-printer-wireless</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-app-bar app v-else-if="this.$route.name === 'Options'">
      <router-link to="/" black>
        <v-btn icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <v-spacer />
      <v-toolbar-title class="text-uppercase" short>
        <router-link to="/" black>
          <span>AcQua</span>
          <span class="font-weight-light">Scanner</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-spacer />
    </v-app-bar>
    <v-app-bar app v-else-if="this.$route.name === 'Login'" color="blue">
      <v-spacer />
      <v-toolbar-title short>
        <span>Connexion</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-content>
      <v-alert
        :value="errorMessage != ''"
        type="warning"
        border="left"
        class="mt-2 ml-3 mr-3 mb-n1"
      >{{ errorMessage }}</v-alert>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-content>

    <v-dialog v-model="sendArticlesDialog" max-width="290">
      <SendArticles @showSendArticleDialog="showSendArticleDialog" />
    </v-dialog>
    <v-snackbar v-model="displaySuccessMessage" color="success" :timeout="5000">
      {{ successMessage }}
      <v-btn dark text @click="displaySuccessMessage = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ScanArticles from "./components/ScanArticles.vue";
import SendArticles from "./components/SendArticles.vue";
import Article from "./data/Article.vue";
import { State, Action, Getter, namespace } from "vuex-class";
import { AUTH_LOGOUT } from "./store/authentification/const";
import { modes } from "./store/modes/const";
import SearchFournisseur from "./components/SearchFournisseur.vue";
import ScanArticle from "./components/ScanArticle.vue";
import { ScanMode } from "./data/ScanMode";
import { articles } from "./store/articles";
import { actions } from "./store/articles/actions";
import Axios from "axios";

@Component({
  components: { ScanArticles, SendArticles }
})
export default class App extends Vue {
  get displaySuccessMessage() {
    return this.$store.state.articles.displaySuccessMessage;
  }
  set displaySuccessMessage(value: boolean) {
    this.actionDisplaySuccessMessage(value);
  }
  private sendFournisseurDialog: boolean = true;
  private drawer: boolean = false;
  private miniVariant: boolean = false;
  private clipped: boolean = true;
  private sendArticlesDialog: boolean = false;
  private currentMode?: ScanMode = undefined;
  private InventaireDialog: boolean = false;
  private colorButton: string = "black";

  @Action("displaySuccessMessage", { namespace: "articles" })
  private actionDisplaySuccessMessage: any;

  @Getter("modeModule/modeIsDefined")
  private modeIsDefined!: boolean;
  @Getter("modeModule/getColor")
  private modeColor!: string;
  @Getter("modeModule/getLibelle")
  private modeLibelle!: string;
  @Getter("modeModule/getLastPage")
  private modeLastPage!: string;

  @Getter("fournisseursModule/getFournisseurName")
  private fournisseurName!: string;

  @Getter("loadingSendArticleScan", { namespace: "articles" })
  private loadingSendArticleScan!: boolean;
  @Getter("successMessage", { namespace: "articles" })
  private successMessage!: string;
  @Getter("articlesScan", { namespace: "articles" })
  private articlesScan!: Article[];
  @Getter("errorMessage", { namespace: "articles" })
  private errorMessage!: string;
  @Getter("isAuthenticated", { namespace: "authentificationModule" })
  private isAuthenticated!: boolean;

  @Action("sendArticlesCommande", { namespace: "articles" })
  private sendArticlesCommande: any;
  @Action("articles/PrintEtiquettes")
  private printEtiquettes: any;
  @Action("fournisseursModule/refreshFournisseurs")
  private refreshFournisseurs: any;

  public logout() {
    this.$store.dispatch("authentificationModule/" + AUTH_LOGOUT).then(() => {
      this.$router.push("/login");
    });
  }

  private created() {
    window.scrollTo(0, 0);
    this.$store.dispatch("articles/initialiseArticleScan");
    this.$store.dispatch("articles/initAllArticlesFromLocalStorage");
    if (localStorage.getItem("articles")) this.$router.push(this.modeLastPage);
    this.$store.commit("modeModule/changeCurrentMode", this.$route.name);

    this.$router.afterEach((to, from) => {
      this.$store.commit("modeModule/changeCurrentMode", this.$route.name),
        localStorage.setItem(
          "LastPage",
          this.$route.name ? this.$route.name : ""
        ),
        this.$store.commit("articles/setErrorMessage", "");
    });
  }

  private showSendArticleDialog(value: boolean) {
    this.sendArticlesDialog = value;
  }

  private sendFournisseur() {
    this.$route.name = "/choixFourniseur";
  }
}
</script>

<style>
a {
  color: black !important; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
.router-link-white {
  color: white !important; /* blue colors for links too */
}
</style>
