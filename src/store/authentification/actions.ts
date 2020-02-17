import { ActionTree } from 'vuex';
import axios from 'axios';
import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
} from './const';
import { Token } from '../../data/Token';
import { AuthentificationState } from './types';
import { RootState } from '../types';
import { Login } from '../../data/Login';


export const actions: ActionTree<AuthentificationState, RootState> = {
    [AUTH_REQUEST]({ commit, dispatch, state }, user: any) {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);

            const login: Login = {
                userName: user.username,
                password: user.password,
            };

            axios.post<Token>(process.env.VUE_APP_ApiAuth + "/Authentication/Login", login)
                .then((resp) => {
                    commit(AUTH_SUCCESS, resp.data);
                    resolve(resp);
                })
                .catch((err) => {
                    commit(AUTH_ERROR, err);
                    let errorMessage: string = "Impossible de se connecter au serveur d'authentification";
                    if (err.response && err.response.status === 400) {
                        errorMessage = err.response.data.Message;
                    }
                    reject(errorMessage);
                });

        });
    },
    [AUTH_LOGOUT]({ commit }) {
        return new Promise((resolve) => {
            commit(AUTH_LOGOUT);
            commit("UserModule/CleanUser", null, { root: true });
            resolve();
        });
    },
};
