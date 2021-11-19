<template>
    <div
        class="
            h-full
            w-96
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
            <div class="h-8 bg-primary-500"></div>
            <div class="p-4">
                <h1 class="text-3xl font-bold mb-6">尋找車道</h1>
                <Search
                    @search="search"
                    @updateCity="updateCity"
                    @updateKeyword="updateKeyword"
                    :city="city"
                    :keyword="keyword"
                />
            </div>
        </div>
        <div class="h-2/3 overflow-y-scroll mt-8 mb-4">
            <ul class="">
                <li
                    v-for="item in singlePageList"
                    class="bg-grey-100 rounded-xl mb-3 px-2 py-4 cursor-pointer"
                    :key="item.StationUID"
                    @click="drawLine(item.Geometry)"
                >
                    <h3 class="text-xl font-bold pb-2">
                        {{ item.RouteName }}
                    </h3>
                    <h4>
                        <font-awesome-icon
                            class="text-primary-500"
                            icon="map-marker-alt"
                        />
                        {{ item.City }} {{ item.Town || ""}}
                    </h4>
                    <p>
                        <span class="mr-8"
                            ><font-awesome-icon
                                class="text-primary-500 mr-2"
                                icon="exchange-alt"
                            />{{ item.Direction || "單向" }}</span
                        >
                        <span
                            ><font-awesome-icon
                                class="text-primary-500 mr-2"
                                icon="route"
                            />{{ item.CyclingLength }}公尺</span
                        >
                    </p>
                    <p>
                        <span class="sub-title">開始</span
                        >{{ item.RoadSectionStart }}
                    </p>
                    <p>
                        <span class="sub-title">結束</span
                        >{{ item.RoadSectionEnd }}
                    </p>
                    <!-- <button >查看位置</button> -->
                </li>
            </ul>
        </div>
        <pagination />
    </div>
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
    emits: ["drawLine", "updateKeyword", "updateCity", "search"],
    setup(props, { emit }) {
        const drawLine = (Geometry) => {
            emit("drawLine", Geometry);
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
        return {
            drawLine,
            updateCity,
            updateKeyword,
            search
        };
    }
};
</script>

<style lang="css" scoped></style>
