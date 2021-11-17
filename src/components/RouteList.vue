<template>
    <Search
        @updateCity="updateCity"
        @updateKeyword="updateKeyword"
        :city="city"
        :keyword="keyword"
    />
    <ul>
        <li v-for="item in singlePageList" :key="item.id">
            <h3>{{ item.StationName?.Zh_tw }}</h3>
            <h4>{{ item.StationAddress?.Zh_tw }}</h4>
            {{ item.name }}
            <p>{{ item.AvailableRentBikes > 0 ? "尚有單車" : "已無單車" }}</p>
            <p>{{ item.AvailableReturnBikes > 0 ? "尚可還車" : "已無車位" }}</p>
            <button @click="setView(item.Geometry)">查看位置</button>
        </li>
    </ul>
    <pagination />
</template>

<script>
import Pagination from "../components/Pagination.vue";
import Search from "../components/Search.vue";
export default {
    components: {
        Pagination,
        Search
    },
    props: {
        singlePageList: {
            type: Array,
            default: () => []
        }
    },
    emits: ["updateKeyword", "updateCity", "drawLine"],
    setup(props, { emit }) {
        const setView = (Geometry) => {
            emit("drawLine", Geometry);
        };
        const updateKeyword = (val) => {
            emit("updateKeyword", val);
        };
        const updateCity = (val) => {
            emit("updateCity", val);
        };
        return {
            setView,
            updateCity,
            updateKeyword
        };
    }
};
</script>

<style lang="css" scoped></style>
