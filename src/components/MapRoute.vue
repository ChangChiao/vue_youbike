<template>
    <div id="map_route" class="w-screen h-screen"></div>
    <div class="fixed top-20 right-10 w-20 h-20 z-20">
        <select name="" id="" v-model="city">
            <option v-for="item in CITY_LIST" :key="item.value" :value="item.value">
                {{ item.label }}
            </option>
        </select>
         <select name="" id="" v-model="bikeRoute">
            <option v-for="item in routeList" :key="item.RouteName" :value="item.RouteName">
                {{ item.RouteName }}
            </option>
        </select>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css"
import L from 'leaflet'
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import { CITY_LIST } from "../global/constant";
import { getCyclingShape } from "../utils/api"
import * as Wkt from 'wicket' 
import { onMounted, onBeforeUnmount, reactive, toRefs, watch } from "vue"
export default {
  setup(){
    let map = null
    let routeLayer = null
    const data = reactive({
        city: CITY_LIST[0].value,
        bikeRoute:"",
        routeList:[]
    })
    const createMap = () => {
        let mapToken = import.meta.env.VITE_MAP_TOKEN;
        map = L.map('map_route')

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: mapToken
        }).addTo(map);
        routeLayer = new L.MarkerClusterGroup().addTo(map)
        getNowPos()
     }

     const cleanMarker = () => {
        routeLayer.clearLayers();
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer)
            }
        })
     }
     
     const getRoute = async() => {
        const sendData = {
            city: data.city,
        }
         try {
            const result = await getCyclingShape(sendData)
            if( result.length > 1){
                data.routeList = result
                data.bikeRoute = result[0].RouteName
            }
         } catch (error) {
            console.log("error", error);
         }
     }

     const getRouteGeo = () => {
         const { Geometry } = data.routeList.find( vo => vo.RouteName === data.bikeRoute)
         drawLine( Geometry )
     }

    watch(
        () => data.city,
        () => {
            getRoute()
        }
    );

    watch(
        () => data.bikeRoute,
        () => {
            getRouteGeo()
        }
    );

     const getNowPos = () => {
         if(navigator.geolocation) {
             navigator.geolocation.getCurrentPosition((position) => {
                const longitude = position.coords.longitude
                const latitude = position.coords.latitude
                console.log("longitude", longitude);
                console.log("latitude", latitude);
                map.setView([latitude, longitude], 18);
                L.marker([latitude, longitude]).addTo(map)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup();
                getRoute()
             }, (event) => {
                 const { code, message } = event
                 console.log("error", `code=${code}, msg=${message}`);
             })
         }
     }

    const drawLine = ( Geometry ) => {
        console.log("Geometry", Geometry);
        cleanMarker()
        
        // Create a new Wicket instance
        const wicket = new Wkt.Wkt();

        // Read in any kind of WKT string
        wicket.read(Geometry);

        const geojsonFeature = wicket.toJson()

        const lineStyle = {
            color: "olive",
            weight: 5,
        }

        routeLayer = L.geoJSON(geojsonFeature, { style: lineStyle }).addTo(map)

        routeLayer.addData(geojsonFeature)
        map.fitBounds(routeLayer.getBounds())

        map.addLayer(routeLayer)
    }

    onMounted(() => {
        createMap()
    })

    onBeforeUnmount(()=>{
        map = null
    })
    return {
        ...toRefs(data),
        CITY_LIST
    }
  }

};
</script>

<style lang="postcss" scoped>
#map_route{
    z-index: 10;
}
</style>