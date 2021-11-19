<template>
    <div
        class="
            fixed
            for-mobile-flex
            flex-wrap flex
            justify-center
            items-center
            w-screen
            h-16
            shadow-lg
            bottom-0
            bg-white
            z-50
        "
    >
        <Pagination />
        <!-- <div class="w-full flex justify-center"> -->
        <button
            class="h-6 w-3/4 text-primary-500 text-sm available"
            @click="controlStatus()"
        >
            {{ showStatus === 1 ? "顯示列表" : "顯示地圖" }}
        </button>
        <!-- </div> -->
    </div>
</template>

<script>
import { inject } from "vue";
import Pagination from "../components/Pagination.vue";
export default {
    emit: [],
    components: {
        Pagination
    },
    setup() {
        const showStatus = inject("showStatus");
        const setShowStatus = inject("setShowStatus");

        const controlStatus = () => {
            console.log("before--", showStatus.value);
            const status = !showStatus.value;
            console.log("status", status);
            setShowStatus(status);
        };
        return {
            showStatus,
            controlStatus
        };
    }
};
</script>

<style lang="scss" scoped></style>
