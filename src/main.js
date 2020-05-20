import Vue from "vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import App from "./App.vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// Animate.ccs
import "animate.css/animate.css";

// Jquery (for boostrap notify)
window.$ = require("jquery");

//Import Paper template
import "./assets/css/paper-dashboard.css";

// Import Font Awesome
import "@fortawesome/fontawesome-free/css/all.css";

// Bootstrap select
import "bootstrap-select/dist/css/bootstrap-select.css";
import "bootstrap-select/dist/js/bootstrap-select.js";

// Bootstrap xxl
import "./assets/css/bootstrap.xxl.css";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app");
