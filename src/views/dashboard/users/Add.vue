<template>
    <div class="wrapper">
        <Sidebar />
        <div class="main-panel h-100">
            <Navbar :title="$route.name" />
            <div class="content">
                <div class="row d-flex justify-content-center">
                    <div class="col-10 col-sm-6 col-xl-4">
                        <form class="form" @submit.prevent="addUser">
                            <div class="card card-signup mt-5">
                                <div class="card-header text-center">
                                    <h4 class="card-title">Voeg gebruiker toe</h4>
                                </div>
                                <div class="card-body">
                                    <h5 class="title mb-0 text-info">Gegevens</h5>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="fas fa-signature"></i>
                                            </span>
                                        </div>
                                        <input type="text" v-model="newUser.firstName" required class="form-control" placeholder="Voornaam" />
                                    </div>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="fas fa-signature"></i>
                                            </span>
                                        </div>
                                        <input type="text" v-model="newUser.lastName" required placeholder="Achternaam" class="form-control" />
                                    </div>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="fas fa-envelope"></i>
                                            </span>
                                        </div>
                                        <input type="email" v-model="newUser.email" required class="form-control" placeholder="Email" />
                                    </div>

                                    <h5 class="title mb-0 mt-3 text-danger">Beveiliging</h5>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="fas fa-lock"></i>
                                            </span>
                                        </div>
                                        <input type="password" v-model="newUser.password" required class="form-control" placeholder="Wachtwoord" />
                                    </div>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="fas fa-lock"></i>
                                            </span>
                                        </div>
                                        <input type="password" v-model="newUser.passwordCheck" required class="form-control" placeholder="Controle wachtwoord" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-default float-right">Voeg gebruiker toe</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "addUser",
    components: { Sidebar, Navbar, Footer },
    data() {
        return {
            newUser: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordCheck: ""
            }
        };
    },
    computed: {
        passwordSame() {
            return this.newUser.password === this.newUser.passwordCheck;
        }
    },

    methods: {
        async addUser() {
            if (this.passwordSame) {
                try {
                    await this.$store.dispatch("addUser", this.newUser);
                    this.notification(true);
                    this.$router.push("/dashboard/users");
                } catch (err) {
                    console.log(err);
                    this.notification(false, err.message);
                }
            } else {
                this.notification(false, "Controle wachtwoord komt niet overeen");
            }
        },
        notification(succes, error) {
            if (succes) {
                $.notify(
                    {
                        title: "Toegevoegd!",
                        message: "De gebruiker is succesvol toegevoegd!"
                    },
                    {
                        type: "success"
                    }
                );
            } else {
                $.notify(
                    {
                        title: "Error",
                        message: error
                    },
                    {
                        type: "danger"
                    }
                );
            }
        }
    }
};
</script>
