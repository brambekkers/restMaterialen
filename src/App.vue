<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch("addFirebase");
    }
};
</script>

<style lang="scss">
#app {
    font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
    background-color: #f4f3ef;
    width: 100vw;
    height: 100vh;
}
</style>
