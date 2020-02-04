import { MutationTree } from 'vuex';
import * as c from './const';
import { AuthentificationState } from './types';

export const mutations: MutationTree<AuthentificationState> = {
    [c.AUTH_REQUEST]: state => {
        state.status = "loading";
    },
    [c.AUTH_SUCCESS]: (state, resp) => {
        state.status = "success";
        state.token = resp;
        state.hasLoadedOnce = true;
    },
    [c.AUTH_ERROR]: state => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [c.AUTH_LOGOUT]: state => {
        state.token = "";
    }
};