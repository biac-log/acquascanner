import { MutationTree } from 'vuex';
import { ModeState } from './types';
import { modes } from './const';

export const mutations: MutationTree<ModeState> = {
    changeCurrentMode(state, destination: string): boolean {
        let result: boolean = false;
        state.currentMode = undefined;
        modes.forEach(element => {
            if (element.destination === destination) {
                result = true;
                state.currentMode = element;
            }
        });
        return result;
    }
}