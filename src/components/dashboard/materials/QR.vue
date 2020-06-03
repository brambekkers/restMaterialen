<template>
    <div class="card w-100">
        <div class="card-header d-flex w-100">
            <h4 class="card-title mb-0">Qr code</h4>
        </div>
        <div class="card-body text-center d-flex flex-column">
            <div><img :src="material.qr" class="img-fluid" /></div>
            <button class="btn btn-outline-primary mt-auto" @click.prevent="refreshQR()">Vernieuw QR code</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["material"],
    methods: {
        async refreshQR() {
            this.material.qr = await this.$store.dispatch("createQRcode", this.material.id);
        }
    }
};
</script>
