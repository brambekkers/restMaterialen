import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

// Pages
import Landing from "../views/Landing.vue";
import Libary from "../views/Libary.vue";
import Detail from "../views/Detail.vue";
import Reservation from "../views/Reservation.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Forgot from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import Mission from "../views/Mission.vue";
import About from "../views/About.vue";

// Dashboard pages
import Dashboard from "../views/dashboard/Dashboard.vue";

import Materials from "../views/dashboard/materials/Materials.vue";
import AddMaterial from "../views/dashboard/materials/Add.vue";
import ViewMaterial from "../views/dashboard/materials/View.vue";
import EditMaterial from "../views/dashboard/materials/Edit.vue";

import Reservations from "../views/dashboard/Reservations.vue";

import Users from "../views/dashboard/users/Users.vue";
import AddUser from "../views/dashboard/users/Add.vue";
import UserRights from "../views/dashboard/users/Rights.vue";

Vue.use(VueRouter);

const permissionFunction = (type, next) => {
    if ((type === "admin" && !store.getters.isAdmin) || (type === "editor" && !store.getters.isEditor)) {
        store.dispatch("alert", {
            type: "noPermission",
            msg: {
                rightsNeeded: type,
                onComplete: next
            }
        });
    }
    if (type === "user" && !store.getters.user) {
        store.dispatch("alert", {
            type: "notLogedIn",
            msg: {
                rightsNeeded: type,
                onComplete: next
            }
        });
    } else {
        next();
    }
};

const routes = [
    { path: "*", component: Landing },
    {
        path: "/",
        name: "Landing",
        component: Landing,
        meta: {
            template: "landing",
            transitionEnter: "animated fadeIn",
            transitionLeave: "animated fadeOut"
        }
    },
    {
        path: "/libary",
        name: "Materialen bibliotheek",
        component: Libary,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "front"
        }
    },
    {
        path: "/libary/:id",
        name: "Materiaal details",
        component: Detail,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "front"
        }
    },
    {
        path: "/reservation/:id",
        name: "Materiaal reserveren",
        component: Reservation,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "front"
        },
        beforeEnter: (to, from, next) => {
            permissionFunction("user", next);
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            transitionEnter: "animated fadeIn",
            transitionLeave: "animated fadeOut",
            template: "front"
        }
    },
    {
        path: "/register",
        name: "Registreer",
        component: Register,
        meta: {
            transitionEnter: "animated fadeIn",
            transitionLeave: "animated fadeOut",
            template: "front"
        }
    },
    {
        path: "/forgotpassword",
        name: "Wachtwoord vergeten",
        component: Forgot,
        meta: {
            transitionEnter: "animated fadeIn",
            transitionLeave: "animated fadeOut",
            template: "front"
        }
    },
    {
        path: "/profile",
        name: "Profiel",
        component: Profile,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "front"
        },
        beforeEnter: (to, from, next) => {
            permissionFunction("user", next);
        }
    },
    {
        path: "/mission",
        name: "Onze missie",
        component: Mission,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "front"
        }
    },
    {
        path: "/about",
        name: "Over",
        component: About,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "front"
        }
    },
    // Dashboard (ADMIN and EDITOR ONLY)
    {
        path: "/dashboard",
        name: "Overzicht",
        component: Dashboard,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        },
        beforeEnter: (to, from, next) => {
            permissionFunction("editor", next);
        }
    },
    // Materials (ADMIN and EDITOR ONLY)
    {
        path: "/dashboard/materials",
        name: "Materialen",
        component: Materials,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        },
        beforeEnter: (to, from, next) => {
            permissionFunction("editor", next);
        }
    },
    {
        path: "/dashboard/materials/add",
        name: "Voeg material toe",
        component: AddMaterial,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        },
        beforeEnter: (to, from, next) => {
            permissionFunction("editor", next);
        }
    },
    {
        path: "/dashboard/materials/:id",
        name: "Materiaal bekijken",
        component: ViewMaterial,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        },
        beforeEnter: (to, from, next) => {
            permissionFunction("editor", next);
        }
    },
    {
        path: "/dashboard/materials/edit/:id",
        name: "Materiaal aanpassen",
        component: EditMaterial,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        },
        beforeEnter: (to, from, next) => {
            permissionFunction("editor", next);
        }
    },
    // Reservations (Admin and Editors)
    {
        path: "/dashboard/reservations",
        name: "Reserveringen",
        component: Reservations,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        },
        beforeEnter: (to, from, next) => {
            permissionFunction("editor", next);
        }
    },
    // Users (ADMIN ONLY)
    {
        path: "/dashboard/users",
        name: "Gebruikers",
        component: Users,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        },
        beforeEnter: (to, from, next) => {
            permissionFunction("admin", next);
        }
    },
    {
        path: "/dashboard/users/add",
        name: "Voeg gebruiker toe",
        component: AddUser,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        },
        beforeEnter: (to, from, next) => {
            permissionFunction("admin", next);
        }
    },
    {
        path: "/dashboard/users/rights",
        name: "Gebruikersrechten",
        component: UserRights,
        meta: {
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        },
        beforeEnter: (to, from, next) => {
            permissionFunction("admin", next);
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
