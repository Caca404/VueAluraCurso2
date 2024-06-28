<style scoped>
    .clicavel{
        cursor: pointer;
        transition: all .4s ease;
    }
    .clicavel:hover{
        filter: brightness(0.9);
        box-shadow: 0 5px 5px 2px #a9a9a9;
    }

</style>

<template>
    <Box class="clicavel">
        <div class="columns" @click="tarefaClicada">
            <div class="column is-4">
                {{tarefa.descricao || 'Tarefa sem descrição'}}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type {PropType} from 'vue'
import Cronometro from '@/components/Cronometro.vue'
import Box from '@/components/Box.vue'
import type ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    name: 'Tarefa',
    components: {Cronometro, Box},
    emits:['aoTarefaClicada'],
    props:{
        tarefa:{
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    setup(props, {emit}){

        const tarefaClicada = (): void => {
            emit('aoTarefaClicada', props.tarefa);
        }        

        return {
            tarefaClicada
        }
    }
})
</script>