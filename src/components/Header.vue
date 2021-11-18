<template>
    <header
        class="
            flex
            relative
            z-50
            justify-between
            shadow-lg
            items-center
            px-3
            font-medium
            h-20
        "
    >
        <img
            class="w-20 cursor-pointer"
            src="/images/logo.png"
            alt=""
            @click="goHome"
        />
        <ul class="menu flex">
            <li
                v-for="item in menuList"
                class="mx-3 text-lg text-primary-500"
                :key="item.path"
            >
                <router-link :to="item.path" class="duration-200">
                    {{ item.title }}
                </router-link>
            </li>
        </ul>
    </header>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    setup() {
        const router = useRouter();
        const menuList = [
            { title: "尋找單車", path: "/bike" },
            { title: "尋找車道", path: "/route" }
        ];
        const goHome = () => {
            router.push("/");
        };

        return {
            menuList,
            goHome
        };
    }
};
</script>

<style lang="postcss" scoped>
header {
    /* height: 80px; */
}
.router-link-active {
    font-size: 22px;
    color: red;
    background: transparent;
    @apply text-primary-500 border-b-2 font-bold border-primary-500;
}
</style>
