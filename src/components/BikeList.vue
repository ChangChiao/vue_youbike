<template>
    <div class="h-full w-96 px-8 fixed left-0 top-0 z-20 pt-24  overflow-hidden bg-white">
        <div class="rounded-xl shadow-lg overflow-hidden">
            <div class="h-8 bg-base"></div>
            <div class="p-4">
                <h1 class="text-3xl font-bold mb-6">尋找單車</h1>
                <Search
                    @updateCity="updateCity"
                    @updateKeyword="updateKeyword"
                    :city="city"
                    :keyword="keyword"
                />
            </div>
        </div>
        <div class="h-3/4 overflow-y-scroll">
            <ul class="pt-8 ">
                <li
                    v-for="item in singlePageList"
                    class="bg-grey-100 rounded-xl mb-3 px-2 py-4 cursor-pointer"
                    :key="item.StationUID"
                    @click="setView(item.StationPosition)"
                >
                    <h3 class="text-xl font-bold">{{ item.StationName.Zh_tw }}</h3>
                    <h4><font-awesome-icon icon="phone" />
                        {{ item.StationAddress.Zh_tw }}</h4>
                    <p class="py-2">
                        <span
                            :class="
                                item.AvailableRentBikes > 0
                                    ? 'available'
                                    : 'no-available'
                            "
                            >{{
                                item.AvailableRentBikes > 0
                                    ? "尚有單車"
                                    : "已無單車"
                            }}</span
                        >
                        <span
                            :class="
                                item.AvailableReturnBikes > 0
                                    ? 'available'
                                    : 'no-rent'
                            "
                            >{{
                                item.AvailableReturnBikes > 0
                                    ? "尚可還車"
                                    : "已無車位"
                            }}</span
                        >
                    </p>
                    <!-- <button >查看位置</button> -->
                </li>
            </ul>
        </div>
    </div>
    <pagination />
</template>

<script>
import Pagination from "../components/Pagination.vue";
import Search from "../components/Search.vue";
export default {
    components: {
        Pagination,
        Search
    },
    props: {
        singlePageList: {
            type: Array,
            default: () => []
        },
        keyword: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        }
    },
    emits: ["setView", "updateKeyword", "updateCity"],
    setup(props, { emit }) {
        const setView = (obj) => {
            emit("setView", {
                latitude: obj.PositionLat,
                longitude: obj.PositionLon
            });
        };
        const updateKeyword = (val) => {
            emit("updateKeyword", val);
        };
        const updateCity = (val) => {
            emit("updateCity", val);
        };
        return {
            setView,
            updateCity,
            updateKeyword
        };
    }
};
</script>

<style lang="css" scoped></style>
