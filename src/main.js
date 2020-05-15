import Vue from "vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import App from "./App.vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "animate.css/animate.css";

// Jquery (for boostrap notify)
window.$ = require("jquery");

//Import Paper template
import "./assets/css/paper-dashboard.css";

// Import Font Awesome
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app");
