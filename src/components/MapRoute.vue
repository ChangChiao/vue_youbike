<template>
    <div id="map_route" class="map fixed z-10"></div>
    <ViewBar v-if="isMobile" />
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { getRestaurant, getSpot } from "../utils/api";
import * as Wkt from "wicket";
import { onMounted, onBeforeUnmount, inject } from "vue";
import ViewBar from "../components/ViewBar.vue";
export default {
    components: {
        ViewBar
    },
    props: {
        city: {
            type: String,
            default: ""
        }
    },
    emits: ["getRoute"],
    setup(props, { emit }) {
        const isMobile = inject("isMobile");
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
            const start = posArr[0] && posArr[0].split(" ");
            const end =
                posArr[posArr.length - 1] &&
                posArr[posArr.length - 1].split(" ");
            routeLayer.addLayer(L.marker([start[1], start[0]], { icon: mark }));
            routeLayer.addLayer(L.marker([end[1], end[0]], { icon: mark }));
            map.addLayer(routeLayer);
            getSpotData(start[1], start[0]);
            getRestaurantData(start[1], start[0]);
        };

        const drawOtherInfo = (arr, type) => {
            arr.forEach((item) => {
                const { PositionLon, PositionLat } = item.Position;
                let marks = type === "food" ? markFood : markSpot;
                routeLayer.addLayer(
                    L.marker([PositionLat, PositionLon], {
                        icon: marks
                    }).bindPopup(
                        `<h1>${item.Name}</h1>
                        <p>${item.OpenTime}</p>
                        `
                    )
                );
            });
            map.addLayer(routeLayer);
        };

        const getSpotData = async (latitude, longitude) => {
            const sendData = {
                city: props.city,
                $spatialFilter: `nearby(${latitude},${longitude},${500})`
            };
            try {
                const result = await getSpot(sendData);
                drawOtherInfo(result, "spot");
            } catch (error) {
                console.log("error", error);
            }
        };

        const getRestaurantData = async (latitude, longitude) => {
            try {
                const sendData = {
                    city: props.city,
                    $spatialFilter: `nearby(${latitude},${longitude},${500})`
                };
                const result = await getRestaurant(sendData);
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
                iconUrl: "./images/mark/no_rent.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
                // shadowSize: [41, 41]
            });
            markFood = new L.Icon({
                iconUrl: "./images/mark/food.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
                // shadowSize: [41, 41]
            });
            markSpot = new L.Icon({
                iconUrl: "./images/mark/spot.png",
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
            drawLine,
            isMobile
        };
    }
};
</script>

<style lang="postcss" scoped>
#map_route {
    z-index: 10;
}
</style>
