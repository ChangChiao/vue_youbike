<template>
    <header class="flex relative z-20 justify-between shadow-lg items-center px-3 font-medium h-20">
        <router-link to="/">
            <img class="w-20" src="/images/logo.png" alt="">
        </router-link>
        <ul class="menu flex">
            <li v-for="item in menuList" class="mx-3 text-lg text-base" :key="item.path">
                <router-link :to="item.path" class="duration-200">
                    {{item.title}}
                </router-link>
            </li>
        </ul>
    </header>
</template>

<script>
export default {
    setup() {
        const menuList = [
            {title:"尋找單車", "path":"/routemap"},
            {title:"尋找車道", "path":"/bikemap"},
            // {title:"周圍景點", "path":"/spot"},
            // {title:"歷史紀錄", "path":"/history"},
        ]

        return {
            menuList
        }
    }
}
</script>

<style lang="postcss" scoped>
header{
    /* height: 80px; */
}
.router-link-active{
    font-size: 22px;
    color: red;
    background: transparent;
    @apply text-base border-b-2 font-bold border-base ;
}
</style>