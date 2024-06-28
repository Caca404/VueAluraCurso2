<script lang="ts">
  import {defineComponent} from 'vue'
  import BarraLateral from '@/components/BarraLateral.vue';
  import Notificacao from '@/components/Notificacao.vue';

  export default defineComponent({
    name: 'App',
    components: {BarraLateral, Notificacao},
    data(){
      return{
        isShadowMode: false
      }
    },
    methods:{
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
      <Notificacao />
      <router-view :theme="isShadowMode"></router-view>
    </div>
  </main>
</template>

<style scoped>
  main{
    --bg-primario: #fff;
    --texto-primario: #000;
  }
  main.modo-escuro{
    --bg-primario: #2b2d42;
    --texto-primario: #ddd;
  }
  .conteudo{
    background-color: var(--bg-primario) !important;
    color: var(--texto-primario) !important;
  }

  .conteudo > div,
  .conteudo > section{
    padding: 1.25rem !important;
  }
</style>
