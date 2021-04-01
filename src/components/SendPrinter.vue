<template>
  <v-card>
    <v-card-title class="headline">Impression des étiquettes</v-card-title>
    <v-card-text>Veuillez selectionner l'imprimante à utiliser</v-card-text>
    <v-select
      class="ml-5 mr-5 mb-5"
      :items="printers"
      v-model="printerSelected"
      item-text="DisplayName"
      label="Sélectionner l'imprimante"
      return-object
      hide-details
      solo
    ></v-select>
    <v-card-actions>
      <v-btn icon @click="ValidPrint" class="mx-auto">
        <v-icon color="black">mdi-printer-check</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue, Emit, PropSync } from "vue-property-decorator";
import { Route } from "vue-router";
import axios from "axios";
import { Printer } from "../data/Printer";
import { Article } from "@/data/Article";
import { PrintArticle } from "@/data/PrintArticle";

@Component({})
export default class SendPrinter extends Vue {
  @Action("refreshPrinters", { namespace: "printers" })
  private refreshPrinters: any;
  @Getter("printers", { namespace: "printers" })
  private printers!: Printer[];
  private printerSelected: Printer | null = null;
  public article!: Article;
  private resolve!: any;
  private reject!: any;

  private mounted() {
    this.loadAllImprimantes();
  }
  private loadAllImprimantes() {
    this.refreshPrinters();
  }
  private closeWindow() {
    this.$emit("showSendPrinterDialog", false);
  }
  private ValidPrint() {
    console.log(this.article);
    if (this.printerSelected && this.article) {
      let printArticle = new PrintArticle();
      printArticle.CodeEAN = this.article.CodeEAN;
      printArticle.Quantite = 1;
      printArticle.PrinterName = this.printerSelected.PrinterNameBarcode;
      this.$store.dispatch("articles/PrintEtiquettes", printArticle);
      this.closeWindow();
    }
  }
  public SetArticle(article: Article) {
    this.article = article;
  }
}
</script>
