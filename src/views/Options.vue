<template>
	<v-container>
		<v-btn block color="error" @click="clearData()" dark>Réinitialiser</v-btn>
	</v-container>
</template>

<script lang="ts">
import { State, Action, Getter } from "vuex-class";
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({})
export default class Options extends Vue {
  @Action("clearAll", { namespace: "articles" })
  private clearAll: any;

  private clearData() {
    if (
      confirm(
        "Voulez réinitialiser l'application ? toutes les données seront perdues. "
      )
    ) {
      this.clearAll();
    }
  }
}
</script>