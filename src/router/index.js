import { createRouter, createWebHistory } from "vue-router";
// import store from "@/store";

import firebase from "firebase/app";

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
import Donate from "../views/Donate.vue";
import About from "../views/About.vue";

// Dashboard pages
import Dashboard from "../views/dashboard/Dashboard.vue";

import Materials from "../views/dashboard/materials/Materials.vue";
import AddMaterial from "../views/dashboard/materials/Add.vue";
import ViewMaterial from "../views/dashboard/materials/View.vue";
import EditMaterial from "../views/dashboard/materials/Edit.vue";
import SheetMaterials from "../views/dashboard/materials/SheetMaterials.vue";

import Reservations from "../views/dashboard/Reservations.vue";

import Users from "../views/dashboard/users/Users.vue";
import AddUser from "../views/dashboard/users/Add.vue";
import UserRights from "../views/dashboard/users/Rights.vue";

import Options from "../views/dashboard/Options.vue";

const routes = [
    { path: "/:pathMatch(.*)*", name: "not-found", component: Landing },
    {
        path: "/",
        name: "Landing",
        component: Landing,
        meta: {
            template: "landing",
            transitionEnter: "animated fadeIn",
            transitionLeave: "animated slideInRight"
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
            requiresAuth: true,
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "front"
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
            requiresAuth: true,
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "front"
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
        path: "/donate",
        name: "Doneer",
        component: Donate,
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
            requiresAuth: true,
            requiresRight: "editor",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    },
    // Materials (ADMIN and EDITOR ONLY)
    {
        path: "/dashboard/materials",
        name: "Materialen",
        component: Materials,
        meta: {
            requiresAuth: true,
            requiresRight: "editor",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    },
    {
        path: "/dashboard/materials/add",
        name: "Voeg material toe",
        component: AddMaterial,
        meta: {
            requiresAuth: true,
            requiresRight: "editor",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    },
    {
        path: "/dashboard/materials/sheetmaterials",
        name: "Plaatmateriaal opties",
        component: SheetMaterials,
        meta: {
            requiresAuth: true,
            requiresRight: "editor",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    },
    {
        path: "/dashboard/materials/:id",
        name: "Materiaal bekijken",
        component: ViewMaterial,
        meta: {
            requiresAuth: true,
            requiresRight: "editor",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    },
    {
        path: "/dashboard/materials/edit/:id",
        name: "Materiaal aanpassen",
        component: EditMaterial,
        meta: {
            requiresAuth: true,
            requiresRight: "editor",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    },
    // Reservations (Admin and Editors)
    {
        path: "/dashboard/reservations",
        name: "Reserveringen",
        component: Reservations,
        meta: {
            requiresAuth: true,
            requiresRight: "editor",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    },
    // Users (ADMIN ONLY)
    {
        path: "/dashboard/users",
        name: "Gebruikers",
        component: Users,
        meta: {
            requiresAuth: true,
            requiresRight: "admin",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    },
    {
        path: "/dashboard/users/add",
        name: "Voeg gebruiker toe",
        component: AddUser,
        meta: {
            requiresAuth: true,
            requiresRight: "admin",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    },
    {
        path: "/dashboard/users/rights",
        name: "Gebruikersrechten",
        component: UserRights,
        meta: {
            requiresAuth: true,
            requiresRight: "admin",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    },
    {
        path: "/dashboard/users/details/:uid",
        name: "User details",
        component: Profile,
        meta: {
            requiresAuth: true,
            requiresRight: "admin",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    },
    // Options
    {
        path: "/dashboard/options",
        name: "Opties",
        component: Options,
        meta: {
            requiresAuth: true,
            requiresRight: "admin",
            transitionEnter: "animated slideInRight",
            transitionLeave: "animated slideOutLeft",
            template: "back"
        }
    }
];

const router = new createRouter({
    history: createWebHistory(process.env.BASE_URL),
    mode: "history",
    routes
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiresRight = to.matched[0].meta.requiresRight;

    // Check if your logged in
    if (requiresRight) {
        const user = await firebase.getCurrentUser();
        if (user) {
            const token = await user.getIdTokenResult(true);
            if (requiresRight === "editor" && !(token.claims.editor || token.claims.admin)) {
                next("/");
            }

            if (requiresRight === "admin" && !token.claims.admin) {
                next("/");
            }
        }
    }
    // Check if your logged in
    if (requiresAuth && !(await firebase.getCurrentUser())) {
        next("/login");
    } else {
        next();
    }
});

export default router;
