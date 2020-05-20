<template>
    <div class="ml-auto">
        <i class="information fas fa-info-circle ml-auto text-warning mt-1 mr-1" @click="showInfo"></i>
    </div>
</template>

<script>
export default {
    props: ["info"],
    methods: {
        showInfo() {
            this.$store.dispatch("alert", {
                type: "information",
                msg: {
                    title: this.info.title,
                    text: this.info.msg
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.information {
    font-size: 2.5rem;

    &:hover {
        cursor: pointer;
        animation: jello; /* referring directly to the animation's @keyframe declaration */
        animation-duration: 2s; /* don't forget to set a duration! */
    }
}
</style>
