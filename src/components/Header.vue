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
                class="mx-3 :mdtext-lg text-md text-primary-500"
                :key="item.path"
            >
                <router-link :to="item.path" class="duration-200">
                    {{ item.title }}
                </router-link>
            </li>
        </ul>
        <font-awesome-icon
            class="for-mobile text-lg text-gray-500"
            icon="search"
        />
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
    color: red;
    @apply bg-primary-500 text-white font-bold p-1 rounded-md;
}
</style>
