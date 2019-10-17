<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row no-gutters>
        <v-col cols="6">
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
        <v-col cols="6">
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
        <v-col cols="4">
          <v-text-field
            label="Quantité"
            v-model="quantite"
            :rules="quantiteRules"
            ref="quantiteElement"
            type="number"
            dense
            @focus="$event.target.select()"
            @keypress.enter.prevent="addArticle"
          />
        </v-col>
        <v-col cols="8">
          <div class="d-inline float-right align-end flex-column">
            <v-btn color="error" @click="deleteArticle">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </div>
          <div class="d-inline float-right mr-2 align-end flex-column">
            <v-btn color="success" @click="addArticle" :disabled="!valid">
              <v-icon>mdi-check</v-icon>Valider
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { State, Action, Getter } from 'vuex-class';
import { Component, Vue, Emit } from "vue-property-decorator";
import { Article } from "../data/Article";

@Component({})
export default class ScanArticle extends Vue {
  valid: boolean = false;
  code: string = "";
  codeRules = [(v: any) => !!v || "Le code est obligatoire"];
  codeEAN: string = "";
  nom: string = "";
  nameRules = [(v: any) => !!v || "Le nom est obligatoire"];
  quantite: string = "";
  quantiteRules = [
    (v: string) => !!v || "La quantité est obligatoire",
    (v: string) =>
      Number.isInteger(Number.parseInt(v)) || "La quantité doit être un entier"
  ];

  @Action('addArticleScan', { namespace: "articles" })
  private addArticleScan: any;
  @Action('removeArticleScan', { namespace: "articles" })
  private removeArticleScan: any;

  public focusQuantite() {
    this.$nextTick(() => (this.$refs.quantiteElement as any).focus());
  }

  public editArticle(article: Article) {
    if (article) {
      this.code = article.Code;
      this.codeEAN = article.CodeEAN;
      this.nom = article.Libelle;
      if (article.Quantite) this.quantite = article.Quantite.toString();
      else this.quantite = "";
    }
  }

  @Emit('actionPerform')
  private addArticle() {
    if (this.valid) {
      let article: Article = new Article();
      article.Code = this.code
      article.CodeEAN = this.codeEAN;
      article.Libelle = this.nom;
      article.Quantite = Number.parseInt(this.quantite);

      this.addArticleScan(article);
      this.clearData();
    }
  }

  @Emit('actionPerform')
  private deleteArticle() {
    if (confirm("Voulez vous supprimer l'article ?")) 
    {
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
  }
}
</script>
