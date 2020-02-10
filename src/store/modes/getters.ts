import { GetterTree } from 'vuex';
import { ModeState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<ModeState, RootState> = {
    modeIsDefined(state): boolean {
        if (state.currentMode)
            return true;
        else return false
    },
    getColor(state): string {
        if (state.currentMode)
            return state.currentMode.color;
        return '';
    },
    getLibelle(state): string {
        if (state.currentMode)
            return state.currentMode.libelle;
        return '';
    },
    getDestination(state): string {
        if (state.currentMode)
            return state.currentMode.destination;
        return '';
    }
};