<template>
    <div id="map" class="map w-screen relative z-10"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { onMounted, onBeforeUnmount } from "vue";
import { transType, transTime } from "../utils/common";
export default {
    props: {
        singlePageList: {
            type: Array,
            default: () => []
        }
    },
    emits: ["mapReady"],
    setup(props, { emit }) {
        let map = null;
        let markLayer = null;
        let markSelf = null;
        let markNoAvailable = null;
        let markAvailable = null;
        const createMap = () => {
            let mapToken = import.meta.env.VITE_MAP_TOKEN;
            map = L.map("map");

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
            markLayer = new L.MarkerClusterGroup().addTo(map);
            emit("mapReady");
        };

        const cleanMarker = () => {
            markLayer.clearLayers();
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
        };

        const drawSelfMark = (latitude, longitude) => {
            map.setView([latitude, longitude], 18);
            L.marker([latitude, longitude], { icon: markSelf })
                .addTo(map)
                .bindPopup("你在這～")
                .openPopup();
        };

        const setView = (item) => {
            let { PositionLat, PositionLon } = item.StationPosition;
            let {
                AvailableRentBikes,
                AvailableReturnBikes,
                UpdateTime,
                StationName,
                StationAddress,
                ServiceStatus
            } = item;
            // cleanMarker();
            map.setView([PositionLat, PositionLon], 20);
            L.popup()
                .setLatLng([PositionLat, PositionLon])
                .setContent(
                    `
                <h3 class="text-xl font-bold">
                    ${StationName.Zh_tw}
                </h3>
                <h4 class="pt-2 text-sm">
                    <i class="fas fa-map-marker-alt text-lg  text-primary-500"></i>
                    ${StationAddress.Zh_tw}
                </h4>
                <p class="text-sm">
                <i class="fas fa-history text-lg text-primary-500"></i>
                    ${transTime(UpdateTime)}
                </p>
                <p class="py-2">
                    <span class="${transType(ServiceStatus, "color")}">
                        ${transType(ServiceStatus, "type")}
                    </span>
                    <span
                        class="
                            ${
                                AvailableRentBikes > 0
                                    ? "available"
                                    : "no-available"
                            }
                        "
                        >
                            ${AvailableRentBikes > 0 ? "尚有單車" : "已無單車"}
                        </span>
                </p>
                <div class="rent-info flex items-center justify-between">
                    <div class="w-1/2 h-24 flex flex-col justify-center rounded-md border-primary-500 mr-4 text-center border">
                        <p class="font-bold my-1 text-primary-500 text-base">可借單車</p>
                        <p class="font-bold text-2xl">
                            ${AvailableRentBikes}
                        </p>
                    </div>
                    <div class="w-1/2 h-24 flex flex-col justify-center rounded-md border-primary-500 text-center border">
                        <p class="font-bold text-primary-500 text-base">可停空位</p>
                        <p class="font-bold text-2xl">
                            ${AvailableReturnBikes}
                        </p>
                    </div>
                </div> `
                )
                .openOn(map);
        };

        const createMark = () => {
            markNoAvailable = new L.Icon({
                iconUrl: "/images/mark/no_rent.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
                // shadowSize: [41, 41]
            });
            markAvailable = new L.Icon({
                iconUrl: "/images/mark/bike.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
                // shadowSize: [41, 41]
            });
            markSelf = new L.Icon({
                iconUrl: "/images/mark/currentLocation.png",
                shadowUrl: "",
                iconSize: [40, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
                // shadowSize: [41, 41]
            });
        };

        const drawMark = () => {
            cleanMarker();
            props.singlePageList.forEach((item) => {
                let { PositionLat, PositionLon } = item.StationPosition;
                let { AvailableRentBikes } = item;
                const marker =
                    AvailableRentBikes > 0 ? markAvailable : markNoAvailable;
                // markLayer.addLayer(L.marker([PositionLat, PositionLon], { icon: marker }));
                L.marker([PositionLat, PositionLon], { icon: marker }).addTo(
                    map
                );
            });
            // map.addLayer(markLayer);
        };

        onMounted(() => {
            createMark();
            createMap();
        });

        onBeforeUnmount(() => {
            map = null;
            markLayer = null;
        });
        return {
            drawSelfMark,
            drawMark,
            setView,
            transType,
            transTime
        };
    }
};
</script>

<style lang="postcss" scoped></style>
