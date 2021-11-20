<template>
    <div>
        <div
            class="
                h-full
                md:w-96
                w-full
                fixed
                px-8
                left-0
                top-0
                z-20
                box-border
                pt-24
                overflow-hidden
                bg-white
            "
        >
            <div class="rounded-xl shadow-lg overflow-hidden">
                <div class="md:h-8 md:block hidden bg-primary-500"></div>
                <div class="p-4">
                    <h1
                        class="
                            md:text-3xl
                            text-2xl
                            font-bold
                            md:mb-6
                            mb-2
                            flex
                            justify-between
                            items-center
                        "
                    >
                        尋找單車
                        <i
                            class="
                                fas
                                fa-crosshairs
                                text-primary-300
                                cursor-pointer
                            "
                            @click="getNowPos"
                        ></i>
                    </h1>
                    <Search
                        @search="search"
                        @updateCity="updateCity"
                        @updateKeyword="updateKeyword"
                        :city="city"
                        :keyword="keyword"
                    />
                </div>
            </div>
            <div class="list overflow-y-scroll mt-8 md:mb-4">
                <ul class="">
                    <li
                        class="text-center text-primary-500"
                        v-if="singlePageList.length === 0"
                    >
                        查無紀錄
                    </li>
                    <li
                        v-for="item in singlePageList"
                        class="
                            bg-grey-100
                            rounded-xl
                            mb-3
                            px-2
                            py-4
                            cursor-pointer
                        "
                        :key="item.StationUID"
                        @click="setView(item)"
                    >
                        <h3 class="text-xl font-bold">
                            {{ item.StationName.Zh_tw }}
                        </h3>
                        <h4>
                            <font-awesome-icon icon="map-marker-alt" />
                            {{ item.StationAddress.Zh_tw }}
                        </h4>
                        <p class="py-2">
                            <span
                                :class="transType(item.ServiceStatus, 'color')"
                                >{{
                                    transType(item.ServiceStatus, "type")
                                }}</span
                            >
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
                        </p>
                        <!-- <button >查看位置</button> -->
                    </li>
                </ul>
            </div>
            <pagination />
        </div>
    </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import Search from "../components/Search.vue";
import { inject } from "vue";
import { transType } from "../utils/common";
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
    emits: ["setView", "updateKeyword", "updateCity", "search", "getNowPos"],
    setup(props, { emit }) {
        const setShowStatus = inject("setShowStatus");

        const controlStatus = () => {
            setShowStatus(true);
        };
        const setView = (obj) => {
            emit("setView", obj);
            controlStatus();
        };
        const updateKeyword = (val) => {
            emit("updateKeyword", val);
        };
        const updateCity = (val) => {
            emit("updateCity", val);
        };
        const search = () => {
            emit("search");
        };

        const getNowPos = () => {
            emit("getNowPos");
        };
        return {
            setView,
            updateCity,
            updateKeyword,
            search,
            transType,
            getNowPos
        };
    }
};
</script>

<style lang="css" scoped></style>
