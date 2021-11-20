<template>
    <map-route
        v-show="showStatus || !isMobile"
        ref="mapInstance"
        :city="city"
        :singlePageList="singlePageList"
        @getRoute="getRoute"
    />
    <route-list
        v-show="!showStatus || !isMobile"
        @search="search"
        @drawLine="drawLine"
        @updateCity="updateCity"
        @updateKeyword="updateKeyword"
        :singlePageList="singlePageList"
        :keyword="keyword"
        :city="city"
    />
</template>

<script>
import MapRoute from "../components/MapRoute.vue";
import RouteList from "../components/RouteList.vue";
import {
    provide,
    inject,
    onMounted,
    reactive,
    toRefs,
    toRef,
    ref,
    computed
} from "vue";
import { getCyclingShape } from "../utils/api";
import { CITY_LIST } from "../global/constant";
export default {
    components: {
        MapRoute,
        RouteList
    },
    setup() {
        const mapInstance = ref(null);
        const showStatus = ref(false);
        const singlePageList = reactive([]);
        const isMobile = inject("isMobile");
        const data = reactive({
            keyword: "",
            city: CITY_LIST[0].value,
            page: 1,
            totalPage: 1
        });

        const updateCity = (city) => {
            data.city = city;
        };

        const updateKeyword = (keyword) => {
            data.keyword = keyword;
        };

        const routeDataList = reactive([]);
        const getRoute = async () => {
            const sendData = {
                city: data.city,
                $filter: data.keyword
                    ? `contains(RouteName,'${data.keyword}')`
                    : ""
            };
            try {
                const result = await getCyclingShape(sendData);
                if (result.length > 0) {
                    Object.assign(routeDataList, result);
                    // data.bikeRoute = result[0].RouteName;
                    data.totalPage = Math.ceil(routeDataList.length / 30);
                    data.page = 1;
                    setSinglePageList();
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        const setPage = (num) => {
            data.page = num;
            setSinglePageList();
        };

        const search = () => {
            getRoute();
        };

        const drawLine = (Geometry) => {
            mapInstance.value.drawLine(Geometry);
        };

        const setShowStatus = (boolean) => {
            showStatus.value = boolean;
        };

        provide("totalPage", toRef(data, "totalPage"));
        provide("page", toRef(data, "page"));
        provide("setPage", setPage);
        provide("showStatus", showStatus);
        provide("setShowStatus", setShowStatus);

        const setSinglePageList = () => {
            const arr = [...routeDataList];
            const startIndex = (data.page - 1) * 30;
            const spliceData = arr.splice(startIndex, 30);
            Object.assign(singlePageList, spliceData);
            // mapInstance.value.drawMark();
            const first = singlePageList[0];
            drawLine(first.Geometry);
        };

        onMounted(() => {});

        return {
            ...toRefs(data),
            updateCity,
            updateKeyword,
            singlePageList,
            getRoute,
            mapInstance,
            drawLine,
            search,
            isMobile,
            showStatus
        };
    }
};
</script>

<style lang="css" scoped></style>
