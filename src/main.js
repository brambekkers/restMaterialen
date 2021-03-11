import { createApp } from "vue";
import "./registerServiceWorker";
import router from "@/router";
import store from "./store";
import App from "./App.vue";

// Perfect scrollbar
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

// Bootstrap
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Animate.ccs
import "vue2-animate/dist/vue2-animate.min.css";
import "animate.css/animate.css";

//Import Paper template
import "./assets/css/paper-dashboard.css";

// Vue toastification
// Import the CSS or use your own!
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Import Font Awesome
import "@fortawesome/fontawesome-free/css/all.css";

// Bootstrap xxl
import "./assets/css/bootstrap.xxl.css";

createApp(App)
    .use(router)
    .use(store)
    .use(Toast)
    .use(PerfectScrollbar)
    .mount("#app");
