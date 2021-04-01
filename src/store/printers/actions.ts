import { ActionTree } from 'vuex';
import axios from 'axios';
import {PrintersState } from './types';
import { RootState } from '../types';
import { Printer } from '../../data/Printer';
import { JsonConvert, ValueCheckingMode } from "json2typescript";
import router from '@/router';


export const actions: ActionTree<PrintersState, RootState> = {
    refreshPrinters({ commit, rootGetters }){
    //Initialisation de la liste des imprimantes pour les etiquettes
    let printers: Printer[] | null = null;
    axios.get<Printer[]>(process.env.VUE_APP_ApiArticle + "/Imprimantes")
    .then((response) => {
      const jsonConvert: JsonConvert = new JsonConvert();
      jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
      printers = jsonConvert.deserializeArray(response.data, Printer);
    })
    .catch((e) => {
      
    }).finally(() => {
        if(printers){
            commit('refreshPrinters', printers);
        }
    });
    }
    
};
