<template>
    <div class="sidebar" data-color="white" data-active-color="danger">
        <div class="logo text-center">
            <router-link to="/" class="simple-text logo-normal"
                >RMM</router-link
            >
        </div>
        <div class="sidebar-wrapper">
            <ul class="nav">
                <li :class="$route.path === '/dashboard' ? 'active' : ''">
                    <router-link to="/dashboard">
                        <i class="fas fa-tachometer-alt"></i>
                        <p>Dashboard</p>
                    </router-link>
                </li>
                <li
                    :class="
                        $route.path === '/dashboard/materials' ? 'active' : ''
                    "
                >
                    <router-link to="/dashboard/materials">
                        <i class="far fa-list-alt"></i>
                        <p>Materialen</p>
                    </router-link>
                </li>
                <li :class="$route.path === '/dashboard/add' ? 'active' : ''">
                    <router-link to="/dashboard/add">
                        <i class="fas fa-plus"></i>
                        <p>Voeg toe</p>
                    </router-link>
                </li>
                <li
                    :class="
                        $route.path === '/dashboard/reservations'
                            ? 'active'
                            : ''
                    "
                >
                    <router-link to="/dashboard/reservations">
                        <i class="fas fa-stamp"></i>
                        <p>Reserveringen</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
