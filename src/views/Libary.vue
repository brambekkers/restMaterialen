<template>
    <div>
        <Navbar />
        <Header />

        <div class="container">
            <div class="card ">
                <div class="card-header ">
                    <h5 class="card-title">Restmaterialen database</h5>
                    <p class="card-category">Geen filter</p>
                </div>
                <div class="card-body ">
                    <p>test</p>
                </div>
                <div class="card-footer ">
                    <hr />
                    <div class="stats">
                        <i class="fa fa-history"></i> Updated 3 minutes ago
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "Libary",
    components: { Navbar, Header, Footer }
};
</script>
