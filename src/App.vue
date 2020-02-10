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
    <v-app-bar app v-else-if="modeIsDefined" :color="modeColor">
      <router-link to="/" black>
        <v-btn icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <v-spacer />
      <v-toolbar-title class="text-uppercase" short>
        <router-link to="/" black>
          <span class="font-weight">{{modeLibelle}}</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <div v-if="modeLibelle!='Commande'">
        <v-btn
          icon
          color="green darken-1"
          @click.stop="sendArticlesDialog = !sendArticlesDialog"
          v-if="isAuthenticated"
          :disabled="articlesScan.length === 0"
          :loading="loadingSendArticleScan"
        >
          <v-icon>mdi-file-document-box-check-outline</v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          icon
          color="green darken-1"
          @click.stop="SendCommande();"
          v-if="isAuthenticated"
          :disabled="articlesScan.length === 0"
          :loading="loadingSendArticleScan"
        >
          <v-icon>mdi-email</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-app-bar app v-else>
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

    <v-content>
      <v-alert
        :value="errorMessage != ''"
        type="warning"
        border="left"
        class="mt-5 ml-5 mr-5"
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
import ScanArticle from "./components/ScanArticle.vue";
import { ScanMode } from "./data/ScanMode";

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
  private drawer: boolean = false;
  private miniVariant: boolean = false;
  private clipped: boolean = true;
  private sendArticlesDialog: boolean = false;
  private currentMode?: ScanMode = undefined;
  private InventaireDialog: boolean = false;

  @Action("displaySuccessMessage", { namespace: "articles" })
  private actionDisplaySuccessMessage: any;

  @Getter("modeModule/modeIsDefined")
  private modeIsDefined!: boolean;
  @Getter("modeModule/getColor")
  private modeColor!: string;
  @Getter("modeModule/getLibelle")
  private modeLibelle!: string;

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

  public logout() {
    this.$store.dispatch("authentificationModule/" + AUTH_LOGOUT).then(() => {
      this.$router.push("/login");
    });
  }

  private created() {
    this.$store.dispatch("articles/initialiseArticleScan");
    this.$store.dispatch("articles/initAllArticlesFromLocalStorage");
    this.$router.afterEach((to, from) => {
      this.$store.commit("modeModule/changeCurrentMode", this.$route.name);
    });
  }

  private showSendArticleDialog(value: boolean) {
    this.sendArticlesDialog = value;
  }

  public SendListArticle() {
    //this.articlesScan= ['1','2','3','4'];
  }
}
</script>

<style>
a {
  color: black !important; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
</style>