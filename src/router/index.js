import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../page/Index.vue";
import Route from "../page/Route.vue";
import Bike from "../page/Bike.vue";

const routes = [
    {
        path: "/",
        name: "Index",
        component: Index
    },
    {
        path: "/route",
        name: "Route",
        component: Route
    },
    {
        path: "/bike",
        name: "Bike",
        component: Bike
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
