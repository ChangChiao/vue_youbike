<template>
    <div id="map_route" class="map w-screen relative z-10"></div>
    <!-- <div>
        <h3 class="text-xl font-bold">
            {{ item.StationName.Zh_tw }}
        </h3>
        <h4>
            <font-awesome-icon icon="map-marker-alt" />
            {{ item.StationAddress.Zh_tw }}
        </h4>
        <p>{{ transTime(item.UpdateTime) }}</p>
        <p class="py-2">
            <span
                :class="
                    item.AvailableRentBikes > 0 ? 'available' : 'no-available'
                "
                >{{
                    item.AvailableRentBikes > 0 ? "尚有單車" : "已無單車"
                }}</span
            >
            <span
                :class="item.AvailableReturnBikes > 0 ? 'available' : 'no-rent'"
                >{{
                    item.AvailableReturnBikes > 0 ? "尚可還車" : "已無車位"
                }}</span
            >
        </p>
        <div class="flex items-center justify-between">
            <div
                class="
                    w-2/5
                    rounded-md
                    border-primary-500
                    text-center
                    py-2
                    boder
                "
            >
                <p class="font-bold text-primary-500">可借單車</p>
                <p class="font-bold text-xl">
                    {{ item.AvailableReturnBikes || 2 }}
                </p>
            </div>
            <div
                class="
                    w-2/5
                    rounded-md
                    border-primary-500
                    text-center
                    py-2
                    boder
                "
            >
                <p class="font-bold text-primary-500">可停空位</p>
                <p class="font-bold text-xl">
                    {{ item.AvailableReturnBikes || 2 }}
                </p>
            </div>
        </div>
    </div> -->
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { transTime } from "../utils/common";
import { getRestaurant, getSpot } from "../utils/api";
import * as Wkt from "wicket";
import { onMounted, onBeforeUnmount } from "vue";
export default {
    emits: ["getRoute"],
    setup(props, { emit }) {
        let map = null;
        let mark = null;
        let markFood = null;
        let markSpot = null;
        let routeLayer = null;
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

        const drawMark = (Geometry) => {
            let str = Geometry.replace("MULTILINESTRING ((", "");
            let newStr = str.replace("))", "");
            let posArr = newStr.split(",");
            console.log("newStr");
            const start = posArr[0] && posArr[0].split(" ");
            const end =
                posArr[posArr.length - 1] &&
                posArr[posArr.length - 1].split(" ");
            routeLayer.addLayer(L.marker([start[1], start[0]], { icon: mark }));
            routeLayer.addLayer(L.marker([end[1], end[0]], { icon: mark }));
            map.addLayer(routeLayer);
            getSpotData(start[0], start[1]);
            getRestaurantData(start[0], start[1]);
        };

        const drawOtherInfo = (type, arr) => {
            const posData = arr.map((vo) => vo.Position);
            posData.forEach((item) => {
                const { PositionLon, PositionLat } = item.Position;
                let marks = type === "food" ? markFood : markSpot;
                routeLayer.addLayer(
                    L.marker([PositionLat, PositionLon], { icon: marks })
                );
            });
            map.addLayer(routeLayer);
        };

        const getSpotData = async (latitude, longitude) => {
            const sendData = {
                $spatialFilter: `nearby(${latitude},${longitude},${500})`
            };
            try {
                const result = await getSpot(sendData);
                drawOtherInfo(result, "spot");
            } catch (error) {
                console.log("error", error);
            }
        };

        const getRestaurantData = async () => {
            try {
                const result = await getRestaurant();
                drawOtherInfo(result, "food");
            } catch (error) {
                console.log("error", error);
            }
        };

        const getRoute = () => {
            emit("getRoute");
        };

        const createMark = () => {
            mark = new L.Icon({
                iconUrl: "/images/mark/no_rent.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
                // shadowSize: [41, 41]
            });
            markFood = new L.Icon({
                iconUrl: "/images/mark/food.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
                // shadowSize: [41, 41]
            });
            markSpot = new L.Icon({
                iconUrl: "/images/mark/spot.png",
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
                color: "#C50047",
                weight: 5
            };

            routeLayer = L.geoJSON(geojsonFeature, { style: lineStyle }).addTo(
                map
            );

            routeLayer.addData(geojsonFeature);
            map.fitBounds(routeLayer.getBounds());
            map.addLayer(routeLayer);
            drawMark(Geometry);
        };

        onMounted(() => {
            createMark();
            createMap();
        });

        onBeforeUnmount(() => {
            map = null;
            routeLayer = null;
        });
        return {
            drawLine
        };
    }
};
</script>

<style lang="postcss" scoped>
#map_route {
    z-index: 10;
}
</style>
