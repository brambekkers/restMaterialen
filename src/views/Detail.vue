<template>
    <div class="detail">
        <Navbar />

        <div class="container">
            <div class="card mt-5">
                <div class="card-header ">
                    <h5 class="card-title">{{ material.name }}</h5>
                </div>
                <div class="card-body ">
                    <div>
                        <span class="title">Afmetingen:</span>
                        {{ material.length }} {{ material.width }}
                        {{ material.thickness }}
                    </div>
                    <div>
                        <span class="title">Oorsprong:</span>
                        {{ material.origin }}
                    </div>
                </div>
            </div>
            <router-link tag="button" to="/libary" class="btn btn-default"
                >Terug</router-link
            >
        </div>
        <Footer />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "Detail",
    components: {
        Navbar,
        Footer
    },
    computed: {
        materials() {
            return this.$store.getters.materials;
        },
        material() {
            const id = this.$route.params.id;
            return this.materials.filter((item) => item.id === id)[0];
        }
    }
};
</script>

<style lang="scss" scoped>
.detail {
}
.title {
    width: 400px;
}
</style>
