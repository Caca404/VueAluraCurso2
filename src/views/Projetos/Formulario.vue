<script lang="ts">
    import {defineComponent, ref} from 'vue';
    import { useStore } from '@/store';
    import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipo-mutacoes';
    import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipo-acoes';
    import { TipoNotificacao } from '@/interfaces/INotificacao';
    import useNotificador from '@/hooks/notificador';
    import {useRouter} from 'vue-router';

    export default defineComponent({
        name: 'Formulario',
        props: {
            id:{
                type: String
            }
        },
        setup(props){
            const router = useRouter();
            const store = useStore();
            const {notificar} = useNotificador();

            const nomeDoProjeto = ref("");

            if(props.id){
                const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
                nomeDoProjeto.value = projeto?.nome || '';
            }

            const successRequest = () => {
                nomeDoProjeto.value = '';
                notificar(TipoNotificacao.SUCESSO, 'Novo Projeto foi salvo','Pronto. Seu projeto está disponivel');
                router.push('/projetos');
            }

            const salvar = () => {
                if(props.id){
                    store.dispatch(ALTERAR_PROJETO, {
                        id: props.id,
                        nome: nomeDoProjeto.value
                    })
                    .then(() => successRequest());
                }
                else{
                    store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                        .then(() => successRequest());
                }
            }

            return {
                nomeDoProjeto,
                salvar
            }
        }
    });
</script>


<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" id="nomeDoProjeto" class="input" v-model="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>