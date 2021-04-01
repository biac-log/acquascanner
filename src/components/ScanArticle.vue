<template>
<v-container>
  <v-dialog
    v-model="showDialog"
    eager
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="showDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Article</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="printEtiquettes">
          <v-icon color="white">mdi-printer-wireless</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-row dense>
            <v-col cols="5">
              <v-text-field
                label="Code"
                v-model="code"
                :rules="codeRules"
                @keypress.enter.prevent="addArticle"
                readonly
                dense
                class="mr-5"
                hide-details
              />
            </v-col>
            <v-col cols="7">
              <v-text-field
                label="CodeEAN"
                v-model="codeEAN"
                @keypress.enter.prevent="addArticle"
                readonly
                dense
                hide-details
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-textarea
                label="Nom"
                v-model="nom"
                :rules="nameRules"
                @keypress.enter.prevent="addArticle"
                readonly
                auto-grow
                rows="1"
                dense
                class="mt-3"
                hide-details
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Reference Fournisseur"
                v-model="ReferenceFournisseur"
                @keypress.enter.prevent="addArticle"
                readonly
                auto-grow
                rows="1"
                dense
                hide-details
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                label="Quantité"
                class="mr-2"
                v-model="quantite"
                :rules="quantiteRules"
                ref="quantiteElement"
                type="number"
                dense
                @focus="$event.target.select()"
                @keypress.enter.prevent="addArticle"
              />
            </v-col>
            <v-col cols="3" v-if="isEdit">
              <v-text-field
                label="À ajouter"
                v-model="quantiteAdd"
                :rules="quantiteAddRules"
                ref="quantiteAddElement"
                type="number"
                dense
                @focus="$event.target.select()"
                @keypress.enter.prevent="addArticle"
              />
            </v-col>
            <v-col cols="auto" class="d-flex">
              <span class="align-self-top mx-2">
                <v-btn color="success" @click="addArticle" :disabled="!valid">
                  <v-icon>mdi-check</v-icon>
                  <div v-if="!isEdit">Valider</div>
                </v-btn>
              </span>
              <span class="align-self-top">
                <v-btn color="error" @click="deleteArticle">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </span>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
    <v-dialog v-model="sendPrinterDialog" max-width="450">
      <SendPrinter ref="SendPrinterWindow" :window.sync="sendPrinterDialog" @showSendPrinterDialog="showSendPrinterDialog" />
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue, Emit, PropSync, Prop } from "vue-property-decorator";
import { Article } from "../data/Article";
import  SendPrinter  from "@/components/SendPrinter.vue";
import axios from "axios";
import { Ref } from 'vue-property-decorator';

@Component({ components: { SendPrinter }})
export default class ScanArticle extends Vue {
  
  @PropSync("window")
  public showDialog!: boolean;
  private sendPrinterDialog: boolean = false;
  public valid: boolean = false;
  public code: string = "";
  public codeRules = [(v: any) => !!v || "Le code est obligatoire"];
  public codeEAN: string = "";
  public nom: string = "";
  public nameRules = [(v: any) => !!v || "Le nom est obligatoire"];
  public ReferenceFournisseur: string = "";

  public quantite: string = "";
  public quantiteRules = [
    (v: string) => !!v || "La quantité est obligatoire",
    (v: string) =>
      Number.isInteger(Number.parseInt(v)) || "La quantité doit être un entier",
  ];

  public quantiteAdd: string = "";
  public quantiteAddRules = [
    (v: string) =>
      !!v ||
      v === "" ||
      Number.isInteger(Number.parseInt(v)) ||
      "La quantité doit être un entier",
  ];
  private isEdit: boolean = false;
  @Action("addArticleScan", { namespace: "articles" })
  private addArticleScan: any;
  @Action("removeArticleScan", { namespace: "articles" })
  private removeArticleScan: any;

  private selectedArticle!: Article;

  public focusQuantite() {
    if (this.isEdit) {
      this.$nextTick(() => (this.$refs.quantiteAddElement as any).focus());
    } else {
      this.$nextTick(() => (this.$refs.quantiteElement as any).focus());
    }
  }

  public editArticle(article: Article) {
    this.selectedArticle = article;
    if (article) {
      this.code = article.Code;
      this.codeEAN = article.CodeEAN;
      this.nom = article.Libelle;
      this.ReferenceFournisseur = article.ReferenceFournisseur;
      if (article.Quantite) {
        this.isEdit = true;
        this.quantite = article.Quantite.toString();
      } else {
        this.isEdit = false;
        this.quantite = "";
      }
    }
  }

  @Emit("actionPerform")
  private addArticle() {
    if (this.valid) {
      const article: Article = this.GetArticle();
      article.Quantite = Number.parseFloat(this.quantite);

      if (this.quantiteAdd || this.quantiteAdd !== "") {
        article.Quantite += Number.parseFloat(this.quantiteAdd);
        if (article.Quantite < 0) article.Quantite = 0;
      }
      this.addArticleScan(article);
      this.clearData();
    }
  }

  @Emit("actionPerform")
  private deleteArticle() {
    if (confirm("Voulez vous supprimer l'article ?")) {
      this.quantite = "0";
      this.removeArticleScan(this.code);
    }
    this.clearData();
  }

  private printEtiquettes() {
    this.showSendPrinterDialog(true);
   this.$nextTick(() =>((this.$refs.SendPrinterWindow as SendPrinter).SetArticle(this.selectedArticle)));
  }

  private GetArticle(): Article {
    const article: Article = new Article();
    article.Code = this.code;
    article.CodeEAN = this.codeEAN;
    article.Libelle = this.nom;
    article.ReferenceFournisseur = this.ReferenceFournisseur;
    return article;
  }

  private clearData() {
    this.code = "";
    this.codeEAN = "";
    this.nom = "";
    this.quantite = "";
    this.quantiteAdd = "";
    this.ReferenceFournisseur = "";
  }

  private showSendPrinterDialog(value: boolean) {
    this.sendPrinterDialog = value;
  }
}
</script>
