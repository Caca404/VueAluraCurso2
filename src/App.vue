<script lang="ts">
  import {defineComponent} from 'vue'
  import BarraLateral from '@/components/BarraLateral.vue';
  import Formulario from '@/components/Formulario.vue';
  import Tarefa from '@/components/Tarefa.vue';
  import Box from '@/components/Box.vue';
  import type ITarefa from '@/interfaces/ITarefa';

  export default defineComponent({
    name: 'App',
    components: {BarraLateral, Formulario, Tarefa, Box},
    data(){
      return{
        tarefas: [] as ITarefa[],
        isShadowMode: false
      }
    },
    methods:{
      salvarTarefa(tarefa: ITarefa){
        this.tarefas.push(tarefa);
      },
      trocarTema(modoEscuro: boolean){
        this.isShadowMode =  modoEscuro;
      }
    }
  });
</script>

<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': isShadowMode}">
    <div class="column is-one-quarter ">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa v-if="tarefas.length > 0" v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-else>
          Você não está muito produtivo hoje :(
        </Box>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .lista{
    padding: 1.25rem;
  }
  main{
    --bg-primario: #fff;
    --texto-primario: #000;
  }
  main.modo-escuro{
    --bg-primario: #2b2d42;
    --texto-primario: #ddd;
  }
  .conteudo{
    background-color: var(--bg-primario);
  }
</style>
