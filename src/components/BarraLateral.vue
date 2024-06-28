<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <button class="button" @click="alterarTema">
            {{textoBotao}}
        </button>
        <nav class="panel mt-5">
            <ul>
                <li v-for="link in links" :key="link.name">
                    <router-link :to="link.path" class="link">
                        <i :class="['fas', link.icon]"></i>
                        {{link.name}}
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'BarraLateral',
        emits: ['aoTemaAlterado'],
        data(){
            return{
                modoEscuro: false,
                links: [
                    {
                        path: '/',
                        name: 'Tarefas',
                        icon: 'fa-tasks'
                    },
                    {
                        path: '/projetos',
                        name: 'Projetos',
                        icon: 'fa-project-diagram'
                    }
                ]
            }
        },
        computed:{
            textoBotao(){
                if(this.modoEscuro) return 'Desativar modo escuro';
                else return 'Ativar modo escuro'
            }
        },
        methods:{
            alterarTema(){
                this.modoEscuro = !this.modoEscuro;
                this.$emit('aoTemaAlterado', this.modoEscuro);
            }
        }
    });
</script>

<style scoped>
    header {
        padding: 1rem;
        background: #0d3b66;
        width: 100%;
        height: 100vh;
        text-align: center;
    }
    @media only screen and (max-width: 768px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }

    .panel li{
        margin: 8px 0;
    }

    .link{
        color: white
    }

    .link:hover, .link.router-link-active{
        color: #FAF0CA;
    }
</style>