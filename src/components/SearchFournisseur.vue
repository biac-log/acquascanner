<template>
   <v-container class="pa-0 ma-0">
     <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Recherche fournisseur"
          single-line
          hide-details
          clearable
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="fournisseurs"
        :items-per-page="30"
        :loading="loading"
        :search="search"
        :mobile-breakpoint="300"
        disable-sort
        @click:row="selectFournisseur"
        class="elevation-1"
        no-data-text="La liste est vide"
        :footer-props="{ 'items-per-page-options': [10, 25, 50],
                      	 'items-per-page-text': ''}"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.numero }}</td>
          <td>{{ props.item.nom }}</td>
        </template>
      </v-data-table>
      <v-alert :value="errorMessage != ''" type="warning" border="left">{{ errorMessage }}</v-alert>
    </v-card> 
  </v-container>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue, Emit } from "vue-property-decorator";
import {Route} from "vue-router"
import axios from 'axios';
import {Compte} from '../data/Compte'
import {fournisseursModule} from '../store/fournisseurs'

@Component({})
export default class SearchFournisseur extends Vue {

  @Getter("fournisseursModule/getFournisseurs")
  private fournisseurs!: Compte[];
  @Getter("loading", { namespace: "articles" })
  private loading!: boolean;
  @Getter("errorMessage", { namespace: "articles" })
  private errorMessage!: string;

private created() {
      this.$store.commit("fournisseursModule/initAllFournisseurs");
  }

private search: string ="";
  private headers = [
    { text: "Numero", value: "numero" },
    { text: "Nom", value: "nom1"},
  ];


  @Emit("elementClick")
  private selectFournisseur(fournisseur: Compte) {
    let name:string[] = [];
    name.push(fournisseur.nom1);
    name.push(fournisseur.nom2);
    name.push(fournisseur.nom3);
    this.$store.commit("fournisseursModule/setFournisseurName", name);
    this.$router.push("/Commande");
  }
  // private fournisseurs = refreshFournisseur();

  // ]

}
</script>

