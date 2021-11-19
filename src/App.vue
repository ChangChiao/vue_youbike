<template>
    <Header />
    <router-view />
    <loading :showLoading="showLoading" />
</template>

<script>
import Header from "./components/Header.vue";
import Loading from "./components/Loading.vue";
import { onMounted, provide, ref } from "vue";
// import Template from "./components/Template.vue"
export default {
    components: {
        // Template
        Loading,
        Header
    },
    setup() {
        const showLoading = ref(false);
        const isMobile = ref(0);
        const setShowLoading = (boolean) => {
            showLoading.value = boolean;
        };
        provide("setShowLoading", setShowLoading);
        provide("isMobile", isMobile);
        onMounted(() => {
            isMobile.value = window.innerWidth < 768;
        });
        return {
            showLoading
        };
    }
};
</script>

<style>
#app {
    font-family: "Microsoft JhengHei", "Noto Sans TC", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
