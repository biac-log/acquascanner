<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" md="4" v-for="i in getModesAuthorized()" :key="i.key">
        <v-card dark>
          <v-list :color="i.color" class="py-0">
            <v-list-item :to="i.destination">
              <v-list-item-avatar>
                <v-icon>{{i.icon}}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content v-if="i.libelle == 'Choix Fournisseur'">Commande</v-list-item-content>
              <v-list-item-content v-else>{{i.libelle}}</v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-arrow-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <!-- <v-col cols="12" md="4">
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-alarm</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>Inventaire</v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-arrow-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-alarm</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>Inventaire</v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-arrow-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>-->
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue, Emit } from "vue-property-decorator";
import { ScanMode } from "../data/ScanMode";
import { modes } from "../store/modes/const";

@Component({})
export default class ScanModes extends Vue {
  
  @Getter("UserModule/getDroits")
  private droits!: string[];

  private created(){
    window.scrollTo(0, 0);
  }

  private getModesAuthorized(): ScanMode[] {
    var result: ScanMode[] = [];
    modes.forEach(e => {
      if (
        e.permissionId === "Always" ||
        (this.droits !== null && this.droits.includes(e.permissionId))
      )
        result.push(e);
    });
    return result;
  }
}
</script>

