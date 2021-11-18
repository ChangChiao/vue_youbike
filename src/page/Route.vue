<template>
    <map-route
        ref="mapInstance"
        :city="city"
        :singlePageList="singlePageList"
        @getRoute="getRoute"
    />
    <route-list
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
import { provide } from "vue";
import MapRoute from "../components/MapRoute.vue";
import RouteList from "../components/RouteList.vue";
import { onMounted, reactive, toRefs, toRef, ref, computed } from "vue";
import { getCyclingShape } from "../utils/api";
import { CITY_LIST } from "../global/constant";
export default {
    components: {
        MapRoute,
        RouteList
    },
    setup() {
        const mapInstance = ref(null);
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
                city: data.city
            };
            try {
                const result = await getCyclingShape(sendData);
                console.log("result", result);
                if (result.length > 0) {
                    console.log("innnnn");
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

        provide("totalPage", toRef(data, "totalPage"));
        provide("page", toRef(data, "page"));
        provide("setPage", setPage);

        const singlePageList = reactive([]);

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
            search
        };
    }
};
</script>

<style lang="css" scoped></style>
