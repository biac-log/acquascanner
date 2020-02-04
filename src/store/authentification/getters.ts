import { GetterTree } from 'vuex';
import { AuthentificationState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<AuthentificationState, RootState> = {
    isAuthenticated(state) {
        var result = !!state.token;
        return result;
    },
    authStatus(state) {
        return state.status;
    }
};