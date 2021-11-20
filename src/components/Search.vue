<template>
    <div class="input-box py-2">
        <font-awesome-icon class="text-gray-500" icon="search" />
        <input
            class="w-1/2 pl-4"
            placeholder="輸入關鍵字"
            :value="keyword"
            @input="updateKeyword"
            type="text"
        />
    </div>
    <div class="flex pt-3">
        <select class="w-1/2" :value="city" @change="updateCity">
            <!-- <option value="">縣市</option> -->
            <option
                v-for="item in CITY_LIST"
                :key="item.value"
                :value="item.value"
            >
                {{ item.label }}
            </option>
        </select>
        <button @click="search" class="ml-2 w-1/2 cursor-pointer">搜尋</button>
    </div>
</template>

<script>
import { CITY_LIST } from "../global/constant";
export default {
    props: {
        city: {
            type: String,
            default: ""
        },
        keyword: {
            type: String,
            default: ""
        }
    },
    emits: ["updateCity", "updateKeyword", "search"],
    setup(props, { emit }) {
        const updateKeyword = (event) => {
            emit("updateKeyword", event.target.value);
        };
        const updateCity = (event) => {
            emit("updateCity", event.target.value);
        };
        const search = () => {
            emit("search");
        };
        return {
            CITY_LIST,
            updateKeyword,
            updateCity,
            search
        };
    }
};
</script>

<style lang="postcss" scoped></style>
