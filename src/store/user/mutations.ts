import { MutationTree } from 'vuex';
import { UserState } from './types';
import { User } from '@/data/User';

export const mutations: MutationTree<UserState> = {
    SetUser: (state, user: User) => {
        if (user !== undefined) {
            state.userName = user.NomPrenom;
            if (user.Permissions !== undefined) {
                let localDroit = '';
                user.Permissions.forEach(e => {
                    state.permissions.push(e.Id);
                    localDroit += `${e.Id}#`;
                });
                localStorage.setItem("permissions", localDroit);
            }
        }
    },
    CleanUser: (state) => {
        state.userName = '';
        state.permissions = [];
        localStorage.removeItem("permissions");
    }
};
