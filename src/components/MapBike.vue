<template>
    <div id="map" class="w-screen h-screen relative z-10"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { onMounted, onBeforeUnmount } from "vue";
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
                StationAddress
            } = item;
            cleanMarker();
            // map.setView([latitude, longitude], 18).openPopup();
            // setTimeout(() => {
            map.setView([PositionLat, PositionLon], 20);
            L.popup()
                .setLatLng([PositionLat, PositionLon])
                .setContent(
                    `
                <h2 class="title">${StationName.Zh_tw}</h2>
                <h4>更新時間:${transTime(UpdateTime)}</h4>
                <h4>地址:${StationAddress.Zh_tw}</h4>
                <h4>可借單車:${AvailableRentBikes}</h4>
                <h4>可停車位:${AvailableReturnBikes}</h4>
                <a target="_blank" href='https://www.google.com/maps/search/?api=1&query=${PositionLat},${PositionLon}'>在google map上查看</a>`
                )
                .openOn(map);
            // }, 1000)
        };

        const createMark = () => {
            markNoAvailable = new L.Icon({
                iconUrl: "./images/mark/no_rent.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
                // shadowSize: [41, 41]
            });
            markAvailable = new L.Icon({
                iconUrl: "./images/mark/bike.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
                // shadowSize: [41, 41]
            });
            markSelf = new L.Icon({
                iconUrl: "./images/mark/currentLocation.png",
                shadowUrl: "",
                iconSize: [40, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
                // shadowSize: [41, 41]
            });
        };

        const transTime = (time) => {
            let date = new Date(time);
            return date.toString("Zh_tw");
        };

        const drawMark = () => {
            // cleanMarker()
            console.log("drawMark", props.singlePageList);
            props.singlePageList.forEach((item) => {
                let { PositionLat, PositionLon } = item.StationPosition;
                let {
                    AvailableRentBikes,
                    AvailableReturnBikes,
                    UpdateTime,
                    StationName,
                    StationAddress
                } = item;
                const mark =
                    AvailableRentBikes > 0 ? markAvailable : markNoAvailable;
                markLayer.addLayer(
                    L.marker([PositionLat, PositionLon], { icon: mark })
                );
            });
            map.addLayer(markLayer);
        };

        onMounted(() => {
            createMark();
            createMap();
        });

        onBeforeUnmount(() => {
            console.log("onBeforeUnmount--bikemap");
            map = null;
            markLayer = null;
        });
        return {
            drawSelfMark,
            drawMark,
            setView
        };
    }
};
</script>
