<template>
    <div>
        <Map ref="mapInstance" 
        @getNearByInfo="getNearByInfo"
        :isSearchExist="isSearchExist" 
        :availableList=availableList />
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import Map from "../components/Map.vue"
import { getNearStation, getNearAvailble } from "../utils/api"
import { onMounted, reactive, toRefs, ref, computed } from "vue";
export default {
    components:{
        Map
    },
    setup() {
        const mapInstance = ref(null)
        const route = useRoute();
        const isSearchExist = computed(()=>{
            return data.keyword || data.city
        })
        const data = reactive({
            keyword: "" ,
            city: "",
        })

    const stationList = reactive([])
    const getNearByInfo = async({ longitude, latitude }) => {
        console.log("getNearByInfo", longitude, latitude);
        const sendData = {
            city: data.city,
            filter: data.keyword ? `contains(StationAddress.Zh_tw,'${data.keyword}') or contains(StationName.Zh_tw,'${data.keyword}')`:"",
            $spatialFilter: `nearby(${latitude},${longitude},${500})`
        }
        try {
            const result = await getNearStation(sendData)
            console.log("station", result);
            Object.assign(stationList, result)
            getAvailble(longitude, latitude)
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
            mapInstance.value.drawMark()
        } catch (error) {
            console.log("error", error);
        }
    }

        onMounted(() => {
            const queryCity = route.query.city
            if( queryCity ){
                data.city = queryCity
            }
            const queryKeyword = route.query.keyword
            if( queryKeyword ){
                data.keyword = queryKeyword
            }

            // if( isSearchExist ){
            //     getNowPos()
            // }
        })

        return {
            ...toRefs(data),
            isSearchExist,
            getNearByInfo,
            availableList,
            mapInstance
        }
    }
}
</script>

<style lang="css" scoped>

</style>