import { Printer } from './../../data/Printer';
import { GetterTree } from 'vuex';
import { PrintersState } from './types';
import { RootState } from '../types';
import { Article } from '../../data/Article';

export const getters: GetterTree<PrintersState, RootState> = {
    printers(state): Printer[] {
        return state.printers;
    },
};
