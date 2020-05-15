import Vue from "vue";
import VueRouter from "vue-router";

// Pages
import Landing from "../views/Landing.vue";
import Libary from "../views/Libary.vue";
import Detail from "../views/Detail.vue";
import Login from "../views/Login.vue";
import Mission from "../views/Mission.vue";
import About from "../views/About.vue";

// Dashboard pages
import Dashboard from "../views/dashboard/Dashboard.vue";
import Add from "../views/dashboard/Add.vue";
import Materials from "../views/dashboard/Materials.vue";

Vue.use(VueRouter);

const routes = [
    { path: "*", component: Landing },
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
    { path: "/libary/:id", component: Detail },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/mission",
        name: "Onze missie",
        component: Mission
    },
    {
        path: "/about",
        name: "Over",
        component: About
    },
    // Dashboard (ADMIN ONLY)
    {
        path: "/dashboard",
        name: "Overzicht",
        component: Dashboard
    },
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
    mode: "history",
    routes
});

export default router;
