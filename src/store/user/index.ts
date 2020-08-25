import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { UserState } from './types';
import { RootState } from '../types';

export const state: UserState = {
    userName: '',
    permissions: readLocalPer(),
};

function readLocalPer(): string[] {
    var localPerm = localStorage.getItem("permissions");
    if (localPerm !== null)
        return localPerm.split("#");
    return [];
}


const namespaced: boolean = true;

export const UserModule: Module<UserState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
