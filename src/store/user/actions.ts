import { ActionTree } from 'vuex';
import axios from 'axios';
import { UserState } from './types';
import { RootState } from '../types';
import { User } from '@/data/User';
import { authentificationModule } from '../authentification';


export const actions: ActionTree<UserState, RootState> = {
    LoadUser({ commit, dispatch, rootState, rootGetters }) {
        return new Promise((resolve, reject) => {
            const header = `Bearer ${rootGetters['authentificationModule/getToken']}`;
            axios.get<User>(`${process.env.VUE_APP_ApiGestionUser}/User/GetUserLog/ACQUASCAN`, { headers: { Authorization : header } })
                .then((resp) => {
                    commit("SetUser", resp.data);
                    resolve(resp);
                })
                .catch((err) => {
                    let errorMessage: string = "Impossible de se connecter au serveur d'authentification";
                    if (err.response && err.response.status === 400) {
                        errorMessage = err.response.data.Message;
                    }
                    reject(errorMessage);
                });
        });
    },
};
