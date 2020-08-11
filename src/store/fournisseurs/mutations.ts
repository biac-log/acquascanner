import { MutationTree } from 'vuex';
import { FournisseurState } from './types';
import { Compte } from '@/data/Compte';

export const mutations: MutationTree<FournisseurState> = {
  refreshFournisseurs(state, fournisseurs: Compte[]) {
    state.fournisseurs = fournisseurs;
    let strings: string = '';
    fournisseurs.forEach(function (compte) {
      strings += `${compte.nom}#${compte.nom2}#${compte.nom3}#${compte.numero.toString()}§`;
    });

    localStorage.setItem("allFournisseurs", strings);
  },
  initAllFournisseurs(state) {
    const allFournisseursFromLocal = localStorage.getItem("allFournisseurs");
    const fournisseurs: Compte[] = [];
    if (allFournisseursFromLocal) {
      const rows = allFournisseursFromLocal.split('§');
      rows.forEach(function (row) {
        if (row != "") {
          const element = row.split('#');
          const fourn: Compte = new Compte();
          fourn.nom = element[0];
          fourn.nom2 = element[1];
          fourn.nom3 = element[2];
          fourn.numero = Number(element[3]);
          fournisseurs.push(fourn);
        }
      });
    }
    state.fournisseurs = fournisseurs;
  },
  setLoading(state, isLoading: boolean) {
    state.loading = isLoading;
  },
  setFournisseurName(state, name: string[]) {
    if (name.length > 0) {
      state.fournisseurName1 = name[0];
      if (name.length > 1) state.fournisseurName2 = name[1];
      if (name.length > 2) state.fournisseurName3 = name[2];
    }
  },
  setFournisseurNumero(state, numero:number){
    state.fournisseurNumero = numero;
  },
  clearCurrentFournisseur(state){
    state.fournisseurName1 = "";
    state.fournisseurName2 = "";
    state.fournisseurName3 = "";
    state.fournisseurNumero = 0;
  },
  clearFournisseurs(state) {
    state.loading = false;
    state.fournisseurs = []
    localStorage.removeItem("allFournisseurs");
  },
}