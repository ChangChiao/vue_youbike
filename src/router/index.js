import { createRouter, createWebHashHistory} from "vue-router";
import Index from "../page/Index.vue";
import Weather from "../page/Weather.vue";
import BikeMap from "../page/BikeMap.vue";
import History from "../page/History.vue";
import Spot from "../page/Spot.vue";

const routes = [
    {
        path: "/",
        name: "Index",
        component: Index,
    },
    {
        path: "/weather",
        name: "Weather",
        component: Weather,
    },
    {
        path: "/bikemap",
        name: "BikeMap",
        component: BikeMap,
    },
    {
        path: "/history",
        name: "History",
        component: History,
    },
    {
        path: "/Spot",
        name: "Spot",
        component: Spot
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
