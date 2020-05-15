<template>
    <div class="stats">
        <i class="fa fa-history"></i> {{ format }} geleden bijgewerkt
    </div>
</template>

<script>
export default {
    computed: {
        materials() {
            return this.$store.getters.materials;
        },
        lastTimeUpdatedInSeconds() {
            const now = new Date();
            let lastTime = Infinity;
            if (this.materials) {
                for (const material of this.materials) {
                    if (material.lastEditTime) {
                        const timeSince = now - material.lastEditTime.toDate();
                        if (timeSince < lastTime) lastTime = timeSince;
                    }
                }
            }
            return Math.round(lastTime / 1000);
        },
        format(time) {
            if (this.lastTimeUpdatedInSeconds) {
                // Hours, minutes and seconds
                const days = ~~(this.lastTimeUpdatedInSeconds / (3600 * 24));
                const hrs = ~~(this.lastTimeUpdatedInSeconds / 3600);
                var mins = ~~((this.lastTimeUpdatedInSeconds % 3600) / 60);
                var secs = ~~this.lastTimeUpdatedInSeconds % 60;

                let type = days
                    ? "dagen"
                    : hrs
                    ? "uur"
                    : mins
                    ? "minuten"
                    : "seconden";
                let amount = days ? days : hrs ? hrs : mins ? mins : secs;

                return `${amount} ${type}`;
            }
        }
    }
};
</script>
