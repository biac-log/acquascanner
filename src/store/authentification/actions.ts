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
import { JsonConvert, ValueCheckingMode } from "json2typescript";


export const actions: ActionTree<AuthentificationState, RootState> = {
    [AUTH_REQUEST]({ commit, dispatch }, user: any) {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);

            const login: Login = {
                userName: user.username,
                password: user.password,
            };

            axios.post<Token>(process.env.VUE_APP_ApiAuth + "/Authentication/Login", login)
                .then((resp) => {
                    localStorage.setItem("user-token", resp.data.value);
                    // Here set the header of your ajax library to the token value.
                    // example with axios
                    commit(AUTH_SUCCESS, resp.data);
                    // dispatch(USER_REQUEST);
                    resolve(resp);
                })
                .catch((err) => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem("user-token");
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
            localStorage.removeItem("user-token");
            resolve();
        });
    },
};
