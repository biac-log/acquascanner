import { MutationTree } from 'vuex';
import * as c from './const';
import { AuthentificationState } from './types';

export const mutations: MutationTree<AuthentificationState> = {
    [c.AUTH_REQUEST]: (state) => {
        state.status = "loading";
    },
    [c.AUTH_SUCCESS]: (state, resp) => {
        var dateExpire: string = ((resp.expires_in + Date.now()).toString());
        localStorage.setItem("user-token", resp.value);
        localStorage.setItem("token-expire", dateExpire);
        state.token = resp.value;
        state.expire = dateExpire;
        state.status = "success";
        state.hasLoadedOnce = true;
    },
    [c.AUTH_ERROR]: (state) => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [c.AUTH_LOGOUT]: (state, rootstate) => {
        localStorage.removeItem("user-token");
        state.token = "";
        localStorage.removeItem("token-expire");
        state.expire = "";
    },
};

