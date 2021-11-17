<template>
    <v-pagination
        :modelValue="page"
        :pages="totalPage"
        :range-size="30"
        active-color="#DCEDFF"
        @update:modelValue="updateHandler"
    />
</template>

<script>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { inject } from "vue";
export default {
    components: {
        VPagination
    },
    setup() {
        const page = inject("page");
        const totalPage = inject("totalPage");
        const setPage = inject("setPage");
        const updateHandler = (val) => {
            setPage(val);
        };
        return {
            page,
            totalPage,
            updateHandler
        };
    }
};
</script>

<style lang="postcss" scoped></style>
