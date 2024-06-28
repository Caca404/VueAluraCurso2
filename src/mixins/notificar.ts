import type { TipoNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";

export const notificacaoMixin = {
    methods: {
        notificar(titulo: string, texto: string, tipo: TipoNotificacao):void{
            store.commit(NOTIFICAR, {
                titulo: titulo,
                texto: texto,
                tipo: tipo
            });
        }
    }
}