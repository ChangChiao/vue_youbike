<template>
    <div id="map" class="w-screen h-screen"></div>
</template>

<script>
import "leaflet/dist/leaflet.css"
import L from 'leaflet'
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import { getCyclingShape } from "../utils/api"
import { onMounted, onBeforeUnmount, reactive } from "vue"
export default {
  setup(){
    let map = null
    let markLayer = null
    const dataList = reactive([])
    const createMap = () => {
        let mapToken = import.meta.env.VITE_MAP_TOKEN;
        map = L.map('map')

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/bike',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: mapToken
        }).addTo(map);
        markLayer = new L.MarkerClusterGroup().addTo(map)
        getNowPos()
     }

     const cleanMarker = () => {
        markLayer.clearLayers();
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer)
            }
        })
     }

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
                getRoute(longitude, latitude)
             }, (event) => {
                 const { code, message } = event
                 console.log("error", `code=${code}, msg=${message}`);
             })
         }
     }

    const getRoute = async(longitude, latitude) => {
        const sendData = {
            $spatialFilter: `nearby(${latitude},${longitude},${100})`
        }
        try {
            const result = await getCyclingShape(sendData)
            Object.assign(dataList, result)
            drawMark()
        } catch (error) {
            console.log("error", error);
        }
    }

    const drawMark = () => {
        cleanMarker()
        dataList.forEach(item => {
            let { PositionLat, PositionLon } = item.StationPosition
            let { BikesCapacity, StationName, StationAddress } = item
            markLayer.addLayer(L.marker([PositionLat, PositionLon]).bindPopup(`
                <h2>${StationName.Zh_tw}</h2>
                <h4>地址${StationAddress.Zh_tw}</h4>
                <h4>可容納腳踏車數:${BikesCapacity}</h4>
                <a target="_blank" href='https://www.google.com/maps/search/?api=1&query=${PositionLat},${PositionLon}'>在google map上查看</a>`
            ))
        })
        map.addLayer(markLayer)
    }

    onMounted(() => {
        createMap()
    })

    onBeforeUnmount(()=>{
        map = null
    })
    return {

    }
  }

};
</script>