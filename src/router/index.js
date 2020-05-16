import Vue from "vue";
import VueRouter from "vue-router";

// Pages
import Landing from "../views/Landing.vue";
import Libary from "../views/Libary.vue";
import Detail from "../views/Detail.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Mission from "../views/Mission.vue";
import About from "../views/About.vue";

// Dashboard pages
import Dashboard from "../views/dashboard/Dashboard.vue";
import Materials from "../views/dashboard/Materials.vue";
import AddMaterial from "../views/dashboard/materials/Add.vue";
import Users from "../views/dashboard/Users.vue";
import AddUser from "../views/dashboard/users/Add.vue";
import UserRights from "../views/dashboard/users/Rights.vue";

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
        path: "/profile",
        name: "Profiel",
        component: Profile
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
    // Materials
    {
        path: "/dashboard/materials",
        name: "Materialen",
        component: Materials
    },
    {
        path: "/dashboard/materials/add",
        name: "Voeg material toe",
        component: AddMaterial
    },
    // Users
    {
        path: "/dashboard/users",
        name: "Gebruikers",
        component: Users
    },
    {
        path: "/dashboard/users/add",
        name: "Voeg gebruiker toe",
        component: AddUser
    },
    {
        path: "/dashboard/users/rights",
        name: "Gebruikersrechten",
        component: UserRights
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
