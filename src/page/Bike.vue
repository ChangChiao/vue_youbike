<template>
    <div>
        <map-bike
            ref="mapInstance"
            :singlePageList="singlePageList"
            @mapReady="mapReady"
        />
        <bike-list
            @search="search"
            @setView="setView"
            @updateCity="updateCity"
            @updateKeyword="updateKeyword"
            :singlePageList="singlePageList"
            :city="city"
            :keyword="keyword"
        />
    </div>
</template>

<script>
import { provide } from "vue";
import { useRoute } from "vue-router";
import MapBike from "../components/MapBike.vue";
import BikeList from "../components/BikeList.vue";
import {
    getNearStation,
    getNearAvailble,
    getBikeStation,
    getBikeAvailability
} from "../utils/api";
import { onMounted, reactive, toRefs, ref, computed, onUnmounted } from "vue";
export default {
    components: {
        MapBike,
        BikeList
    },
    setup() {
        const mapInstance = ref(null);
        const route = useRoute();
        const data = reactive({
            keyword: "",
            city: "",
            page: 1,
            totalPage: 1
        });
        const isSearchExist = computed(() => {
            console.log(Boolean(data.keyword || data.city), "isexist-com[uted");
            return Boolean(data.keyword || data.city);
        });

        const updateCity = (city) => {
            data.city = city;
        };

        const updateKeyword = (keyword) => {
            data.keyword = keyword;
        };

        const mapReady = () => {
            const queryCity = route.query.city;
            if (queryCity) {
                data.city = queryCity;
            }
            const queryKeyword = route.query.keyword;
            if (queryKeyword) {
                data.keyword = queryKeyword;
            }
            if (queryCity || queryKeyword) {
                getBikeStationInfo();
            } else {
                getNowPos();
            }
        };

        const search = () => {
            getBikeStationInfo();
        };

        const stationList = reactive([]);

        const getBikeStationInfo = async () => {
            console.log("getBikeStation");
            const sendData = {
                city: data.city,
                $filter: data.keyword
                    ? `contains(StationAddress.Zh_tw,'${data.keyword}') or contains(StationName.Zh_tw,'${data.keyword}')`
                    : ""
            };
            try {
                const result = await getBikeStation(sendData);
                console.log("station", result);
                Object.assign(stationList, result);
                getBikeAvailble();
            } catch (error) {
                console.log("error", error);
            }
        };

        const getNearByInfo = async ({ longitude, latitude }) => {
            console.log("getNearByInfo", longitude, latitude);
            const sendData = {
                city: data.city,
                $filter: data.keyword
                    ? `contains(StationAddress.Zh_tw,'${data.keyword}') or contains(StationName.Zh_tw,'${data.keyword}')`
                    : "",
                $spatialFilter: `nearby(${latitude},${longitude},${500})`
            };
            try {
                const result = await getNearStation(sendData);
                console.log("station", result);
                Object.assign(stationList, result);
                getNearByAvailble(longitude, latitude);
            } catch (error) {
                console.log("error", error);
            }
        };
        const availableList = reactive([]);

        const getBikeAvailble = async () => {
            const sendData = {
                city: data.city,
                $filter: data.keyword
                    ? `contains(StationAddress.Zh_tw,'${data.keyword}') or contains(StationName.Zh_tw,'${data.keyword}')`
                    : ""
            };
            try {
                const result = await getBikeAvailability(sendData);
                result.forEach((available) => {
                    stationList.forEach((station) => {
                        if (station.StationUID === available.StationUID) {
                            available.StationName = station.StationName;
                            available.StationPosition = station.StationPosition;
                            available.StationAddress = station.StationAddress;
                        }
                    });
                });
                Object.assign(availableList, result);
                console.log("availableList", availableList);
                data.totalPage = Math.ceil(availableList.length / 30);
                data.page = 1;
                setsinglePageList();
            } catch (error) {
                console.log("error", error);
            }
        };

        const getNearByAvailble = async (longitude, latitude) => {
            const sendData = {
                $spatialFilter: `nearby(${latitude},${longitude},${500})`
            };
            try {
                const result = await getNearAvailble(sendData);
                result.forEach((available) => {
                    stationList.forEach((station) => {
                        if (station.StationUID === available.StationUID) {
                            available.StationName = station.StationName;
                            available.StationPosition = station.StationPosition;
                            available.StationAddress = station.StationAddress;
                        }
                    });
                });
                Object.assign(availableList, result);
                console.log("availableList", availableList);
                data.totalPage = Math.ceil(availableList.length / 30);
                data.page = 1;
                setsinglePageList();
            } catch (error) {
                console.log("error", error);
            }
        };

        const getNowPos = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const longitude = position.coords.longitude;
                        const latitude = position.coords.latitude;
                        console.log("longitude", longitude);
                        console.log("latitude", latitude);
                        mapInstance.value.drawSelfMark(latitude, longitude);
                        getNearByInfo({ longitude, latitude });
                    },
                    (event) => {
                        const { code, message } = event;
                        console.log("error", `code=${code}, msg=${message}`);
                    }
                );
            }
        };

        const setPage = (num) => {
            data.page = num;
            setsinglePageList();
        };

        provide("totalPage", data.totalPage);
        provide("page", data.page);
        provide("setPage", setPage);

        const singlePageList = reactive([]);

        const setsinglePageList = () => {
            const arr = [...availableList];
            const startIndex = (data.page - 1) * 30;
            const pageData = arr.splice(startIndex, 30);
            Object.assign(singlePageList, pageData);
            console.log("singlePageList", singlePageList);
            mapInstance.value.drawMark();
            const first = singlePageList[0];
            setView(first);
        };

        const setView = (obj) => {
            mapInstance.value.setView(obj);
        };

        onMounted(() => {
            // console.log("mounted", data.city, data.keyword)
        });

        return {
            ...toRefs(data),
            isSearchExist,
            getNearByInfo,
            availableList,
            mapReady,
            mapInstance,
            updateCity,
            singlePageList,
            updateKeyword,
            setView,
            search
        };
    }
};
</script>

<style lang="css" scoped></style>
