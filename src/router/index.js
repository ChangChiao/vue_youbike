import { createRouter, createWebHashHistory} from "vue-router";
import Index from "../page/Index.vue";
import RouteMap from "../page/RouteMap.vue";
import BikeMap from "../page/BikeMap.vue";

const routes = [
    {
        path: "/",
        name: "Index",
        component: Index,
    },
    {
        path: "/routemap",
        name: "RouteMap",
        component: RouteMap,
    },
    {
        path: "/bikemap",
        name: "BikeMap",
        component: BikeMap,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
