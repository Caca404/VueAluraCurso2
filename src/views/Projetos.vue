<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'Projetos',
        props: {
            theme: Boolean
        },
    });
</script>

<template>
    <section :class="['projetos', {'normal-mode': !theme}]">
        <h1 class="title">Projetos</h1>
        <router-view :theme="theme"></router-view>
    </section>

</template>

<style>
    .projetos.normal-mode h1,
    .projetos.normal-mode label,
    .projetos.normal-mode td,
    .projetos.normal-mode th{
        color: black !important;
    }
</style>