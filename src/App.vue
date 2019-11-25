<template>
  <v-app>
    <v-app-bar app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" black>
          <span>AcQua</span>
          <span class="font-weight-light">Scanner</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon color="green darken-1" 
             @click.stop="sendArticlesDialog = !sendArticlesDialog" 
             :disabled="articlesScan.length === 0"
             :loading="loadingSendArticleScan">
        <v-icon>mdi-file-document-box-check-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-alert :value="errorMessage != ''" type="warning" border="left" class="mt-5 ml-5 mr-5">{{ errorMessage }}</v-alert>
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
import { Component, Vue } from 'vue-property-decorator';
import ScanArticles from "./components/ScanArticles.vue";
import SendArticles from "./components/SendArticles.vue";
import Article from "./data/Article.vue";
import { State, Action, Getter } from "vuex-class";

  @Component({
    components: { ScanArticles, SendArticles },
  })
 export default class App extends Vue {
    private drawer: boolean = false;
    private miniVariant: boolean = false;
    private clipped: boolean = true;
    private sendArticlesDialog: boolean = false;
    private items = [
       { title: "Scanning", icon: "mdi-barcode-scan", link: "/" },
       { title: "Settings", icon: "mdi-settings", link: "/Options" }
    ];

    @Action('displaySuccessMessage', { namespace: 'articles' })
    private actionDisplaySuccessMessage: any;
    @Getter('loadingSendArticleScan', { namespace: 'articles' })
    private loadingSendArticleScan!: boolean;
    @Getter('successMessage', { namespace: 'articles' })
    private successMessage!: string;
    @Getter('articlesScan', { namespace: 'articles' })
    private articlesScan!: Article[];
    @Getter('errorMessage', { namespace: 'articles' })
    private errorMessage!: string;

    get displaySuccessMessage() {
      return this.$store.state.articles.displaySuccessMessage;
    }
    set displaySuccessMessage(value: boolean) {
      this.actionDisplaySuccessMessage(value);
    }

    private created(){
     this.$store.dispatch("articles/initialiseArticleScan");
     this.$store.dispatch("articles/initAllArticlesFromLocalStorage");
    }

    private showSendArticleDialog(value: boolean){
      this.sendArticlesDialog = value;
    }
 }
</script>

<style>
a {
  color: black !important; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
</style>