<template>
    <map-route
        ref="mapInstance"
        :isSearchExist="isSearchExist"
        :singlePageList="singlePageList"
        @getRoute="getRoute"
    />
    <route-list
        @drawLine="drawLine"
        @updateCity="updateCity"
        @updateKeyword="updateKeyword"
        :singlePageList="singlePageList"
    />
</template>

<script>
import { provide } from "vue";
import MapRoute from "../components/MapRoute.vue";
import RouteList from "../components/RouteList.vue";
import { onMounted, reactive, toRefs, ref, computed } from "vue";
import { getCyclingShape } from "../utils/api";
export default {
    components: {
        MapRoute,
        RouteList
    },
    setup() {
        const mapInstance = ref(null);
        const isSearchExist = computed(() => {
            return data.keyword || data.city;
        });
        const data = reactive({
            keyword: "",
            city: "",
            bikeRoute: "",
            page: 1,
            totalPage: 1
        });

        const routeList = reactive([]);
        const getRoute = async () => {
            const sendData = {
                city: data.city
            };
            try {
                const result = await getCyclingShape(sendData);
                if (result.length > 0) {
                    Object.assign(routeList, result);
                    data.bikeRoute = result[0].RouteName;
                    data.totalPage = Math.ceil(routeList.length / 30);
                    data.page = 1;
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        const setPage = (num) => {
            data.page = num;
            setsinglePageList();
        };

        const drawLine = (Geometry) => {
            mapInstance.value.drawLine(Geometry);
        };

        provide("page", data.page);
        provide("setPage", setPage);

        const singlePageList = reactive([]);

        const setsinglePageList = () => {
            const arr = [...routeList];
            const startIndex = (data.page - 1) * 30;
            const data = arr.splice(startIndex, 30);
            Object.assign(singlePageList, data);
            mapInstance.value.drawMark();
            const first = singlePageList[0];
            setView({
                latitude: first?.StationPosition?.PositionLat,
                longitude: first?.StationPosition?.PositionLat
            });
        };

        const setView = ({ latitude, longitude }) => {
            mapInstance.value.setView(latitude, longitude);
        };

        onMounted(() => {});

        return {
            ...toRefs(data),
            isSearchExist,
            getRoute,
            mapInstance,
            drawLine
        };
    }
};
</script>

<style lang="css" scoped></style>
