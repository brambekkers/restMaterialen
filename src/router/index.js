import Vue from "vue";
import VueRouter from "vue-router";

// Pages
import Landing from "../views/Landing.vue";
import Libary from "../views/Libary.vue";
import Add from "../views/dashboard/Add.vue";
import Materials from "../views/dashboard/Materials.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Landing",
        component: Landing
    },
    {
        path: "/libary",
        name: "Materialen bibliotheek",
        component: Libary
    },
    // Dashboard
    {
        path: "/dashboard/materials",
        name: "Materialen",
        component: Materials
    },
    {
        path: "/dashboard/add",
        name: "Voeg material toe",
        component: Add
    }
];

const router = new VueRouter({
    routes
});

export default router;
