<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
import Formulario from '@/components/Formulario.vue';
import Tarefa from '@/components/Tarefa.vue';
import Box from '@/components/Box.vue';
import Modal from '@/components/Modal.vue';
import type ITarefa from '@/interfaces/ITarefa';
import { useStore } from '@/store';
import { ADICIONA_TAREFA } from '@/store/tipo-mutacoes';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS, ALTERAR_TAREFA } from '@/store/tipo-acoes';


export default defineComponent({
  name: 'Tarefas',
  components: { Formulario, Tarefa, Box, Modal },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    }
  },
  setup() {
    const store = useStore();

    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)


    const filtro = ref('')
    // const tarefas = computed(() => store.state.tarefa.tarefas.filter(t => !filtro.value || t.descricao.includes(filtro.value)))

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    });


    return {
      store,
      tarefas: computed(() => store.state.tarefa.tarefas),
      filtro
    }
  }
});
</script>

<template>
  <div>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro" />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
      <Tarefa v-if="tarefas.length > 0" v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
        @aoTarefaClicada="selecionarTarefa" />
      <Box v-else>
        Você não está muito produtivo hoje :(
      </Box>

      <Modal :mostrar="tarefaSelecionada != null">
        <template v-slot:header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button @click="fecharModal" class="delete" aria-label="close"></button>
        </template>
        <template v-slot:body class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">
              Descrição
            </label>
            <input type="text" id="descricaoDaTarefa" class="input" v-model="tarefaSelecionada.descricao">
          </div>
        </template>
        <template v-slot:footer class="modal-card-foot">
          <div class="buttons">
            <button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
            <button @click="fecharModal" class="button">Cancelar</button>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>
