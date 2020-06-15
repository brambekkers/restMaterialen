<template>
    <div class="login">
        <div class="background"></div>
        <div class="content">
            <div class="card card-login">
                <form @submit.prevent="login">
                    <div class="card-header">
                        <h3 class="card-title text-center">Login</h3>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label>Emailadres</label>
                            <input type="email" placeholder="Vul email in" class="form-control input-no-border" v-model="email" />
                        </div>
                        <div class="form-group">
                            <label>Wachtwoord</label>
                            <input type="password" placeholder="Vul wachtwoord in" class="form-control input-no-border" v-model="password" />
                        </div>
                    </div>
                    <div class="footer text-center">
                        <button type="submit" class="btn btn-fill btn-wd">Let's go</button>
                        <div class="forgot">
                            <router-link to="/forgotpassword">Wachtwoord vergeten?</router-link>
                        </div>
                        <div class="register">
                            geen account?
                            <router-link to="/register">Registreer</router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        async login() {
            try {
                await this.$store.dispatch("login", {
                    email: this.email,
                    password: this.password
                });
                // onComplete:
                this.$store.dispatch("notification", {
                    style: "success",
                    msg: {
                        title: "Succesvol ingelogd!",
                        text: "Je bent ingelogd op de website. Je kunt nu verder werken onder je eigen account."
                    }
                });
                // redirect
                this.$router.push("/libary");
            } catch (err) {
                this.$store.dispatch("notification", {
                    style: "error",
                    msg: err
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    position: relative;

    margin-bottom: -70px;

    .content {
        height: calc(100vh - 62px);
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .background {
        position: absolute;
        opacity: 0.5;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: url("../assets/img/background.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .card-login {
        z-index: 2;
        box-shadow: 0 25px 30px -13px rgba(40, 40, 40, 0.4);
        border-radius: 6px;
        padding-top: 25px;
        padding-bottom: 25px;
        min-width: 350px;
    }
}
</style>
