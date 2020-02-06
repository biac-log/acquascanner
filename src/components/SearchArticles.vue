<template>
  <v-container class="pa-0 ma-0">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          clearable
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="articles"
        :items-per-page="10"
        :loading="loading"
        :search="search"
        :mobile-breakpoint="300"
        :custom-filter="customFilter"
        disable-sort
        @click:row="sendArticle"
        class="elevation-1"
        no-data-text="La liste est vide"
        :footer-props="{ 'items-per-page-options': [10, 25, 50],
                      	 'items-per-page-text': ''}"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.Code }}</td>
          <td v-if="!$vuetify.breakpoint.smAndDown">{{ props.item.CodeEAN }}</td>
          <td>{{ props.item.Libelle }}</td>
          <td>{{ props.item.ReferenceFournisseur }}</td>
        </template>
      </v-data-table>
      <v-alert :value="errorMessage != ''" type="warning" border="left">{{ errorMessage }}</v-alert>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue, Emit } from "vue-property-decorator";
import { Article } from "../data/Article";

@Component({})
export default class SearchArticles extends Vue {
  @Getter("articles", { namespace: "articles" })
  private articles!: Article[];
  @Getter("loading", { namespace: "articles" })
  private loading!: boolean;
  @Getter("errorMessage", { namespace: "articles" })
  private errorMessage!: string;

  private search: string = "";
  private headers = [
    { text: "Code", value: "Code" },
    { text: "Libelle", value: "Libelle" },
    { text: "Ref.", value: "ReferenceFournisseur" },
  ];

  // On passe dans le filtre pour chaques valeurs présente dans chaques row
  // on test en même temps le codeEAN non affiché
  public customFilter(value: string, search: string, item: Article) {
    return (
      search != null &&
      item != null &&
      value != null &&
      item.CodeEAN != null &&
      item.ReferenceFournisseur != null &&
      (value
        .toString()
        .toUpperCase()
        .indexOf(search.toUpperCase()) !== -1 ||
        item.CodeEAN.toString()
          .toUpperCase()
          .indexOf(search.toUpperCase()) !== -1 ||
        item.ReferenceFournisseur.toString()
          .toUpperCase()
          .indexOf(search.toUpperCase()) !== -1)
    );
  }

  @Emit("elementClick")
  private sendArticle(article: Article) {
    return article;
  }
}
</script>
