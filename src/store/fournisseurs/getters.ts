import { GetterTree } from 'vuex';
import { FournisseurState } from './types';
import { RootState } from '../types';
import { Compte } from '@/data/Compte';

export const getters: GetterTree<FournisseurState, RootState> = {
    getFournisseurs(state): Compte[] {
        return state.fournisseurs;
    },
    countFournisseurs: (state): number | undefined => {
        if (state.fournisseurs) {
            return state.fournisseurs.length;
        } else { return 0; }
    },
    loading(state): boolean {
        return state.loading;
    },
    getFournisseurName(state){
        return state.fournisseurName1;
    }
}