import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";


// Pages
import Landing from "../views/Landing.vue";
import Libary from "../views/Libary.vue";
import Detail from "../views/Detail.vue";
import Reservation from "../views/Reservation.vue";
import Login from "../views/Login.vue";
import Forgot from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import Mission from "../views/Mission.vue";
import About from "../views/About.vue";

// Dashboard pages
import Dashboard from "../views/dashboard/Dashboard.vue";
import Materials from "../views/dashboard/materials/Materials.vue";
import AddMaterial from "../views/dashboard/materials/Add.vue";
import EditMaterial from "../views/dashboard/materials/Edit.vue";
import Users from "../views/dashboard/users/Users.vue";
import AddUser from "../views/dashboard/users/Add.vue";
import UserRights from "../views/dashboard/users/Rights.vue";

Vue.use(VueRouter);

const permissionFunction = (type, next) => {
    if ((type === 'admin' && !store.getters.isAdmin) || (type === 'editor' && !store.getters.isEditor)) {
        store.dispatch("alert", {
            type: "noPermission",
            msg: {
                rightsNeeded: type,
                onComplete: next
            }
        });
    } else {
        next();
    }
}

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
    {
        path: "/libary/:id",
        name: "Materiaal details",
        component: Detail
    },
    {
        path: "/reservation/:id",
        name: "Materiaal reserveren",
        component: Reservation
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/forgotpassword",
        name: "Wachtwoord vergeten",
        component: Forgot
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
    // Dashboard (ADMIN and EDITOR ONLY)
    {
        path: "/dashboard",
        name: "Overzicht",
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            permissionFunction('editor', next)
        }
    },
    // Materials (ADMIN and EDITOR ONLY)
    {
        path: "/dashboard/materials",
        name: "Materialen",
        component: Materials,
        beforeEnter: (to, from, next) => {
            permissionFunction('editor', next)
        }
    },
    {
        path: "/dashboard/materials/add",
        name: "Voeg material toe",
        component: AddMaterial,
        beforeEnter: (to, from, next) => {
            permissionFunction('editor', next)
        }

    },
    {
        path: "/dashboard/materials/:id",
        name: "Materiaal aanpassen",
        component: EditMaterial,
        beforeEnter: (to, from, next) => {
            permissionFunction('editor', next)
        }
    },
    // Users (ADMIN ONLY)
    {
        path: "/dashboard/users",
        name: "Gebruikers",
        component: Users,
        beforeEnter: (to, from, next) => {
            permissionFunction('admin', next)
        }
    },
    {
        path: "/dashboard/users/add",
        name: "Voeg gebruiker toe",
        component: AddUser,
        beforeEnter: (to, from, next) => {
            permissionFunction('admin', next)
        }
    },
    {
        path: "/dashboard/users/rights",
        name: "Gebruikersrechten",
        component: UserRights,
        beforeEnter: (to, from, next) => {
            permissionFunction('admin', next)
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
