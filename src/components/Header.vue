<template>
    <header class="flex justify-center box-border border-solid border-t-8 border-sub items-center  font-medium">
        <router-link to="/">
            <img class=" pr-10" src="/images/logo.png" alt="">
        </router-link>
        <div class="input-box flex h-10 w-56 items-center rounded-3xl text-gray-500">
            <BootstrapIcon
                icon="search"
                size="2x"
                flip-v />
            <input class="w-30 pl-4 bg-transparent text-gray-900" placeholder="搜尋自行車租借站" type="text">
        </div>
        <ul class="menu flex">
            <li v-for="item in menuList" class="mx-3 text-lg" :key="item.path">
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
            {title:"今日天氣", "path":"/weather"},
            {title:"自行車道", "path":"/bikemap"},
            {title:"周圍景點", "path":"/spot"},
            {title:"歷史紀錄", "path":"/history"},
        ]

        return {
            menuList
        }
    }
}
</script>

<style lang="postcss" scoped>
header{
    height: 88px;
}
.router-link-active{
    font-size: 22px;
    color: red;
    background: transparent;
    @apply text-base border-b-2 border-base;
}
</style>