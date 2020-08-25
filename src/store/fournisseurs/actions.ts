import { ActionTree } from 'vuex';
import axios from 'axios';
import { FournisseurState } from './types';
import { RootState } from '../types';
import { JsonConvert, ValueCheckingMode } from "json2typescript";
import { Compte } from '@/data/Compte';


export const actions: ActionTree<FournisseurState, RootState> = {
  refreshFournisseurs({ commit }) {
    commit('setLoading', true);
    let fournisseurs: Compte[] = [];
    axios.get<Compte[]>(`${process.env.VUE_APP_ApiArticle}/Fournisseurs/AllForAcQuaScanner`)
      .then((response) => {
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        fournisseurs = jsonConvert.deserializeArray(response.data, Compte);
        commit('articles/setErrorMessage', '', { root: true });
      })
      .catch((e) => {
        commit('articles/setErrorMessage', e.message + ' ' + process.env.VUE_APP_ApiArticle, { root: true });
      }).finally(() => {
        if (fournisseurs) {
          commit('refreshFournisseurs', fournisseurs);
        }
        commit('setLoading', false);
      });
  },
  initAllFournisseurs({ commit }): any {
    commit('initAllFournisseurs');
  },
  clearAll({ commit }): any {
    commit('clearCurrentFournisseur');
    commit('clearFournisseurs');
  },
}

