<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12" :loading="loading" :readonly="loading">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Connexion</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Utilisateur"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="username"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Mot de passe"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="login">Se connecter</v-btn>
                </v-card-actions>

                <v-card-text v-if="errorMessage != ''">
                  <v-alert type="warning">{{ errorMessage }}</v-alert>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang='ts'>
import { State, Action, Getter } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { AUTH_REQUEST } from "../store/authentification/const";

@Component({})
export default class Login extends Vue {
  public username: string = "";
  public password: string = "";
  public loading: Boolean = false;
  public errorMessage: string = "";

  public login() {
    this.loading = true;
    this.errorMessage = "";
    const { username, password } = this;
    this.$store
      .dispatch("authentificationModule/" + AUTH_REQUEST, {
        username,
        password,
      })
      .then(() => {
        this.$router.push("/");
      })
      .catch((reaseon) => {
        this.errorMessage = reaseon;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>