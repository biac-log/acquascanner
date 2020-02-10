import { Module } from 'vuex';
import { getters } from './getters';
import { mutations } from './mutations';
import { ModeState } from './types';
import { RootState } from '../types';

export const state: ModeState = {
    currentMode: undefined
};

const namespaced: boolean = true;

export const modeModule: Module<ModeState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
};
