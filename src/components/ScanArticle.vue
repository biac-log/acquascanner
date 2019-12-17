<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row no-gutters>
        <v-col cols="5">
          <v-text-field
            label="Code"
            v-model="code"
            :rules="codeRules"
            @keypress.enter.prevent="addArticle"
            readonly
            dense
            class="mr-5"
          />
        </v-col>
        <v-col cols="7">
          <v-text-field
            label="CodeEAN"
            v-model="codeEAN"
            @keypress.enter.prevent="addArticle"
            readonly
            dense
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
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
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-textarea
            label="Reference Fournisseur"
            v-model="ReferenceFournisseur"
            @keypress.enter.prevent="addArticle"
            readonly
            auto-grow
            rows="1"
            dense
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
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
        <v-col cols="auto">
          <div class="d-inline float-right align-end flex-column">
            <v-btn color="error" @click="deleteArticle">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </div>
          <div class="d-inline float-right mr-2 align-end flex-column">
            <v-btn color="success" @click="addArticle" :disabled="!valid" >
              <v-icon>mdi-check</v-icon>
              <div v-if="!isEdit">Valider</div>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue, Emit } from "vue-property-decorator";
import { Article } from "../data/Article";

@Component({})
export default class ScanArticle extends Vue {
  public valid: boolean = false;
  public code: string = "";
  public codeRules = [(v: any) => !!v || "Le code est obligatoire"];
  public codeEAN: string = "";
  public nom: string = "";
  public nameRules = [(v: any) => !!v || "Le nom est obligatoire"];
  public ReferenceFournisseur : string = ""

  public quantite: string = "";
  public quantiteRules = [
    (v: string) => !!v || "La quantité est obligatoire",
    (v: string) =>
      Number.isInteger(Number.parseInt(v)) || "La quantité doit être un entier"
  ];

  public quantiteAdd: string = "";
  public quantiteAddRules = [
    (v: string) =>
      !!v ||
      v === "" ||
      Number.isInteger(Number.parseInt(v)) ||
      "La quantité doit être un entier"
  ];
  private isEdit: boolean = false;
  @Action("addArticleScan", { namespace: "articles" })
  private addArticleScan: any;
  @Action("removeArticleScan", { namespace: "articles" })
  private removeArticleScan: any;

  public focusQuantite() {
    if (this.isEdit) {
      this.$nextTick(() => (this.$refs.quantiteAddElement as any).focus());
    } else {
      this.$nextTick(() => (this.$refs.quantiteElement as any).focus());
    }
  }

  public editArticle(article: Article) {
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
      const article: Article = new Article();
      article.Code = this.code;
      article.CodeEAN = this.codeEAN;
      article.Libelle = this.nom;
      article.ReferenceFournisseur = this.ReferenceFournisseur;
      article.Quantite = Number.parseFloat(this.quantite);

      if (this.quantiteAdd || this.quantiteAdd != "") {
        article.Quantite += Number.parseFloat(this.quantiteAdd);
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

  private clearData() {
    this.code = "";
    this.codeEAN = "";
    this.nom = "";
    this.quantite = "";
    this.quantiteAdd = "";
    this.ReferenceFournisseur = "";
  }
}
</script>
