import { GetterTree } from 'vuex';
import { AuthentificationState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<AuthentificationState, RootState> = {
    isAuthenticated(state) {
        const result = !!state.token;
        return result;
    },
    authStatus(state) {
        return state.status;
    },
};
