<template>
    <div
        class="
            fixed
            for-mobile-flex
            flex-wrap flex
            justify-center
            items-center
            w-screen
            h-12
            shadow-lg
            bottom-0
            bg-white
            z-10
        "
    >
        <button
            class="h-8 w-1/2 text-primary-500 text-sm available"
            @click="controlStatus()"
        >
            顯示列表
        </button>
    </div>
</template>

<script>
import { inject } from "vue";
export default {
    emit: [],
    setup() {
        const showStatus = inject("showStatus");
        const setShowStatus = inject("setShowStatus");

        const controlStatus = () => {
            setShowStatus(false);
        };
        return {
            showStatus,
            controlStatus
        };
    }
};
</script>

<style lang="scss" scoped></style>
