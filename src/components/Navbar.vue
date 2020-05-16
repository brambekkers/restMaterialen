<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg mb-0 px-5">
        <router-link class="navbar-brand" to="/">
            <i class="fas fa-recycle"></i>
            Restmaterialen
        </router-link>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-bar top-bar"></span>
            <span class="icon-bar middle-bar"></span>
            <span class="icon-bar bottom-bar"></span>
        </button>
        <div class="collapse navbar-collapse py-3 py-lg-0" id="navigation">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">
                        Libary
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/mission">Onze missie</router-link>
                </li>
                <!-- Only on Mobile -->
                <li class="nav-item d-lg-none d-md-block">
                    <router-link class="nav-link" to="/profile" v-if="user">Profiel</router-link>
                </li>
                <li class="nav-item d-lg-none d-md-block">
                    <a class="nav-link" href="#" @click="logout">Logout</a>
                </li>
                <ul class="navbar-nav d-lg-block d-none" v-if="user">
                    <li class="nav-item btn-rotate dropdown">
                        <a class="nav-link dropdown-toggle" id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-cog mr-2"></i>
                            <p>
                                <span class="d-lg-none d-md-block">Some Actions</span>
                            </p>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropDownMenu">
                            <router-link class="dropdown-item" to="/profile">Profiel</router-link>
                            <a class="dropdown-item" href="#" @click="logout">Logout</a>
                        </div>
                    </li>
                </ul>
                <li class="nav-item" v-if="user">
                    <router-link to="/dashboard" tag="button" class="btn-collapse btn btn-outline-success btn-block my-0 rounded">Dashboard</router-link>
                </li>
                <li class="nav-item" v-if="!user">
                    <router-link to="/Login" tag="button" class="btn-collapse btn btn-outline-success btn-block my-0 rounded">Login</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/libary");
        }
    }
};
</script>

<style lang="scss" scoped>
.icon-bar {
    width: 22px;
    height: 2px;
    background-color: #b6b6b6;
    display: block;
    transition: all 0.2s;
    margin-top: 4px;
}

.navbar-toggler {
    border: none;
    background: transparent !important;
}
.navbar-toggler .top-bar {
    transform: rotate(45deg);
    transform-origin: 10% 10%;
}

.navbar-toggler .middle-bar {
    opacity: 0;
}

.navbar-toggler .bottom-bar {
    transform: rotate(-45deg);
    transform-origin: 10% 90%;
}

.navbar-toggler.collapsed .top-bar {
    transform: rotate(0);
}

.navbar-toggler.collapsed .middle-bar {
    opacity: 1;
}

.navbar-toggler.collapsed .bottom-bar {
    transform: rotate(0);
}
</style>
