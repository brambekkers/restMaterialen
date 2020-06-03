<template>
    <div class="wrapper">
        <Sidebar />
        <div class="main-panel h-100">
            <Navbar :title="$route.name" />
            <div class="content">
                <form @submit.prevent="add()">
                    <div class="row">
                        <!-- Algemene info -->
                        <div class="col-md-12">
                            <Info :material.sync="newMaterial" :amount.sync="amount" :isNewMaterial="true" />
                        </div>
                    </div>
                    <div class="row">
                        <!-- Prijs -->
                        <div class="col-md-12">
                            <Price :material.sync="newMaterial" />
                        </div>
                    </div>

                    <div class="row">
                        <!-- Afbeeldingen -->
                        <div class="col-6">
                            <Images :material.sync="newMaterial" />
                        </div>
                        <!-- Labels -->
                        <div class="col-6">
                            <Tags :material.sync="newMaterial" />
                        </div>
                    </div>
                    <button class="btn btn-default float-right" type="submit">Voeg materiaal toe</button>
                </form>
            </div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Footer from "@/components/Footer.vue";

import Info from "@/components/dashboard/materials/Info.vue";
import Price from "@/components/dashboard/materials/Price.vue";
import Images from "@/components/dashboard/materials/Images.vue";
import Tags from "@/components/dashboard/materials/Tags.vue";

export default {
    name: "AddMaterial",
    data() {
        return {
            amount: 1,
            newMaterial: {
                name: "",
                type: "",
                origin: "",
                length: null,
                width: null,
                thickness: null,
                description: "",
                claimed: false,
                price: null,
                priceUnit: "",
                unitAmount: null,
                unitAvalible: null,
                tags: [],
                images: [],
                creationTime: null,
                lastEditTime: null
            }
        };
    },
    components: {
        Sidebar,
        Navbar,
        Footer,
        Info,
        Price,
        Images,
        Tags
    },
    methods: {
        async add() {
            for (let i = 0; i < this.amount; i++) {
                this.$set(this.newMaterial, "creationTime", new Date());
                this.$set(this.newMaterial, "lastEditTime", new Date());
                this.$set(this.newMaterial, "unitAvalible", this.newMaterial.unitAmount);

                try {
                    // add material
                    await this.$store.dispatch("addMaterial", this.newMaterial);
                    // onComplete:
                    this.$store.dispatch("notification", {
                        style: "success",
                        msg: {
                            title: "Succesvol Toegevoegd!",
                            text: "Het materiaal is succesvol aan de database toegevoegd!"
                        }
                    });
                    // Redirect
                    this.$router.push("/dashboard/materials");
                } catch (err) {
                    this.$store.dispatch("notification", {
                        style: "error",
                        msg: err
                    });
                }
            }
        }
    },
    mounted() {
        $(".selectpicker").selectpicker();
        this.$store.dispatch("createQRcode");
    }
};
</script>
