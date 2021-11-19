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
import { useRoute } from "vue-router";
import MapBike from "../components/MapBike.vue";
import BikeList from "../components/BikeList.vue";
import { CITY_LIST } from "../global/constant";
import {
    getNearStation,
    getNearAvailble,
    getBikeStation,
    getBikeAvailability
} from "../utils/api";
import { onMounted, inject, provide, reactive, toRefs, toRef, ref } from "vue";
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
                console.log("getNowPos!!!");
                getNowPos();
            }
        };

        const setShowLoading = inject("setShowLoading");
        console.log("setShowLoading--inject", setShowLoading);
        const controlShowLoading = (boolean) => {
            setShowLoading(boolean);
        };
        const search = () => {
            getBikeStationInfo();
        };

        const stationList = reactive([]);

        const getBikeStationInfo = async () => {
            Object.assign(availableList, []);
            console.log("getBikeStation");
            const sendData = {
                city: data.city,
                $filter: data.keyword
                    ? `contains(StationName/Zh_tw,'${data.keyword}')`
                    : ""
            };
            try {
                const result = await getBikeStation(sendData);
                console.log("station", result);
                Object.assign(stationList, result);
                result.length > 0 && getBikeAvailble();
            } catch (error) {
                console.log("error", error);
            }
        };

        const getNearByInfo = async ({ longitude, latitude }) => {
            console.log("getNearByInfo", longitude, latitude);
            Object.assign(availableList, []);
            const sendData = {
                city: data.city,
                $spatialFilter: `nearby(${latitude},${longitude},${500})`
            };
            try {
                const result = await getNearStation(sendData);
                console.log("station", result);
                Object.assign(stationList, result);
                result.length > 0 && getNearByAvailble(longitude, latitude);
            } catch (error) {
                console.log("error", error);
            }
        };
        const availableList = reactive([]);

        const getBikeAvailble = async () => {
            controlShowLoading(true);
            const sendData = {
                city: data.city,
            };
            try {
                const result = await getBikeAvailability(sendData);
                let newData = stationList.filter(o1 => result.some(o2 => o1.StationUID === o2.StationUID));

                console.log("newData", newData)
                newData.forEach((station, i) => {
                    result.forEach((available) => {
                        if (station.StationUID === available.StationUID) {
                            console.log("8787", available)
                            newData[i] = { ...station, ...available}
                            // station.StationName = available.StationName;
                            // station.StationPosition = available.StationPosition;
                            // station.StationAddress = available.StationAddress;
                        }
                    });
                });
                console.log("newData", newData);
                Object.assign(availableList, newData);
                console.log("availableList", availableList);
                data.totalPage = Math.ceil(availableList.length / 30);
                data.page = 1;
                setSinglePageList();
            } catch (error) {
                console.log("error", error);
            }
            controlShowLoading(false);
        };

        const getNearByAvailble = async (longitude, latitude) => {
            controlShowLoading(true);
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
                setSinglePageList();
            } catch (error) {
                console.log("error", error);
            }
            controlShowLoading(false);
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
                        getBikeStationInfo();
                    }
                );
            }
        };

        const setPage = (num) => {
            data.page = num;
            setSinglePageList();
        };

        provide("totalPage", toRef(data, "totalPage"));
        provide("page", toRef(data, "page"));
        provide("setPage", setPage);

        const singlePageList = reactive([]);

        const setSinglePageList = () => {
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
