import { GetterTree } from 'vuex';
import { AuthentificationState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<AuthentificationState, RootState> = {

    isAuthenticated: (state) => () => {
        let result = !!state.token;
        if (result) result = Number(state.expire) > Date.now();
        return result;
    },
    authStatus(state) {
        return state.status;
    },
    getToken(state) {
        return state.token;
    },
};
