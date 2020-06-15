<template>
    <div class="login">
        <div class="background"></div>
        <div class="content">
            <div class="card card-login text-center col-3 col-xl-2 col-xxl-1">
                <form @submit.prevent="resetPassword">
                    <div class="card-header">
                        <h3 class="card-title">Wachtwoord vergeten?</h3>
                    </div>
                    <div class="card-body">
                        <p>
                            Niks aan de hand joh!
                            <br />Je wachtwoord resetten is eenvoudig. Vul hieronder je emailadres en bekijk je mail.
                        </p>
                        <input type="email" placeholder="Vul email in" class="form-control input-no-border" v-model="email" />
                    </div>
                    <div class="footer">
                        <button type="submit" class="btn btn-fill btn-wd">Vraag aan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
    components: { Navbar },
    data() {
        return {
            email: ""
        };
    },
    methods: {
        async resetPassword() {
            try {
                await this.$store.dispatch("resetPassword", this.email);
                // onComplete:
                this.$store.dispatch("notification", {
                    style: "success",
                    msg: {
                        title: "Reset",
                        text: "De resetlink is naar je toe gemaild!"
                    }
                });
                // redirect
                this.$router.push("/login");
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
