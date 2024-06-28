import type IProjeto from "@/interfaces/IProjeto";
import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_TAREFA, ATUALIZA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR, REMOVE_TAREFA } from "./tipo-mutacoes";
import type ITarefa from "@/interfaces/ITarefa";
import { type INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import http from '@/http';
import { projeto, type EstadoProjeto } from "./modulos/projetos";
import { tarefa, type EstadoTarefa } from "./modulos/tarefas";

export interface Estado {
    tarefa: EstadoTarefa,
    notificacoes: INotificacao[]
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        tarefa:{
            tarefas: [],
        },
        notificacoes: [],
        projeto:{
            projetos:[]
        }
    },
    mutations: {

        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() =>{
                state.notificacoes = state.notificacoes.filter(not => not.id != novaNotificacao.id)
            }, 3000);
        },
    },
    modules: {
        projeto,
        tarefa
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}