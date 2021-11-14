<template>
ewewew
    <div id="map" class="w-screen h-screen"></div>
</template>

<script>
import "leaflet/dist/leaflet.css"
import L from 'leaflet'
import { onMounted, onBeforeMount } from "vue"
export default {
  setup(){
    let map = null
    const createMap = () => {
    let mapToken = import.meta.env.VITE_MAP_TOKEN;
    map = L.map('map').setView([51.505, -0.09], 13);

    L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: mapToken
        }).addTo(map);
    }

    onMounted(() => {
        createMap()
    })

    onBeforeMount(()=>{
        map = null
    })
    return {

    }
  }

};
</script>