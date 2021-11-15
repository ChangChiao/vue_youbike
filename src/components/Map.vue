<template>
    <div id="map" class="w-screen h-screen"></div>
</template>

<script>
import "leaflet/dist/leaflet.css"
import L from 'leaflet'
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import { getNearStation, getNearAvailble } from "../utils/api"
import { onMounted, onBeforeUnmount, reactive } from "vue"
export default {
  setup(){
    let map = null
    let markLayer = null
    let markSelf = null
    let markGray = null
    let markGreen = null
    const createMap = () => {
        let mapToken = import.meta.env.VITE_MAP_TOKEN;
        map = L.map('map')

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
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
                L.marker([latitude, longitude], { icon: markSelf }).addTo(map)
                .bindPopup('你在這～')
                .openPopup();
                getNearByInfo(longitude, latitude)
             }, (event) => {
                 const { code, message } = event
                 console.log("error", `code=${code}, msg=${message}`);
             })
         }
     }

    const stationList = reactive([])

    const createMark = () => {
        markGray = new L.Icon({
            iconUrl: '/images/mark/serviceStatus0, 2.png',
            shadowUrl: '',
            iconSize: [40, 40],
        iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            // shadowSize: [41, 41]
        })
        markGreen = new L.Icon({
            iconUrl: '/images/mark/available_0(goal).png',
            shadowUrl: '',
            iconSize: [40, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            // shadowSize: [41, 41]
        })
        markSelf = new L.Icon({
            iconUrl: 'images/mark/currentLocation.png',
            shadowUrl: '',
            iconSize: [40, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            // shadowSize: [41, 41]
        })
    }

    const getNearByInfo = async(longitude, latitude) => {
        const sendData = {
            $spatialFilter: `nearby(${latitude},${longitude},${500})`
        }
        try {
            const result = await getNearStation(sendData)
            console.log("station", result);
            Object.assign(stationList, result)
            getAvailble(longitude, latitude)
            // drawMark()
        } catch (error) {
            console.log("error", error);
        }
    }
    const availableList = reactive([])

    const getAvailble = async(longitude, latitude) => {
        const sendData = {
            $spatialFilter: `nearby(${latitude},${longitude},${500})`
        }
        try {
            const result = await getNearAvailble(sendData)
            result.forEach(available => {
                stationList.forEach(station => {
                    if(station.StationUID === available.StationUID){
                        available.StationName = station.StationName
                        available.StationPosition = station.StationPosition
                        available.StationAddress = station.StationAddress 
                    }
                });
            });
            Object.assign(availableList, result)
            console.log("availableList", availableList);
            drawMark()
        } catch (error) {
            console.log("error", error);
        }
    }

    const transTime = (time) => {
        let date = new Date(time);
        return date.toString("Zh_tw");
    }


    const drawMark = () => {
        // cleanMarker()
        availableList.forEach(item => {
            let { PositionLat, PositionLon } = item.StationPosition
            let { AvailableRentBikes, AvailableReturnBikes, UpdateTime, StationName, StationAddress } = item
            const mark = AvailableRentBikes > 0 ? markGreen : markGray
            markLayer.addLayer(L.marker([PositionLat, PositionLon], {icon: mark}).bindPopup(`
                <h2 class="title">${StationName.Zh_tw}</h2>
                <h4>地址:${StationAddress.Zh_tw}</h4>
                <h4>可借腳踏車數:${AvailableRentBikes}</h4>
                <h4>可還腳踏車數:${AvailableReturnBikes}</h4>
                <h4>更新時間:${transTime(UpdateTime)}</h4>
                <a target="_blank" href='https://www.google.com/maps/search/?api=1&query=${PositionLat},${PositionLon}'>在google map上查看</a>`
            ))
        })
        map.addLayer(markLayer)
    }

    onMounted(() => {
        createMark()
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