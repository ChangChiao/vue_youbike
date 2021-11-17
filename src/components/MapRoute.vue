<template>
    <div id="map_route" class="w-screen h-screen"></div>
    <!-- <div class="fixed top-20 right-10 w-20 h-20 z-20">
        <select name="" id="" v-model="city">
            <option
                v-for="item in CITY_LIST"
                :key="item.value"
                :value="item.value"
            >
                {{ item.label }}
            </option>
        </select>
        <select name="" id="" v-model="bikeRoute">
            <option
                v-for="item in routeList"
                :key="item.RouteName"
                :value="item.RouteName"
            >
                {{ item.RouteName }}
            </option>
        </select>
    </div> -->
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";

import * as Wkt from "wicket";
import { onMounted, onBeforeUnmount, reactive, toRefs, watch } from "vue";
export default {
    emits: ["getRoute"],
    setup(props, { emit }) {
        let map = null;
        let mark = null;
        let routeLayer = null;
        const data = reactive({
            // city: CITY_LIST[0].value,
            bikeRoute: "",
            routeList: []
        });
        const createMap = () => {
            let mapToken = import.meta.env.VITE_MAP_TOKEN;
            map = L.map("map_route");

            L.tileLayer(
                "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
                {
                    attribution:
                        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: "mapbox/streets-v11",
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: mapToken
                }
            ).addTo(map);
            routeLayer = new L.MarkerClusterGroup().addTo(map);
            getRoute();
        };

        const cleanMarker = () => {
            routeLayer.clearLayers();
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
        };

        const getRoute = () => {
            emit("getRoute");
        };

        // const getRouteGeo = () => {
        //     const { Geometry } = data.routeList.find(
        //         (vo) => vo.RouteName === data.bikeRoute
        //     );
        //     drawLine(Geometry);
        // };

        // watch(
        //     () => data.city,
        //     () => {
        //         getRoute();
        //     }
        // );

        // watch(
        //     () => data.bikeRoute,
        //     () => {
        //         getRouteGeo();
        //     }
        // );

        const createMark = () => {
            mark = new L.Icon({
                iconUrl: "/images/mark/RecordCircle.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
                // shadowSize: [41, 41]
            });
        };

        const drawLine = (Geometry) => {
            console.log("Geometry", Geometry);
            cleanMarker();

            // Create a new Wicket instance
            const wicket = new Wkt.Wkt();

            // Read in any kind of WKT string
            wicket.read(Geometry);

            const geojsonFeature = wicket.toJson();

            const lineStyle = {
                color: "olive",
                weight: 5
            };

            routeLayer = L.geoJSON(geojsonFeature, { style: lineStyle }).addTo(
                map
            );

            routeLayer.addData(geojsonFeature);
            map.fitBounds(routeLayer.getBounds());
            map.addLayer(routeLayer);
        };

        onMounted(() => {
            createMark();
            createMap();
        });

        onBeforeUnmount(() => {
            map = null;
        });
        return {
            ...toRefs(data)
        };
    }
};
</script>

<style lang="postcss" scoped>
#map_route {
    z-index: 10;
}
</style>
