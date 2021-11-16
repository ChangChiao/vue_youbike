<template>
    <div>
        <Map :city="city" :keyword="keyword" />
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import Map from "../components/Map.vue"
import { getNearStation, getNearAvailble } from "../utils/api"
import { onMounted, reactive, toRefs, toRefs } from "vue";
export default {
    components:{
        Map
    },
    setup() {
        const route = useRoute();
        const data = reactive({
            keyword: "" ,
            city: "",
        })

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
        onMounted(() => {
            if( route.query.city ){
                data.city = route.query.city
            }
            if( route.query.keyword ){
                data.keyword = route.query.keyword
            }
        })

        return {
            ...toRefs(data)
        }
    }
}
</script>

<style lang="css" scoped>

</style>